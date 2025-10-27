//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type AdministrableProductDefinition } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedAdministrableProductDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('AdministrableProductDefinition').readonly(),
    })
    .passthrough(),
)

export const administrableProductDefinitionSchema =
  untypedAdministrableProductDefinitionSchema

export class FhirAdministrableProductDefinition extends FhirDomainResource<AdministrableProductDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirAdministrableProductDefinition {
    const parsed = administrableProductDefinitionSchema.parse(value)
    return new FhirAdministrableProductDefinition(
      parsed as unknown as AdministrableProductDefinition,
    )
  }
}
