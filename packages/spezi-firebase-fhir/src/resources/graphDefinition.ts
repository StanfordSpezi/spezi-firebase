//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type GraphDefinition } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedGraphDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('GraphDefinition').readonly(),
    })
    .passthrough(),
)

export const graphDefinitionSchema = untypedGraphDefinitionSchema

export class FhirGraphDefinition extends FhirDomainResource<GraphDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirGraphDefinition {
    const parsed = graphDefinitionSchema.parse(value)
    return new FhirGraphDefinition(parsed as unknown as GraphDefinition)
  }
}
