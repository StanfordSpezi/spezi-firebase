//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type ImmunizationEvaluation } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  positiveIntSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { immunizationEvaluationStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR ImmunizationEvaluation resource (untyped version).
 */
export const untypedImmunizationEvaluationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ImmunizationEvaluation').readonly(),
    identifier: identifierSchema.array().optional(),
    status: immunizationEvaluationStatusSchema,
    _status: elementSchema.optional(),
    patient: referenceSchema,
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    authority: referenceSchema.optional(),
    targetDisease: codeableConceptSchema,
    immunizationEvent: referenceSchema,
    doseStatus: codeableConceptSchema,
    doseStatusReason: codeableConceptSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    series: stringSchema.optional(),
    _series: elementSchema.optional(),
    doseNumberPositiveInt: positiveIntSchema.optional(),
    doseNumberString: stringSchema.optional(),
    _doseNumberString: elementSchema.optional(),
    seriesDosesPositiveInt: positiveIntSchema.optional(),
    seriesDosesString: stringSchema.optional(),
    _seriesDosesString: elementSchema.optional(),
  }),
) satisfies ZodType<ImmunizationEvaluation>

/**
 * Zod schema for FHIR ImmunizationEvaluation resource.
 */
export const immunizationEvaluationSchema: ZodType<ImmunizationEvaluation> =
  untypedImmunizationEvaluationSchema

/**
 * Wrapper class for FHIR ImmunizationEvaluation resources.
 * Provides utility methods for working with immunization evaluations and assessments.
 */
export class FhirImmunizationEvaluation extends FhirDomainResource<ImmunizationEvaluation> {
  // Static Functions

  /**
   * Parses an ImmunizationEvaluation resource from unknown data.
   *
   * @param value - The data to parse and validate against the ImmunizationEvaluation schema
   * @returns A FhirImmunizationEvaluation instance containing the validated resource
   */
  public static parse(value: unknown): FhirImmunizationEvaluation {
    return new FhirImmunizationEvaluation(
      immunizationEvaluationSchema.parse(value),
    )
  }

  /**
   * Gets all identifier values that match any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns Array of identifier values matching the specified systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value that matches any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values that match any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns Array of identifier values matching the specified types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value that matches any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
