//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { Communication } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedCommunicationSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Communication').readonly(),
    })
    .passthrough(),
)

export const communicationSchema = untypedCommunicationSchema

export class FhirCommunication extends FhirDomainResource<Communication> {
  // Static Functions

  public static parse(value: unknown): FhirCommunication {
    const parsed = communicationSchema.parse(value)
    return new FhirCommunication(parsed as unknown as Communication)
  }
}
