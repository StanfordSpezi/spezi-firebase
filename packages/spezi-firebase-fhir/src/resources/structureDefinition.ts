//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type StructureDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedStructureDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('StructureDefinition').readonly(),
  }).passthrough(),
)

export const structureDefinitionSchema = untypedStructureDefinitionSchema

export class FhirStructureDefinition extends FhirDomainResource<StructureDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirStructureDefinition {
    const parsed = structureDefinitionSchema.parse(value)
    return new FhirStructureDefinition(parsed as unknown as StructureDefinition)
  }
}
