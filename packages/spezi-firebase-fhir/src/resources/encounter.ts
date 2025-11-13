//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type EncounterClassHistory,
  type EncounterDiagnosis,
  type EncounterHospitalization,
  type EncounterLocation,
  type EncounterParticipant,
  type EncounterStatusHistory,
  type Encounter,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  codingSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
} from '../elements/index.js'
import {
  encounterStatusSchema,
  encounterLocationStatusSchema,
} from '../valueSets/index.js'

const encounterClassHistorySchema: ZodType<EncounterClassHistory> =
  backboneElementSchema.extend({
    class: codingSchema,
    period: periodSchema,
  })

const encounterDiagnosisSchema: ZodType<EncounterDiagnosis> =
  backboneElementSchema.extend({
    condition: referenceSchema,
    use: codeableConceptSchema.optional(),
    rank: intSchema.optional(),
  })

const encounterHospitalizationSchema: ZodType<EncounterHospitalization> =
  backboneElementSchema.extend({
    preAdmissionIdentifier: identifierSchema.optional(),
    origin: referenceSchema.optional(),
    admitSource: codeableConceptSchema.optional(),
    reAdmission: codeableConceptSchema.optional(),
    dietPreference: codeableConceptSchema.array().optional(),
    specialCourtesy: codeableConceptSchema.array().optional(),
    specialArrangement: codeableConceptSchema.array().optional(),
    destination: referenceSchema.optional(),
    dischargeDisposition: codeableConceptSchema.optional(),
  })

const encounterLocationSchema: ZodType<EncounterLocation> =
  backboneElementSchema.extend({
    location: referenceSchema,
    status: encounterLocationStatusSchema.optional(),
    _status: elementSchema.optional(),
    physicalType: codeableConceptSchema.optional(),
    period: periodSchema.optional(),
  })

const encounterParticipantSchema: ZodType<EncounterParticipant> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.array().optional(),
    period: periodSchema.optional(),
    individual: referenceSchema.optional(),
  })

const encounterStatusHistorySchema: ZodType<EncounterStatusHistory> =
  backboneElementSchema.extend({
    status: encounterStatusSchema,
    period: periodSchema,
  })

/**
 * Zod schema for FHIR Encounter resource (untyped version).
 */
export const untypedEncounterSchema = z.lazy(
  () =>
    domainResourceSchema.extend({
      resourceType: z.literal('Encounter').readonly(),
      account: referenceSchema.array().optional(),
      appointment: referenceSchema.array().optional(),
      basedOn: referenceSchema.array().optional(),
      class: codingSchema,
      classHistory: encounterClassHistorySchema.array().optional(),
      diagnosis: encounterDiagnosisSchema.array().optional(),
      episodeOfCare: referenceSchema.array().optional(),
      hospitalization: encounterHospitalizationSchema.optional(),
      identifier: identifierSchema.array().optional(),
      length: quantitySchema.optional(),
      location: encounterLocationSchema.array().optional(),
      participant: encounterParticipantSchema.array().optional(),
      partOf: referenceSchema.optional(),
      period: periodSchema.optional(),
      priority: codeableConceptSchema.optional(),
      reasonReference: referenceSchema.array().optional(),
      serviceProvider: referenceSchema.optional(),
      status: encounterStatusSchema,
      _status: elementSchema.optional(),
      statusHistory: encounterStatusHistorySchema.array().optional(),
      subject: referenceSchema.optional(),
      type: codeableConceptSchema.array().optional(),
    }) satisfies ZodType<Encounter>,
)

/**
 * Zod schema for FHIR Encounter resource.
 */
export const encounterSchema: ZodType<Encounter> = untypedEncounterSchema

/**
 * Wrapper class for FHIR Encounter resources.
 * Provides utility methods for working with encounters and their periods.
 */
export class FhirEncounter extends FhirDomainResource<Encounter> {
  // Static Functions

  /**
   * Parses an Encounter resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirEncounter instance
   */
  public static parse(value: unknown): FhirEncounter {
    return new FhirEncounter(encounterSchema.parse(value))
  }

  // Properties

  /**
   * Gets the encounter start date/time as a JavaScript Date object.
   *
   * @returns The start date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const startDate = encounter.startDate
   * if (startDate) {
   *   console.log(`Encounter started: ${startDate.toLocaleString()}`)
   * }
   * ```
   */
  public get startDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.period?.start)
  }

  /**
   * Gets the encounter end date/time as a JavaScript Date object.
   *
   * @returns The end date if available, undefined otherwise
   */
  public get endDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.period?.end)
  }

  /**
   * Checks if the encounter is currently in progress (has start but no end date).
   *
   * @returns true if the encounter is in progress
   *
   * @example
   * ```typescript
   * if (encounter.isInProgress) {
   *   console.log('Encounter is currently active')
   * }
   * ```
   */
  public get isInProgress(): boolean {
    return this.startDate !== undefined && this.endDate === undefined
  }

  /**
   * Calculates the duration of the encounter in milliseconds.
   *
   * @returns Duration in milliseconds, or undefined if dates are incomplete
   *
   * @example
   * ```typescript
   * const duration = encounter.durationInMilliseconds
   * if (duration) {
   *   const hours = duration / (1000 * 60 * 60)
   *   console.log(`Encounter lasted ${hours} hours`)
   * }
   * ```
   */
  public get duration(): number | undefined {
    const start = this.startDate
    const end = this.endDate
    if (!start || !end) return undefined
    return end.getTime() - start.getTime()
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns Array of identifier values matching any provided system
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns Array of identifier values matching any provided Coding
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
