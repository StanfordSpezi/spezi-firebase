//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type CompartmentDefinition } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedCompartmentDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('CompartmentDefinition').readonly(),
    })
    .passthrough(),
)

export const compartmentDefinitionSchema = untypedCompartmentDefinitionSchema

export class FhirCompartmentDefinition extends FhirDomainResource<CompartmentDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirCompartmentDefinition {
    const parsed = compartmentDefinitionSchema.parse(value)
    return new FhirCompartmentDefinition(
      parsed as unknown as CompartmentDefinition,
    )
  }
}
