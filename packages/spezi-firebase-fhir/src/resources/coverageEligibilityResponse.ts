//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CoverageEligibilityResponse } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedCoverageEligibilityResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CoverageEligibilityResponse').readonly(),
  }).passthrough(),
)

export const coverageEligibilityResponseSchema = untypedCoverageEligibilityResponseSchema

export class FhirCoverageEligibilityResponse extends FhirDomainResource<CoverageEligibilityResponse> {
  // Static Functions

  public static parse(value: unknown): FhirCoverageEligibilityResponse {
    const parsed = coverageEligibilityResponseSchema.parse(value)
    return new FhirCoverageEligibilityResponse(parsed as unknown as CoverageEligibilityResponse)
  }
}
