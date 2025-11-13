//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type Goal, type GoalTarget } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  rangeSchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { goalLifecycleStatusSchema } from '../valueSets/index.js'

const goalTargetSchema: ZodType<GoalTarget> = backboneElementSchema.extend({
  measure: codeableConceptSchema.optional(),
  detailQuantity: quantitySchema.optional(),
  detailRange: rangeSchema.optional(),
  detailCodeableConcept: codeableConceptSchema.optional(),
  detailString: stringSchema.optional(),
  _detailString: elementSchema.optional(),
  detailBoolean: booleanSchema.optional(),
  _detailBoolean: elementSchema.optional(),
  detailInteger: z.number().optional(),
  _detailInteger: elementSchema.optional(),
  detailRatio: ratioSchema.optional(),
  dueDate: dateSchema.optional(),
  _dueDate: elementSchema.optional(),
  dueDuration: quantitySchema.optional(),
})

/**
 * Zod schema for FHIR Goal resource (untyped version).
 */
export const untypedGoalSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Goal').readonly(),
    identifier: identifierSchema.array().optional(),
    lifecycleStatus: goalLifecycleStatusSchema,
    _lifecycleStatus: elementSchema.optional(),
    achievementStatus: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    priority: codeableConceptSchema.optional(),
    description: codeableConceptSchema,
    subject: referenceSchema,
    startDate: dateSchema.optional(),
    _startDate: elementSchema.optional(),
    startCodeableConcept: codeableConceptSchema.optional(),
    target: goalTargetSchema.array().optional(),
    statusDate: dateSchema.optional(),
    _statusDate: elementSchema.optional(),
    statusReason: stringSchema.optional(),
    _statusReason: elementSchema.optional(),
    expressedBy: referenceSchema.optional(),
    addresses: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    outcomeCode: codeableConceptSchema.array().optional(),
    outcomeReference: referenceSchema.array().optional(),
  }),
) satisfies ZodType<Goal>

/**
 * Zod schema for FHIR Goal resource.
 */
export const goalSchema: ZodType<Goal> = untypedGoalSchema

/**
 * Wrapper class for FHIR Goal resources.
 * Provides utility methods for working with goals.
 */
export class FhirGoal extends FhirDomainResource<Goal> {
  // Static Functions

  /**
   * Parses a Goal resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirGoal instance
   */
  public static parse(value: unknown): FhirGoal {
    return new FhirGoal(goalSchema.parse(value))
  }

  // Properties

  /**
   * Gets the start date as a JavaScript Date object.
   *
   * @returns The start date if available
   */
  public get startDate(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.startDate)
  }

  /**
   * Gets the description display text.
   *
   * @returns The description display
   */
  public get descriptionDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.description)
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
   * Gets note texts from the goal.
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
   * @returns Array of identifier values matching any provided type
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
