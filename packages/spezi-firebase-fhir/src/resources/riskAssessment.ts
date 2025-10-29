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
import { riskAssessmentStatusSchema } from '../valueSets/index.js'

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
    prediction: backboneElementSchema
      .extend({
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
      .array()
      .optional(),
    mitigation: stringSchema.optional(),
    _mitigation: elementSchema.optional(),
    note: annotationSchema.array().optional(),
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
