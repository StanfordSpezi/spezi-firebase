//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { CoverageEligibilityRequest } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedCoverageEligibilityRequestSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('CoverageEligibilityRequest').readonly(),
    })
    .passthrough(),
)

export const coverageEligibilityRequestSchema =
  untypedCoverageEligibilityRequestSchema

export class FhirCoverageEligibilityRequest extends FhirDomainResource<CoverageEligibilityRequest> {
  // Static Functions

  public static parse(value: unknown): FhirCoverageEligibilityRequest {
    const parsed = coverageEligibilityRequestSchema.parse(value)
    return new FhirCoverageEligibilityRequest(
      parsed as unknown as CoverageEligibilityRequest,
    )
  }
}
