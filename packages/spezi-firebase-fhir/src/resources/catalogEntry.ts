//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type CatalogEntry } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedCatalogEntrySchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('CatalogEntry').readonly(),
    })
    .passthrough(),
)

export const catalogEntrySchema = untypedCatalogEntrySchema

export class FhirCatalogEntry extends FhirDomainResource<CatalogEntry> {
  // Static Functions

  public static parse(value: unknown): FhirCatalogEntry {
    const parsed = catalogEntrySchema.parse(value)
    return new FhirCatalogEntry(parsed as unknown as CatalogEntry)
  }
}
