//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type EnrollmentResponse } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedEnrollmentResponseSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('EnrollmentResponse').readonly(),
    })
    .passthrough(),
)

export const enrollmentResponseSchema = untypedEnrollmentResponseSchema

export class FhirEnrollmentResponse extends FhirDomainResource<EnrollmentResponse> {
  // Static Functions

  public static parse(value: unknown): FhirEnrollmentResponse {
    const parsed = enrollmentResponseSchema.parse(value)
    return new FhirEnrollmentResponse(parsed as unknown as EnrollmentResponse)
  }
}
