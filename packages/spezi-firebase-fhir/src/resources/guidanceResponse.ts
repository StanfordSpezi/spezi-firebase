//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type GuidanceResponse } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedGuidanceResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('GuidanceResponse').readonly(),
  }).passthrough(),
)

export const guidanceResponseSchema = untypedGuidanceResponseSchema

export class FhirGuidanceResponse extends FhirDomainResource<GuidanceResponse> {
  // Static Functions

  public static parse(value: unknown): FhirGuidanceResponse {
    const parsed = guidanceResponseSchema.parse(value)
    return new FhirGuidanceResponse(parsed as unknown as GuidanceResponse)
  }
}
