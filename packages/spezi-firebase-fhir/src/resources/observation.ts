//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type Observation } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  intSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  ratioSchema,
  referenceSchema,
  sampledDataSchema,
  stringSchema,
  timeSchema,
  timingSchema,
} from '../elements/index.js'
import { observationStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR Observation resource (untyped version).
 */
export const untypedObservationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Observation'),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: observationStatusSchema,
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema,
    subject: referenceSchema.optional(),
    focus: referenceSchema.array().optional(),
    encounter: referenceSchema.optional(),
    effectiveDateTime: dateTimeSchema.optional(),
    _effectiveDateTime: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    effectiveTiming: timingSchema.optional(),
    effectiveInstant: instantSchema.optional(),
    _effectiveInstant: elementSchema.optional(),
    issued: instantSchema.optional(),
    _issued: elementSchema.optional(),
    performer: referenceSchema.array().optional(),
    valueQuantity: quantitySchema.optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueInteger: intSchema.optional(),
    valueRange: rangeSchema.optional(),
    valueRatio: ratioSchema.optional(),
    valueSampledData: sampledDataSchema.optional(),
    valueTime: timeSchema.optional(),
    _valueTime: elementSchema.optional(),
    valueDateTime: dateTimeSchema.optional(),
    _valueDateTime: elementSchema.optional(),
    valuePeriod: periodSchema.optional(),
    dataAbsentReason: codeableConceptSchema.optional(),
    interpretation: codeableConceptSchema.array().optional(),
    referenceRange: elementSchema
      .extend({
        low: quantitySchema.optional(),
        high: quantitySchema.optional(),
        type: codeableConceptSchema.optional(),
        appliesTo: codeableConceptSchema.array().optional(),
        age: rangeSchema.optional(),
        text: stringSchema.optional(),
        _text: elementSchema.optional(),
      })
      .array()
      .optional(),
    hasMember: referenceSchema.array().optional(),
    derivedFrom: referenceSchema.array().optional(),
    component: elementSchema
      .extend({
        code: codeableConceptSchema,
        valueQuantity: quantitySchema.optional(),
        valueCodeableConcept: codeableConceptSchema.optional(),
        valueString: stringSchema.optional(),
        _valueString: elementSchema.optional(),
        valueBoolean: booleanSchema.optional(),
        _valueBoolean: elementSchema.optional(),
        valueInteger: intSchema.optional(),
        valueRange: rangeSchema.optional(),
        valueRatio: ratioSchema.optional(),
        valueSampledData: sampledDataSchema.optional(),
        valueTime: timeSchema.optional(),
        _valueTime: elementSchema.optional(),
        valueDateTime: dateTimeSchema.optional(),
        _valueDateTime: elementSchema.optional(),
        valuePeriod: periodSchema.optional(),
        dataAbsentReason: codeableConceptSchema.optional(),
        interpretation: codeableConceptSchema.array().optional(),
        referenceRange: elementSchema
          .extend({
            low: quantitySchema.optional(),
            high: quantitySchema.optional(),
            type: codeableConceptSchema.optional(),
            appliesTo: codeableConceptSchema.array().optional(),
            age: rangeSchema.optional(),
            text: stringSchema.optional(),
            _text: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Observation>

/**
 * Zod schema for FHIR Observation resource.
 */
export const observationSchema: ZodType<Observation> = untypedObservationSchema

/**
 * Wrapper class for FHIR Observation resources.
 * Provides utility methods for working with observations and their effective dates.
 */
export class FhirObservation extends FhirDomainResource<Observation> {
  // Static Functions

  /**
   * Parses an Observation resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirObservation instance
   */
  public static parse(value: unknown): FhirObservation {
    return new FhirObservation(observationSchema.parse(value))
  }

  // Properties

  /**
   * Gets the effective date/time as a JavaScript Date object.
   * Handles effectiveDateTime and effectiveInstant types.
   *
   * @returns The effective date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const effectiveDate = observation.effectiveDate
   * if (effectiveDate) {
   *   console.log(`Observed on: ${effectiveDate.toISOString()}`)
   * }
   * ```
   */
  public get effectiveDate(): Date | undefined {
    return (
      FhirDomainResource.parseDateTime(this.value.effectiveDateTime) ??
      FhirDomainResource.parseDateTime(this.value.effectiveInstant)
    )
  }

  /**
   * Gets the effective period start date as a JavaScript Date object.
   *
   * @returns The start date of the effective period if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const startDate = observation.effectivePeriodStart
   * ```
   */
  public get effectivePeriodStart(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.effectivePeriod?.start)
  }

  /**
   * Gets the effective period end date as a JavaScript Date object.
   *
   * @returns The end date of the effective period if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const endDate = observation.effectivePeriodEnd
   * ```
   */
  public get effectivePeriodEnd(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.effectivePeriod?.end)
  }

  // Methods

  /**
   * Checks if the observation's effective time overlaps with a given date range.
   * Handles effectiveDateTime, effectiveInstant, and effectivePeriod.
   *
   * @param rangeStart - Start of the date range to check
   * @param rangeEnd - End of the date range to check
   * @returns true if the observation's effective time overlaps with the range
   *
   * @example
   * ```typescript
   * const startDate = new Date('2024-01-01')
   * const endDate = new Date('2024-12-31')
   * const isInRange = observation.effectiveOverlaps(startDate, endDate)
   * ```
   */
  public effectiveOverlaps(rangeStart: Date, rangeEnd: Date): boolean {
    const effectiveDate = this.effectiveDate
    if (effectiveDate) {
      return effectiveDate >= rangeStart && effectiveDate <= rangeEnd
    }

    return FhirDomainResource.periodOverlaps(
      this.value.effectivePeriod,
      rangeStart,
      rangeEnd,
    )
  }

  /**
   * Gets the issued date as a JavaScript Date object.
   *
   * @returns The issued date if available
   */
  public get issuedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.issued)
  }

  /**
   * Gets the display text for the observation code.
   *
   * @returns The code display text
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Gets the observation value as a numeric value (from valueQuantity).
   *
   * @returns The numeric value if available
   */
  public get numericValue(): number | undefined {
    return this.value.valueQuantity?.value
  }

  /**
   * Gets the observation value unit (from valueQuantity).
   *
   * @returns The unit string if available
   */
  public get unit(): string | undefined {
    return this.value.valueQuantity?.unit
  }

  /**
   * Gets the observation value as a string (from valueString).
   *
   * @returns The string value if available
   */
  public get stringValue(): string | undefined {
    return this.value.valueString
  }

  /**
   * Gets the observation value as a boolean (from valueBoolean).
   *
   * @returns The boolean value if available
   */
  public get booleanValue(): boolean | undefined {
    return this.value.valueBoolean
  }

  /**
   * Gets the observation value display for CodeableConcept value.
   *
   * @returns The value display text
   */
  public get valueCodeableConceptDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(
      this.value.valueCodeableConcept,
    )
  }

  /**
   * Checks if the observation has a specific category.
   *
   * @param code - The category code to check for
   * @param system - Optional system to filter by
   * @param version - Optional version to filter by
   * @returns true if the observation has the category
   */
  public hasCategory(code: string, system?: string, version?: string): boolean {
    if (!this.value.category) return false

    return this.value.category.some((cat) =>
      FhirDomainResource.containsCoding(cat, { system, code, version }),
    )
  }

  /**
   * Gets interpretation display text.
   *
   * @returns Array of interpretation display texts
   */
  public get interpretationDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.interpretation)
  }

  /**
   * Gets note texts from the observation.
   *
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
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
