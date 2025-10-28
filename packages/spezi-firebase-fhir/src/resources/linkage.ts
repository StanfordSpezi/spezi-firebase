//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Linkage } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  domainResourceSchema,
  elementSchema,
  referenceSchema,
} from '../elements/index.js'
import { linkageItemTypeSchema } from '../valueSets/index.js'

export const untypedLinkageSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Linkage').readonly(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    author: referenceSchema.optional(),
    item: backboneElementSchema
      .extend({
        resource: referenceSchema,
        type: linkageItemTypeSchema,
        _type: elementSchema.optional(),
      })
      .array(),
  }),
) satisfies ZodType<Linkage>

export const linkageSchema: ZodType<Linkage> = untypedLinkageSchema

export class FhirLinkage extends FhirDomainResource<Linkage> {
  // Static Functions

  public static parse(value: unknown): FhirLinkage {
    return new FhirLinkage(linkageSchema.parse(value))
  }
}
