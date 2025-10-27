//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type PlanDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedPlanDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PlanDefinition').readonly(),
  }).passthrough(),
)

export const planDefinitionSchema = untypedPlanDefinitionSchema

export class FhirPlanDefinition extends FhirDomainResource<PlanDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirPlanDefinition {
    const parsed = planDefinitionSchema.parse(value)
    return new FhirPlanDefinition(parsed as unknown as PlanDefinition)
  }
}
