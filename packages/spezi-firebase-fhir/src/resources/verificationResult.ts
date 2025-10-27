//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { VerificationResult } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedVerificationResultSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('VerificationResult').readonly(),
    })
    .passthrough(),
)

export const verificationResultSchema = untypedVerificationResultSchema

export class FhirVerificationResult extends FhirDomainResource<VerificationResult> {
  // Static Functions

  public static parse(value: unknown): FhirVerificationResult {
    const parsed = verificationResultSchema.parse(value)
    return new FhirVerificationResult(parsed as unknown as VerificationResult)
  }
}
