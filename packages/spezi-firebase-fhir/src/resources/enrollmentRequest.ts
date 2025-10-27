//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { EnrollmentRequest } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedEnrollmentRequestSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('EnrollmentRequest').readonly(),
    })
    .passthrough(),
)

export const enrollmentRequestSchema = untypedEnrollmentRequestSchema

export class FhirEnrollmentRequest extends FhirDomainResource<EnrollmentRequest> {
  // Static Functions

  public static parse(value: unknown): FhirEnrollmentRequest {
    const parsed = enrollmentRequestSchema.parse(value)
    return new FhirEnrollmentRequest(parsed as unknown as EnrollmentRequest)
  }
}
