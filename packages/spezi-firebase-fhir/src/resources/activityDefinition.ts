//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { ActivityDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedActivityDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ActivityDefinition').readonly(),
    })
    .passthrough(),
)

export const activityDefinitionSchema = untypedActivityDefinitionSchema

export class FhirActivityDefinition extends FhirDomainResource<ActivityDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirActivityDefinition {
    const parsed = activityDefinitionSchema.parse(value)
    return new FhirActivityDefinition(parsed as unknown as ActivityDefinition)
  }
}
