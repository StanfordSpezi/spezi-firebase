//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ProcedureFocalDevice,
  type ProcedurePerformer,
  type Coding,
  type Procedure,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  canonicalSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import { procedureStatusSchema } from '../valueSets/index.js'

const procedurePerformerSchema: ZodType<ProcedurePerformer> =
  backboneElementSchema.extend({
    function: codeableConceptSchema.optional(),
    actor: referenceSchema,
    onBehalfOf: referenceSchema.optional(),
  })

const procedureFocalDeviceSchema: ZodType<ProcedureFocalDevice> =
  backboneElementSchema.extend({
    action: codeableConceptSchema.optional(),
    manipulated: referenceSchema,
  })

/**
 * Zod schema for FHIR Procedure resource (untyped version).
 */
export const untypedProcedureSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Procedure').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: procedureStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    category: codeableConceptSchema.optional(),
    code: codeableConceptSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    performedDateTime: dateTimeSchema.optional(),
    _performedDateTime: elementSchema.optional(),
    performedPeriod: periodSchema.optional(),
    performedString: stringSchema.optional(),
    _performedString: elementSchema.optional(),
    performedAge: quantitySchema.optional(),
    performedRange: quantitySchema.optional(),
    recorder: referenceSchema.optional(),
    asserter: referenceSchema.optional(),
    performer: procedurePerformerSchema.array().optional(),
    location: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    bodySite: codeableConceptSchema.array().optional(),
    outcome: codeableConceptSchema.optional(),
    report: referenceSchema.array().optional(),
    complication: codeableConceptSchema.array().optional(),
    complicationDetail: referenceSchema.array().optional(),
    followUp: annotationSchema.array().optional(),
    note: annotationSchema.array().optional(),
    focalDevice: procedureFocalDeviceSchema.array().optional(),
    usedReference: referenceSchema.array().optional(),
    usedCode: codeableConceptSchema.array().optional(),
  }),
) satisfies ZodType<Procedure>

/**
 * Zod schema for FHIR Procedure resource.
 */
export const procedureSchema: ZodType<Procedure> = untypedProcedureSchema

/**
 * Wrapper class for FHIR Procedure resources.
 * Provides utility methods for working with procedures.
 */
export class FhirProcedure extends FhirDomainResource<Procedure> {
  // Static Functions

  /**
   * Parses a Procedure resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirProcedure instance
   */
  public static parse(value: unknown): FhirProcedure {
    return new FhirProcedure(procedureSchema.parse(value))
  }

  // Properties

  /**
   * Gets the performed date as a JavaScript Date object (from performedDateTime).
   *
   * @returns The performed date if available
   */
  public get performedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.performedDateTime)
  }

  /**
   * Gets the performed period start date.
   *
   * @returns The start date if available
   */
  public get performedPeriodStart(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.performedPeriod?.start)
  }

  /**
   * Gets the performed period end date.
   *
   * @returns The end date if available
   */
  public get performedPeriodEnd(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.performedPeriod?.end)
  }

  /**
   * Gets the procedure code display text.
   *
   * @returns The code display
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Gets the outcome display text.
   *
   * @returns The outcome display
   */
  public get outcomeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.outcome)
  }

  /**
   * Gets all body site displays.
   *
   * @returns Array of body site display texts
   */
  public get bodySiteDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.bodySite)
  }

  /**
   * Gets all reason displays (why the procedure was performed).
   *
   * @returns Array of reason display texts
   */
  public get reasonDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.reasonCode)
  }

  /**
   * Gets note texts from the procedure.
   *
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }

  /**
   * Checks if the procedure was performed within a specific date range.
   *
   * @param rangeStart - Start of the date range
   * @param rangeEnd - End of the date range
   * @returns true if the procedure was performed within the range
   */
  public wasPerformedInRange(rangeStart: Date, rangeEnd: Date): boolean {
    const performedDate = this.performedDate
    if (performedDate) {
      return performedDate >= rangeStart && performedDate <= rangeEnd
    }

    return FhirDomainResource.periodOverlaps(
      this.value.performedPeriod,
      rangeStart,
      rangeEnd,
    )
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
