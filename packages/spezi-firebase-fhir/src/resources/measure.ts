//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Measure } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  booleanSchema,
  canonicalSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'

const measureStatusSchema = z.enum(['draft', 'active', 'retired', 'unknown'])

const measureScoringSchema = z.enum([
  'proportion',
  'ratio',
  'continuous-variable',
  'cohort',
])

const measureImprovementNotationSchema = z.enum(['increase', 'decrease'])

const measureTypeSchema = z.enum([
  'process',
  'outcome',
  'structure',
  'patient-reported-outcome',
  'composite',
])

export const untypedMeasureSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Measure').readonly(),
    url: urlSchema.optional(),
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
    status: measureStatusSchema,
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
    scoring: measureScoringSchema.optional(),
    compositeScoring: codeableConceptSchema.optional(),
    type: measureTypeSchema.array().optional(),
    riskAdjustment: stringSchema.optional(),
    _riskAdjustment: elementSchema.optional(),
    rateAggregation: stringSchema.optional(),
    _rateAggregation: elementSchema.optional(),
    rationale: markdownSchema.optional(),
    _rationale: elementSchema.optional(),
    clinicalRecommendationStatement: markdownSchema.optional(),
    _clinicalRecommendationStatement: elementSchema.optional(),
    improvementNotation: measureImprovementNotationSchema.optional(),
    definition: markdownSchema.array().optional(),
    _definition: elementSchema.array().optional(),
    guidance: markdownSchema.optional(),
    _guidance: elementSchema.optional(),
    group: elementSchema
      .extend({
        code: codeableConceptSchema.optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        population: elementSchema
          .extend({
            code: codeableConceptSchema.optional(),
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            criteria: z
              .object({
                description: stringSchema.optional(),
                _description: elementSchema.optional(),
                name: stringSchema.optional(),
                _name: elementSchema.optional(),
                language: stringSchema,
                _language: elementSchema.optional(),
                expression: stringSchema.optional(),
                _expression: elementSchema.optional(),
                reference: urlSchema.optional(),
                _reference: elementSchema.optional(),
              })
              .passthrough(),
          })
          .array()
          .optional(),
        stratifier: elementSchema
          .extend({
            code: codeableConceptSchema.optional(),
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            criteria: z
              .object({
                description: stringSchema.optional(),
                _description: elementSchema.optional(),
                name: stringSchema.optional(),
                _name: elementSchema.optional(),
                language: stringSchema,
                _language: elementSchema.optional(),
                expression: stringSchema.optional(),
                _expression: elementSchema.optional(),
                reference: urlSchema.optional(),
                _reference: elementSchema.optional(),
              })
              .passthrough()
              .optional(),
            component: elementSchema
              .extend({
                code: codeableConceptSchema.optional(),
                description: stringSchema.optional(),
                _description: elementSchema.optional(),
                criteria: z
                  .object({
                    description: stringSchema.optional(),
                    _description: elementSchema.optional(),
                    name: stringSchema.optional(),
                    _name: elementSchema.optional(),
                    language: stringSchema,
                    _language: elementSchema.optional(),
                    expression: stringSchema.optional(),
                    _expression: elementSchema.optional(),
                    reference: urlSchema.optional(),
                    _reference: elementSchema.optional(),
                  })
                  .passthrough(),
              })
              .array()
              .optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    supplementalData: elementSchema
      .extend({
        code: codeableConceptSchema.optional(),
        usage: codeableConceptSchema.array().optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        criteria: z
          .object({
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            name: stringSchema.optional(),
            _name: elementSchema.optional(),
            language: stringSchema,
            _language: elementSchema.optional(),
            expression: stringSchema.optional(),
            _expression: elementSchema.optional(),
            reference: urlSchema.optional(),
            _reference: elementSchema.optional(),
          })
          .passthrough(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Measure>

export const measureSchema: ZodType<Measure> = untypedMeasureSchema

export class FhirMeasure extends FhirDomainResource<Measure> {
  // Static Functions

  public static parse(value: unknown): FhirMeasure {
    return new FhirMeasure(measureSchema.parse(value))
  }
}
