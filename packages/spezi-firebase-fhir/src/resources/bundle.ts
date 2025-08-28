//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Bundle, type DomainResource } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { fhirResourceSchema } from './fhirResource.js'
import {
  backboneElementSchema,
  decimalSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  resourceSchema,
  signatureSchema,
  stringSchema,
  unsignedIntSchema,
  uriSchema,
} from '../elements/index.js'

const bundleLinkSchema = backboneElementSchema.extend({
  relation: stringSchema,
  _relation: elementSchema.optional(),
  url: uriSchema,
  _url: elementSchema.optional(),
})

const bundleEntrySearchModeSchema = z.enum(['match', 'include', 'outcome'])

const bundleEntryRequestMethodSchema = z.enum([
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
])

const bundleTypeSchema = z.enum([
  'document',
  'message',
  'transaction',
  'transaction-response',
  'batch',
  'batch-response',
  'history',
  'searchset',
  'collection',
])

export function bundleSchema<R extends DomainResource>(
  schema: ZodType<R>,
): ZodType<Bundle<R>> {
  return resourceSchema.extend({
    resourceType: z.literal('Bundle').readonly(),
    identifier: identifierSchema.optional(),
    type: bundleTypeSchema,
    _type: elementSchema.optional(),
    timestamp: instantSchema.optional(),
    _timestamp: elementSchema.optional(),
    total: unsignedIntSchema.optional(),
    link: bundleLinkSchema.array().optional(),
    entry: backboneElementSchema
      .extend({
        link: bundleLinkSchema.array().optional(),
        fullUrl: uriSchema.optional(),
        _fullUrl: elementSchema.optional(),
        resource: schema.optional(),
        search: backboneElementSchema.extend({
          mode: bundleEntrySearchModeSchema.optional(),
          _mode: elementSchema.optional(),
          score: decimalSchema.optional(),
        }),
        request: backboneElementSchema.extend({
          method: bundleEntryRequestMethodSchema,
          _method: elementSchema.optional(),
          url: uriSchema,
          _url: elementSchema.optional(),
          ifNoneExist: stringSchema.optional(),
          _ifNoneExist: elementSchema.optional(),
          ifModifiedSince: instantSchema.optional(),
          _ifModifiedSince: elementSchema.optional(),
          ifMatch: stringSchema.optional(),
          _ifMatch: elementSchema.optional(),
          ifNoneMatch: stringSchema.optional(),
          _ifNoneMatch: elementSchema.optional(),
        }),
        response: backboneElementSchema.extend({
          status: stringSchema,
          _status: elementSchema.optional(),
          location: uriSchema.optional(),
          _location: elementSchema.optional(),
          etag: stringSchema.optional(),
          _etag: elementSchema.optional(),
          lastModified: instantSchema.optional(),
          _lastModified: elementSchema.optional(),
          outcome: fhirResourceSchema.optional(),
        }),
      })
      .array()
      .optional(),
    signature: signatureSchema.optional(),
  }) satisfies ZodType<Bundle<R>>
}

export const genericBundleSchema: ZodType<Bundle> = z.lazy(() =>
  bundleSchema(fhirResourceSchema),
)

export class FhirBundle<R extends DomainResource> extends FhirDomainResource<
  Bundle<R>
> {
  // Static Functions

  public static parseGeneric(value: unknown): FhirBundle<DomainResource> {
    return new FhirBundle(genericBundleSchema.parse(value))
  }

  public static parse<R extends DomainResource>(
    value: unknown,
    schema: ZodType<R>,
  ): FhirBundle<R> {
    return new FhirBundle(bundleSchema(schema).parse(value))
  }
}
