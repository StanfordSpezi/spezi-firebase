//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { NamingSystem } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedNamingSystemSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('NamingSystem').readonly(),
    })
    .passthrough(),
)

export const namingSystemSchema = untypedNamingSystemSchema

export class FhirNamingSystem extends FhirDomainResource<NamingSystem> {
  // Static Functions

  public static parse(value: unknown): FhirNamingSystem {
    const parsed = namingSystemSchema.parse(value)
    return new FhirNamingSystem(parsed as unknown as NamingSystem)
  }
}
