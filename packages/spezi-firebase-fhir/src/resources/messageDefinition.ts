//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { MessageDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedMessageDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('MessageDefinition').readonly(),
    })
    .passthrough(),
)

export const messageDefinitionSchema = untypedMessageDefinitionSchema

export class FhirMessageDefinition extends FhirDomainResource<MessageDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirMessageDefinition {
    const parsed = messageDefinitionSchema.parse(value)
    return new FhirMessageDefinition(parsed as unknown as MessageDefinition)
  }
}
