//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CatalogEntry, type CatalogEntryRelatedEntry } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'
import {
  catalogEntryRelationtypeSchema,
  catalogEntryStatusSchema,
} from '../valueSets/index.js'

const catalogEntryRelatedEntrySchema: ZodType<CatalogEntryRelatedEntry> =
  z.lazy(() =>
    backboneElementSchema.extend({
      relationtype: catalogEntryRelationtypeSchema,
      _relationtype: elementSchema.optional(),
      item: referenceSchema,
    }),
  )

export const untypedCatalogEntrySchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CatalogEntry').readonly(),
    identifier: identifierSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    orderable: booleanSchema,
    _orderable: elementSchema.optional(),
    referencedItem: referenceSchema,
    additionalIdentifier: identifierSchema.array().optional(),
    classification: codeableConceptSchema.array().optional(),
    status: catalogEntryStatusSchema.optional(),
    _status: elementSchema.optional(),
    validityPeriod: periodSchema.optional(),
    validTo: dateTimeSchema.optional(),
    _validTo: elementSchema.optional(),
    lastUpdated: dateTimeSchema.optional(),
    _lastUpdated: elementSchema.optional(),
    additionalCharacteristic: codeableConceptSchema.array().optional(),
    additionalClassification: codeableConceptSchema.array().optional(),
    relatedEntry: catalogEntryRelatedEntrySchema.array().optional(),
  }),
) satisfies ZodType<CatalogEntry>

export const catalogEntrySchema: ZodType<CatalogEntry> =
  untypedCatalogEntrySchema

export class FhirCatalogEntry extends FhirDomainResource<CatalogEntry> {
  // Static Functions

  public static parse(value: unknown): FhirCatalogEntry {
    return new FhirCatalogEntry(catalogEntrySchema.parse(value))
  }
}
