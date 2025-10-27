//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type PackagedProductDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedPackagedProductDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PackagedProductDefinition').readonly(),
  }).passthrough(),
)

export const packagedProductDefinitionSchema = untypedPackagedProductDefinitionSchema

export class FhirPackagedProductDefinition extends FhirDomainResource<PackagedProductDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirPackagedProductDefinition {
    const parsed = packagedProductDefinitionSchema.parse(value)
    return new FhirPackagedProductDefinition(parsed as unknown as PackagedProductDefinition)
  }
}
