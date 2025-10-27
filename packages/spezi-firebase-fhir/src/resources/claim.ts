//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type Claim } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedClaimSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Claim').readonly(),
    })
    .passthrough(),
)

export const claimSchema = untypedClaimSchema

export class FhirClaim extends FhirDomainResource<Claim> {
  // Static Functions

  public static parse(value: unknown): FhirClaim {
    const parsed = claimSchema.parse(value)
    return new FhirClaim(parsed as unknown as Claim)
  }
}
