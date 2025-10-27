//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { Basic } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedBasicSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Basic').readonly(),
    })
    .passthrough(),
)

export const basicSchema = untypedBasicSchema

export class FhirBasic extends FhirDomainResource<Basic> {
  // Static Functions

  public static parse(value: unknown): FhirBasic {
    const parsed = basicSchema.parse(value)
    return new FhirBasic(parsed as unknown as Basic)
  }
}
