//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { ManufacturedItemDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedManufacturedItemDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ManufacturedItemDefinition').readonly(),
    })
    .passthrough(),
)

export const manufacturedItemDefinitionSchema =
  untypedManufacturedItemDefinitionSchema

export class FhirManufacturedItemDefinition extends FhirDomainResource<ManufacturedItemDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirManufacturedItemDefinition {
    const parsed = manufacturedItemDefinitionSchema.parse(value)
    return new FhirManufacturedItemDefinition(
      parsed as unknown as ManufacturedItemDefinition,
    )
  }
}
