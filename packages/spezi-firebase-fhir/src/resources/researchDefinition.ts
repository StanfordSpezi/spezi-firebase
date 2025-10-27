//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type ResearchDefinition } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedResearchDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ResearchDefinition').readonly(),
    })
    .passthrough(),
)

export const researchDefinitionSchema = untypedResearchDefinitionSchema

export class FhirResearchDefinition extends FhirDomainResource<ResearchDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirResearchDefinition {
    const parsed = researchDefinitionSchema.parse(value)
    return new FhirResearchDefinition(parsed as unknown as ResearchDefinition)
  }
}
