//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type RegulatedAuthorization } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedRegulatedAuthorizationSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('RegulatedAuthorization').readonly(),
    })
    .passthrough(),
)

export const regulatedAuthorizationSchema = untypedRegulatedAuthorizationSchema

export class FhirRegulatedAuthorization extends FhirDomainResource<RegulatedAuthorization> {
  // Static Functions

  public static parse(value: unknown): FhirRegulatedAuthorization {
    const parsed = regulatedAuthorizationSchema.parse(value)
    return new FhirRegulatedAuthorization(
      parsed as unknown as RegulatedAuthorization,
    )
  }
}
