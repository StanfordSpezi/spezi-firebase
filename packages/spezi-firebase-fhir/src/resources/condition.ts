//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Condition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

export const untypedConditionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Condition').readonly(),
    identifier: identifierSchema.array().optional(),
    clinicalStatus: codeableConceptSchema.optional(),
    verificationStatus: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    severity: codeableConceptSchema.optional(),
    code: codeableConceptSchema.optional(),
    bodySite: codeableConceptSchema.array().optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    onsetDateTime: dateTimeSchema.optional(),
    _onsetDateTime: elementSchema.optional(),
    onsetAge: quantitySchema.optional(),
    onsetPeriod: periodSchema.optional(),
    onsetRange: rangeSchema.optional(),
    onsetString: stringSchema.optional(),
    _onsetString: elementSchema.optional(),
    abatementDateTime: dateTimeSchema.optional(),
    _abatementDateTime: elementSchema.optional(),
    abatementAge: quantitySchema.optional(),
    abatementPeriod: periodSchema.optional(),
    abatementRange: rangeSchema.optional(),
    abatementString: stringSchema.optional(),
    _abatementString: elementSchema.optional(),
    recordedDate: dateTimeSchema.optional(),
    _recordedDate: elementSchema.optional(),
    recorder: referenceSchema.optional(),
    asserter: referenceSchema.optional(),
    stage: backboneElementSchema
      .extend({
        summary: codeableConceptSchema.optional(),
        assessment: referenceSchema.array().optional(),
        type: codeableConceptSchema.optional(),
      })
      .array()
      .optional(),
    evidence: backboneElementSchema
      .extend({
        code: codeableConceptSchema.array().optional(),
        detail: referenceSchema.array().optional(),
      })
      .array()
      .optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<Condition>

export const conditionSchema: ZodType<Condition> = untypedConditionSchema

export class FhirCondition extends FhirDomainResource<Condition> {
  // Static Functions

  public static parse(value: unknown): FhirCondition {
    return new FhirCondition(conditionSchema.parse(value))
  }
}
