//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type CarePlan,
  type CarePlanActivity,
  type CarePlanActivityDetail,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
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
  timingSchema,
  uriSchema,
} from '../elements/index.js'
import {
  carePlanActivityKindSchema,
  carePlanActivityStatusSchema,
  carePlanIntentSchema,
  carePlanStatusSchema,
} from '../valueSets/index.js'

const carePlanActivityDetailSchema: ZodType<CarePlanActivityDetail> =
  backboneElementSchema.extend({
    kind: carePlanActivityKindSchema.optional(),
    _kind: elementSchema.optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    code: codeableConceptSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    goal: referenceSchema.array().optional(),
    status: carePlanActivityStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    doNotPerform: booleanSchema.optional(),
    _doNotPerform: elementSchema.optional(),
    scheduledTiming: timingSchema.optional(),
    scheduledPeriod: periodSchema.optional(),
    scheduledString: stringSchema.optional(),
    _scheduledString: elementSchema.optional(),
    location: referenceSchema.optional(),
    performer: referenceSchema.array().optional(),
    productCodeableConcept: codeableConceptSchema.optional(),
    productReference: referenceSchema.optional(),
    dailyAmount: quantitySchema.optional(),
    quantity: quantitySchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
  })

const carePlanActivitySchema: ZodType<CarePlanActivity> =
  backboneElementSchema.extend({
    outcomeCodeableConcept: codeableConceptSchema.array().optional(),
    outcomeReference: referenceSchema.array().optional(),
    progress: annotationSchema.array().optional(),
    reference: referenceSchema.optional(),
    detail: carePlanActivityDetailSchema.optional(),
  })

/**
 * Zod schema for FHIR CarePlan resource (untyped version).
 */
export const untypedCarePlanSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CarePlan').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    replaces: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: carePlanStatusSchema,
    _status: elementSchema.optional(),
    intent: carePlanIntentSchema,
    _intent: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    period: periodSchema.optional(),
    created: dateTimeSchema.optional(),
    _created: elementSchema.optional(),
    author: referenceSchema.optional(),
    contributor: referenceSchema.array().optional(),
    careTeam: referenceSchema.array().optional(),
    addresses: referenceSchema.array().optional(),
    supportingInfo: referenceSchema.array().optional(),
    goal: referenceSchema.array().optional(),
    activity: carePlanActivitySchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<CarePlan>

/**
 * Zod schema for FHIR CarePlan resource.
 */
export const carePlanSchema: ZodType<CarePlan> = untypedCarePlanSchema

/**
 * Wrapper class for FHIR CarePlan resources.
 * Provides utility methods for working with care plans.
 */
export class FhirCarePlan extends FhirDomainResource<CarePlan> {
  // Static Functions

  /**
   * Parses a CarePlan resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirCarePlan instance
   */
  public static parse(value: unknown): FhirCarePlan {
    return new FhirCarePlan(carePlanSchema.parse(value))
  }

  // Properties

  /**
   * Gets the created date as a JavaScript Date object.
   *
   * @returns The created date if available
   */
  public get createdDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.created)
  }

  /**
   * Gets the period start date.
   *
   * @returns The start date if available
   */
  public get periodStart(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.period?.start)
  }

  /**
   * Gets the period end date.
   *
   * @returns The end date if available
   */
  public get periodEnd(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.period?.end)
  }

  /**
   * Checks if the care plan period is currently active.
   *
   * @param asOfDate - Date to check against (defaults to now)
   * @returns true if the period is active
   */
  public periodIsActive(asOfDate: Date = new Date()): boolean {
    return FhirDomainResource.periodIsActive(this.value.period, asOfDate)
  }

  /**
   * Gets all category displays.
   *
   * @returns Array of category display texts
   */
  public get categoryDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.category)
  }

  /**
   * Gets note texts from the care plan.
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
