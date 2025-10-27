//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { CommunicationRequest } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedCommunicationRequestSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('CommunicationRequest').readonly(),
    })
    .passthrough(),
)

export const communicationRequestSchema = untypedCommunicationRequestSchema

export class FhirCommunicationRequest extends FhirDomainResource<CommunicationRequest> {
  // Static Functions

  public static parse(value: unknown): FhirCommunicationRequest {
    const parsed = communicationRequestSchema.parse(value)
    return new FhirCommunicationRequest(
      parsed as unknown as CommunicationRequest,
    )
  }
}
