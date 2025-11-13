//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type LinkageItem, type Linkage } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  domainResourceSchema,
  elementSchema,
  referenceSchema,
} from '../elements/index.js'
import { linkageItemTypeSchema } from '../valueSets/index.js'

const linkageItemSchema: ZodType<LinkageItem> = backboneElementSchema.extend({
  resource: referenceSchema,
  type: linkageItemTypeSchema,
  _type: elementSchema.optional(),
})

/**
 * Zod schema for FHIR Linkage resource (untyped version).
 */
export const untypedLinkageSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Linkage').readonly(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    author: referenceSchema.optional(),
    item: linkageItemSchema.array(),
  }),
) satisfies ZodType<Linkage>

/**
 * Zod schema for FHIR Linkage resource.
 */
export const linkageSchema: ZodType<Linkage> = untypedLinkageSchema

/**
 * Wrapper class for FHIR Linkage resources.
 * Provides utility methods for working with linkages that connect related resources.
 */
export class FhirLinkage extends FhirDomainResource<Linkage> {
  // Static Functions

  /**
   * Parses a Linkage resource from unknown data.
   *
   * @param value - The data to parse and validate against the Linkage schema
   * @returns A FhirLinkage instance containing the validated resource
   */
  public static parse(value: unknown): FhirLinkage {
    return new FhirLinkage(linkageSchema.parse(value))
  }
}
