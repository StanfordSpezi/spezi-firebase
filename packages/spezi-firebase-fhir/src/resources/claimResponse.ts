//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ClaimResponse } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedClaimResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ClaimResponse').readonly(),
  }).passthrough(),
)

export const claimResponseSchema = untypedClaimResponseSchema

export class FhirClaimResponse extends FhirDomainResource<ClaimResponse> {
  // Static Functions

  public static parse(value: unknown): FhirClaimResponse {
    const parsed = claimResponseSchema.parse(value)
    return new FhirClaimResponse(parsed as unknown as ClaimResponse)
  }
}
