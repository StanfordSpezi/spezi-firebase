//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type Measure,
  type MeasureGroup,
  type MeasureGroupPopulation,
  type MeasureGroupStratifier,
  type MeasureGroupStratifierComponent,
  type MeasureSupplementalData,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  canonicalSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  expressionSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  uriSchema,
  usageContextSchema,
} from '../elements/index.js'
import { publicationStatusSchema } from '../valueSets/index.js'

const measureGroupStratifierComponentSchema: ZodType<MeasureGroupStratifierComponent> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    criteria: expressionSchema,
  })

const measureGroupStratifierSchema: ZodType<MeasureGroupStratifier> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    criteria: expressionSchema.optional(),
    component: measureGroupStratifierComponentSchema.array().optional(),
  })

const measureGroupPopulationSchema: ZodType<MeasureGroupPopulation> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    criteria: expressionSchema,
  })

const measureGroupSchema: ZodType<MeasureGroup> = backboneElementSchema.extend({
  code: codeableConceptSchema.optional(),
  description: stringSchema.optional(),
  _description: elementSchema.optional(),
  population: measureGroupPopulationSchema.array().optional(),
  stratifier: measureGroupStratifierSchema.array().optional(),
})

const measureSupplementalDataSchema: ZodType<MeasureSupplementalData> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    usage: codeableConceptSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    criteria: expressionSchema,
  })

/**
 * Zod schema for FHIR Measure resource (untyped version).
 */
export const untypedMeasureSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Measure').readonly(),
    url: uriSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    subtitle: stringSchema.optional(),
    _subtitle: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    subjectCodeableConcept: codeableConceptSchema.optional(),
    subjectReference: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    usage: stringSchema.optional(),
    _usage: elementSchema.optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    approvalDate: dateSchema.optional(),
    _approvalDate: elementSchema.optional(),
    lastReviewDate: dateSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    topic: codeableConceptSchema.array().optional(),
    author: contactDetailSchema.array().optional(),
    editor: contactDetailSchema.array().optional(),
    reviewer: contactDetailSchema.array().optional(),
    endorser: contactDetailSchema.array().optional(),
    relatedArtifact: relatedArtifactSchema.array().optional(),
    library: canonicalSchema.array().optional(),
    _library: elementSchema.array().optional(),
    disclaimer: markdownSchema.optional(),
    _disclaimer: elementSchema.optional(),
    scoring: codeableConceptSchema.optional(),
    compositeScoring: codeableConceptSchema.optional(),
    type: codeableConceptSchema.array().optional(),
    riskAdjustment: stringSchema.optional(),
    _riskAdjustment: elementSchema.optional(),
    rateAggregation: stringSchema.optional(),
    _rateAggregation: elementSchema.optional(),
    rationale: markdownSchema.optional(),
    _rationale: elementSchema.optional(),
    clinicalRecommendationStatement: markdownSchema.optional(),
    _clinicalRecommendationStatement: elementSchema.optional(),
    improvementNotation: codeableConceptSchema.optional(),
    definition: markdownSchema.array().optional(),
    _definition: elementSchema.array().optional(),
    guidance: markdownSchema.optional(),
    _guidance: elementSchema.optional(),
    group: measureGroupSchema.array().optional(),
    supplementalData: measureSupplementalDataSchema.array().optional(),
  }),
) satisfies ZodType<Measure>

/**
 * Zod schema for FHIR Measure resource.
 */
export const measureSchema: ZodType<Measure> = untypedMeasureSchema

/**
 * Wrapper class for FHIR Measure resources.
 * Provides utility methods for working with quality measures and clinical decision support.
 */
export class FhirMeasure extends FhirDomainResource<Measure> {
  // Static Functions

  /**
   * Parses a Measure resource from unknown data.
   *
   * @param value - The data to parse and validate against the Measure schema
   * @returns A FhirMeasure instance containing the validated resource
   */
  public static parse(value: unknown): FhirMeasure {
    return new FhirMeasure(measureSchema.parse(value))
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
