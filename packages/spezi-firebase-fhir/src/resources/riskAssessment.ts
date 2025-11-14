//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type RiskAssessmentPrediction,
  type RiskAssessment,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { riskAssessmentStatusSchema } from '../valueSets/index.js'

const riskAssessmentPredictionSchema: ZodType<RiskAssessmentPrediction> =
  backboneElementSchema.extend({
    outcome: codeableConceptSchema.optional(),
    probabilityDecimal: decimalSchema.optional(),
    probabilityRange: rangeSchema.optional(),
    qualitativeRisk: codeableConceptSchema.optional(),
    relativeRisk: decimalSchema.optional(),
    whenPeriod: periodSchema.optional(),
    whenRange: rangeSchema.optional(),
    rationale: stringSchema.optional(),
    _rationale: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR RiskAssessment resource (untyped version).
 */
export const untypedRiskAssessmentSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('RiskAssessment').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.optional(),
    parent: referenceSchema.optional(),
    status: riskAssessmentStatusSchema,
    _status: elementSchema.optional(),
    method: codeableConceptSchema.optional(),
    code: codeableConceptSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    condition: referenceSchema.optional(),
    performer: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    basis: referenceSchema.array().optional(),
    prediction: riskAssessmentPredictionSchema.array().optional(),
    mitigation: stringSchema.optional(),
    _mitigation: elementSchema.optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<RiskAssessment>

/**
 * Zod schema for FHIR RiskAssessment resource.
 */
export const riskAssessmentSchema: ZodType<RiskAssessment> =
  untypedRiskAssessmentSchema

/**
 * Wrapper class for FHIR RiskAssessment resources.
 * Provides utility methods for working with risk assessments and clinical predictions.
 */
export class FhirRiskAssessment extends FhirDomainResource<RiskAssessment> {
  /**
   * Parses a RiskAssessment resource from unknown data.
   *
   * @param value - The data to parse and validate against the RiskAssessment schema
   * @returns A FhirRiskAssessment instance containing the validated resource
   */
  public static parse(value: unknown): FhirRiskAssessment {
    return new FhirRiskAssessment(riskAssessmentSchema.parse(value))
  }

  /**
   * Get the date the risk assessment was performed.
   *
   * @returns The occurrence date, or undefined if not set
   */
  public get occurrenceDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.occurrenceDateTime)
  }

  /**
   * Get the note texts from the assessment.
   *
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }

  /**
   * Get the code display for the risk assessment.
   *
   * @returns The code display text, or undefined if not set
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
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
