//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type EventDefinition } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedEventDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('EventDefinition').readonly(),
    })
    .passthrough(),
)

export const eventDefinitionSchema = untypedEventDefinitionSchema

export class FhirEventDefinition extends FhirDomainResource<EventDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirEventDefinition {
    const parsed = eventDefinitionSchema.parse(value)
    return new FhirEventDefinition(parsed as unknown as EventDefinition)
  }
}
