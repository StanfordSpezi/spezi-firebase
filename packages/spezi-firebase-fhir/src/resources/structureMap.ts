//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type StructureMap } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedStructureMapSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('StructureMap').readonly(),
    })
    .passthrough(),
)

export const structureMapSchema = untypedStructureMapSchema

export class FhirStructureMap extends FhirDomainResource<StructureMap> {
  // Static Functions

  public static parse(value: unknown): FhirStructureMap {
    const parsed = structureMapSchema.parse(value)
    return new FhirStructureMap(parsed as unknown as StructureMap)
  }
}
