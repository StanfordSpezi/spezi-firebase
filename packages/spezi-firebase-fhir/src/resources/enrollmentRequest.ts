//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type EnrollmentRequest } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  elementSchema,
  referenceSchema,
  dateTimeSchema,
} from '../elements/index.js'
import { financialResourceStatusSchema } from '../valueSets/index.js'

export const untypedEnrollmentRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('EnrollmentRequest').readonly(),
    identifier: identifierSchema.array().optional(),
    status: financialResourceStatusSchema.optional(),
    _status: elementSchema.optional(),
    created: dateTimeSchema.optional(),
    _created: elementSchema.optional(),
    insurer: referenceSchema.optional(),
    provider: referenceSchema.optional(),
    candidate: referenceSchema.optional(),
    coverage: referenceSchema.optional(),
  }),
) satisfies ZodType<EnrollmentRequest>

export const enrollmentRequestSchema: ZodType<EnrollmentRequest> =
  untypedEnrollmentRequestSchema

export class FhirEnrollmentRequest extends FhirDomainResource<EnrollmentRequest> {
  public static parse(value: unknown): FhirEnrollmentRequest {
    return new FhirEnrollmentRequest(enrollmentRequestSchema.parse(value))
  }
}
