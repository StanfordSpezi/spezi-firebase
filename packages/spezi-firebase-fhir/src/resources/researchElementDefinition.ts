//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ResearchElementDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedResearchElementDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ResearchElementDefinition').readonly(),
  }).passthrough(),
)

export const researchElementDefinitionSchema = untypedResearchElementDefinitionSchema

export class FhirResearchElementDefinition extends FhirDomainResource<ResearchElementDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirResearchElementDefinition {
    const parsed = researchElementDefinitionSchema.parse(value)
    return new FhirResearchElementDefinition(parsed as unknown as ResearchElementDefinition)
  }
}
