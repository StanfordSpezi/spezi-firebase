//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ConditionEvidence,
  type ConditionStage,
  type Condition,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const conditionStageSchema: ZodType<ConditionStage> =
  backboneElementSchema.extend({
    summary: codeableConceptSchema.optional(),
    assessment: referenceSchema.array().optional(),
    type: codeableConceptSchema.optional(),
  })

const conditionEvidenceSchema: ZodType<ConditionEvidence> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.array().optional(),
    detail: referenceSchema.array().optional(),
  })

/**
 * Zod schema for FHIR Condition resource (untyped version).
 */
export const untypedConditionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Condition').readonly(),
    identifier: identifierSchema.array().optional(),
    clinicalStatus: codeableConceptSchema.optional(),
    verificationStatus: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    severity: codeableConceptSchema.optional(),
    code: codeableConceptSchema.optional(),
    bodySite: codeableConceptSchema.array().optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    onsetDateTime: dateTimeSchema.optional(),
    _onsetDateTime: elementSchema.optional(),
    onsetAge: quantitySchema.optional(),
    onsetPeriod: periodSchema.optional(),
    onsetRange: rangeSchema.optional(),
    onsetString: stringSchema.optional(),
    _onsetString: elementSchema.optional(),
    abatementDateTime: dateTimeSchema.optional(),
    _abatementDateTime: elementSchema.optional(),
    abatementAge: quantitySchema.optional(),
    abatementPeriod: periodSchema.optional(),
    abatementRange: rangeSchema.optional(),
    abatementString: stringSchema.optional(),
    _abatementString: elementSchema.optional(),
    recordedDate: dateTimeSchema.optional(),
    _recordedDate: elementSchema.optional(),
    recorder: referenceSchema.optional(),
    asserter: referenceSchema.optional(),
    stage: conditionStageSchema.array().optional(),
    evidence: conditionEvidenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<Condition>

/**
 * Zod schema for FHIR Condition resource.
 */
export const conditionSchema: ZodType<Condition> = untypedConditionSchema

/**
 * Wrapper class for FHIR Condition resources.
 * Provides utility methods for working with conditions and their temporal aspects.
 */
export class FhirCondition extends FhirDomainResource<Condition> {
  // Static Functions

  /**
   * Parses a Condition resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirCondition instance
   */
  public static parse(value: unknown): FhirCondition {
    return new FhirCondition(conditionSchema.parse(value))
  }

  // Properties

  /**
   * Gets the condition onset date as a JavaScript Date object (from onsetDateTime).
   *
   * @returns The onset date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const onsetDate = condition.onsetDate
   * if (onsetDate) {
   *   console.log(`Condition started on: ${onsetDate.toLocaleDateString()}`)
   * }
   * ```
   */
  public get onsetDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.onsetDateTime)
  }

  /**
   * Gets the condition abatement date as a JavaScript Date object (from abatementDateTime).
   *
   * @returns The abatement date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const abatementDate = condition.abatementDate
   * if (abatementDate) {
   *   console.log(`Condition resolved on: ${abatementDate.toLocaleDateString()}`)
   * }
   * ```
   */
  public get abatementDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.abatementDateTime)
  }

  /**
   * Gets the recorded date as a JavaScript Date object.
   *
   * @returns The recorded date if available, undefined otherwise
   */
  public get recordedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.recordedDate)
  }

  /**
   * Checks if the condition is currently active (no abatement).
   *
   * @returns true if the condition is active (has no abatement information)
   *
   * @example
   * ```typescript
   * if (condition.isActive) {
   *   console.log('Condition is currently active')
   * }
   * ```
   */
  public get isActive(): boolean {
    return (
      !this.value.abatementDateTime &&
      !this.value.abatementAge &&
      !this.value.abatementPeriod &&
      !this.value.abatementRange &&
      !this.value.abatementString
    )
  }

  /**
   * Checks if the condition has a confirmed clinical status.
   *
   * @returns true if clinical status is confirmed
   *
   * @example
   * ```typescript
   * if (condition.isConfirmed) {
   *   console.log('Condition is confirmed')
   * }
   * ```
   */
  public get isConfirmed(): boolean {
    return FhirDomainResource.containsCoding(this.value.verificationStatus, {
      system: 'http://terminology.hl7.org/CodeSystem/condition-ver-status',
      code: 'confirmed',
    })
  }

  /**
   * Calculates the duration of the condition in milliseconds.
   * If abatement is not set, duration is undefined.
   *
   * @returns Duration in milliseconds, or undefined if onset or abatement is missing
   *
   * @example
   * ```typescript
   * const duration = condition.getDuration()
   * if (duration) {
   *   const days = duration / (1000 * 60 * 60 * 24)
   *   console.log(`Condition lasted ${days.toFixed(0)} days`)
   * }
   * ```
   */
  public get duration(): number | undefined {
    const onset = this.onsetDate
    const abatement = this.abatementDate

    if (!onset || !abatement) return undefined

    return abatement.getTime() - onset.getTime()
  }

  /**
   * Determines if this is likely a chronic condition based on duration.
   * A condition is considered chronic if it has lasted more than 90 days or has no abatement date.
   *
   * @param chronicThresholdDays - Number of days to consider a condition chronic (default: 90)
   * @returns true if condition appears to be chronic
   *
   * @example
   * ```typescript
   * if (condition.isChronicCondition()) {
   *   console.log('This is a chronic condition requiring ongoing management')
   * }
   * ```
   */
  public isChronicCondition(chronicThresholdDays = 90): boolean {
    // If no abatement date, assume ongoing and potentially chronic
    if (!this.abatementDate) {
      const onset = this.onsetDate
      if (!onset) return false

      // Check if onset was more than threshold days ago
      const now = new Date()
      const daysSinceOnset =
        (now.getTime() - onset.getTime()) / (1000 * 60 * 60 * 24)
      return daysSinceOnset > chronicThresholdDays
    }

    // If there is abatement, check duration
    const duration = this.duration
    if (!duration) return false

    const durationDays = duration / (1000 * 60 * 60 * 24)
    return durationDays > chronicThresholdDays
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
