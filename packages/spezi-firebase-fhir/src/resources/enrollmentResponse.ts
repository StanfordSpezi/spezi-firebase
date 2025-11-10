//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type EnrollmentResponse } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  elementSchema,
  referenceSchema,
  stringSchema,
  dateTimeSchema,
} from '../elements/index.js'
import {
  financialResourceStatusSchema,
  remittanceOutcomeSchema,
} from '../valueSets/index.js'

export const untypedEnrollmentResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('EnrollmentResponse').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema.optional(),
    _status: elementSchema.optional(),
    request: referenceSchema.optional(),
    outcome: remittanceOutcomeSchema.optional(),
    _outcome: elementSchema.optional(),
    disposition: stringSchema.optional(),
    _disposition: elementSchema.optional(),
    created: dateTimeSchema.optional(),
    _created: elementSchema.optional(),
    organization: referenceSchema.optional(),
    requestProvider: referenceSchema.optional(),
  }),
) satisfies ZodType<EnrollmentResponse>

export const enrollmentResponseSchema: ZodType<EnrollmentResponse> =
  untypedEnrollmentResponseSchema

export class FhirEnrollmentResponse extends FhirDomainResource<EnrollmentResponse> {
  // Static Functions

  public static parse(value: unknown): FhirEnrollmentResponse {
    return new FhirEnrollmentResponse(enrollmentResponseSchema.parse(value))
  }
}
