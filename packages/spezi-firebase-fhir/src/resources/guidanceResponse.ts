//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type GuidanceResponse } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  canonicalSchema,
  codeableConceptSchema,
  dataRequirementSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
  urlSchema,
} from '../elements/index.js'

const guidanceResponseStatusSchema = z.enum([
  'success',
  'data-requested',
  'data-required',
  'in-progress',
  'failure',
  'entered-in-error',
])

export const untypedGuidanceResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('GuidanceResponse').readonly(),
    requestIdentifier: identifierSchema.optional(),
    identifier: identifierSchema.array().optional(),
    moduleUri: urlSchema.optional(),
    _moduleUri: elementSchema.optional(),
    moduleCanonical: canonicalSchema.optional(),
    _moduleCanonical: elementSchema.optional(),
    moduleCodeableConcept: codeableConceptSchema.optional(),
    status: guidanceResponseStatusSchema,
    _status: elementSchema.optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    performer: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    evaluationMessage: referenceSchema.array().optional(),
    outputParameters: referenceSchema.optional(),
    result: referenceSchema.optional(),
    dataRequirement: dataRequirementSchema.array().optional(),
  }),
) satisfies ZodType<GuidanceResponse>

export const guidanceResponseSchema: ZodType<GuidanceResponse> =
  untypedGuidanceResponseSchema

export class FhirGuidanceResponse extends FhirDomainResource<GuidanceResponse> {
  // Static Functions

  public static parse(value: unknown): FhirGuidanceResponse {
    return new FhirGuidanceResponse(guidanceResponseSchema.parse(value))
  }
}
