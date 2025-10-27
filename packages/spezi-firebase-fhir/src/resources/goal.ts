//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type Goal } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedGoalSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Goal').readonly(),
    })
    .passthrough(),
)

export const goalSchema = untypedGoalSchema

export class FhirGoal extends FhirDomainResource<Goal> {
  // Static Functions

  public static parse(value: unknown): FhirGoal {
    const parsed = goalSchema.parse(value)
    return new FhirGoal(parsed as unknown as Goal)
  }
}
