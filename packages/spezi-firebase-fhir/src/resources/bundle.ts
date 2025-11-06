//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type BundleEntry,
  type BundleEntryRequest,
  type BundleEntryResponse,
  type BundleEntrySearch,
  type BundleLink,
  type Bundle,
  type DomainResource,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { fhirResourceSchema } from './fhirResource.js'
import {
  backboneElementSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  signatureSchema,
  stringSchema,
  unsignedIntSchema,
  uriSchema,
} from '../elements/index.js'
import {
  bundleTypeSchema,
  bundleEntrySearchModeSchema,
  bundleEntryRequestMethodSchema,
} from '../valueSets/index.js'

const bundleLinkSchema: ZodType<BundleLink> = backboneElementSchema.extend({
  relation: stringSchema,
  _relation: elementSchema.optional(),
  url: uriSchema,
  _url: elementSchema.optional(),
})

const bundleEntrySearchSchema: ZodType<BundleEntrySearch> =
  backboneElementSchema.extend({
    mode: bundleEntrySearchModeSchema.optional(),
    _mode: elementSchema.optional(),
    score: decimalSchema.optional(),
  })

const bundleEntryRequestSchema: ZodType<BundleEntryRequest> =
  backboneElementSchema.extend({
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
  })

const bundleEntryResponseSchema: ZodType<BundleEntryResponse> =
  backboneElementSchema.extend({
    status: stringSchema,
    _status: elementSchema.optional(),
    location: uriSchema.optional(),
    _location: elementSchema.optional(),
    etag: stringSchema.optional(),
    _etag: elementSchema.optional(),
    lastModified: instantSchema.optional(),
    _lastModified: elementSchema.optional(),
    get outcome() {
      return fhirResourceSchema.optional()
    },
  })

function bundleEntrySchema<R extends DomainResource>(
  schema: ZodType<R>,
): ZodType<BundleEntry<R>> {
  return backboneElementSchema.extend({
    link: bundleLinkSchema.array().optional(),
    fullUrl: uriSchema.optional(),
    _fullUrl: elementSchema.optional(),
    resource: schema.optional(),
    search: bundleEntrySearchSchema.optional(),
    request: bundleEntryRequestSchema.optional(),
    response: bundleEntryResponseSchema.optional(),
  })
}

export function untypedBundleSchema<R extends DomainResource>(
  schema: ZodType<R>,
) {
  return z.lazy(() =>
    domainResourceSchema.extend({
      resourceType: z.literal('Bundle').readonly(),
      identifier: identifierSchema.optional(),
      type: bundleTypeSchema,
      _type: elementSchema.optional(),
      timestamp: instantSchema.optional(),
      _timestamp: elementSchema.optional(),
      total: unsignedIntSchema.optional(),
      link: bundleLinkSchema.array().optional(),
      get entry() {
        return bundleEntrySchema(schema).array().optional()
      },
      signature: signatureSchema.optional(),
    }),
  ) satisfies ZodType<Bundle<R>>
}

export function bundleSchema<R extends DomainResource>(
  schema: ZodType<R>,
): ZodType<Bundle<R>> {
  return untypedBundleSchema(schema)
}

export const untypedGenericBundleSchema = untypedBundleSchema(
  z.lazy(() => fhirResourceSchema),
)

export const genericBundleSchema = bundleSchema(
  z.lazy(() => fhirResourceSchema),
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

  // Functions

  public findResources<T extends R>(resourceType: T['resourceType']): T[] {
    return (this.value.entry ?? [])
      .filter((entry) => entry.resource?.resourceType === resourceType)
      .map((entry) => entry.resource as T)
  }
}
