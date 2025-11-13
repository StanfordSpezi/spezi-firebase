//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type CatalogEntry,
  type CatalogEntryRelatedEntry,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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
  backboneElementSchema.extend({
    relationtype: catalogEntryRelationtypeSchema,
    _relationtype: elementSchema.optional(),
    item: referenceSchema,
  })

/**
 * Zod schema for FHIR CatalogEntry resource (untyped version).
 */
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

/**
 * Zod schema for FHIR CatalogEntry resource.
 */
export const catalogEntrySchema: ZodType<CatalogEntry> =
  untypedCatalogEntrySchema

/**
 * Wrapper class for FHIR CatalogEntry resources.
 * Provides utility methods for working with catalog entries.
 */
export class FhirCatalogEntry extends FhirDomainResource<CatalogEntry> {
  // Static Functions

  /**
   * Parses a CatalogEntry resource from unknown data.
   *
   * @param value - The data to parse and validate against the CatalogEntry schema
   * @returns A FhirCatalogEntry instance containing the validated resource
   */
  public static parse(value: unknown): FhirCatalogEntry {
    return new FhirCatalogEntry(catalogEntrySchema.parse(value))
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns Array of identifier values matching any provided system
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns Array of identifier values matching any provided Coding
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
