//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type RiskAssessment } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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

const riskAssessmentStatusSchema = z.enum([
  'registered',
  'preliminary',
  'final',
  'amended',
  'corrected',
  'cancelled',
  'entered-in-error',
  'unknown',
])

export const untypedRiskAssessmentSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('RiskAssessment').readonly(),
    basedOn: referenceSchema.optional(),
    basis: referenceSchema.array().optional(),
    code: codeableConceptSchema.optional(),
    condition: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    identifier: identifierSchema.array().optional(),
    method: codeableConceptSchema.optional(),
    mitigation: stringSchema.optional(),
    _mitigation: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    parent: referenceSchema.optional(),
    performer: referenceSchema.optional(),
    prediction: backboneElementSchema
      .extend({
        outcome: codeableConceptSchema.optional(),
        probabilityDecimal: decimalSchema.optional(),
        probabilityRange: rangeSchema.optional(),
        qualitativeRisk: codeableConceptSchema.optional(),
        rationale: stringSchema.optional(),
        _rationale: elementSchema.optional(),
        relativeRisk: decimalSchema.optional(),
        whenPeriod: periodSchema.optional(),
        whenRange: rangeSchema.optional(),
      })
      .array()
      .optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    status: riskAssessmentStatusSchema,
    _status: elementSchema.optional(),
    subject: referenceSchema,
  }),
) satisfies ZodType<RiskAssessment>

export const riskAssessmentSchema: ZodType<RiskAssessment> =
  untypedRiskAssessmentSchema

export class FhirRiskAssessment extends FhirDomainResource<RiskAssessment> {
  // Static Functions

  public static parse(value: unknown): FhirRiskAssessment {
    return new FhirRiskAssessment(riskAssessmentSchema.parse(value))
  }
}
