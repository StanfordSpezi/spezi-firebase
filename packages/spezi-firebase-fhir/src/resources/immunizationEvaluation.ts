//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ImmunizationEvaluation } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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
)

export const immunizationEvaluationSchema =
  untypedImmunizationEvaluationSchema

export class FhirImmunizationEvaluation extends FhirDomainResource<ImmunizationEvaluation> {
  // Static Functions

  public static parse(value: unknown): FhirImmunizationEvaluation {
    return new FhirImmunizationEvaluation(
      immunizationEvaluationSchema.parse(value),
    )
  }
}
