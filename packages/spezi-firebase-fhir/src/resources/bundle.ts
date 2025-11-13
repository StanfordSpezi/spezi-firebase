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
import { FhirDomainResource } from './fhirDomainResource.js'
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

/**
 * Creates a BundleEntry schema for the given resource type.
 *
 * @template R - The type of resource contained in the bundle entry
 * @param schema - The Zod schema for the resource type
 * @returns A Zod schema for BundleEntry containing the specified resource type
 */
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

/**
 * Creates an untyped Bundle schema for the given resource type.
 *
 * @param schema - The Zod schema for the resource type
 * @returns A Zod schema for Bundle containing the specified resource type
 */
export function untypedBundleSchema<R extends DomainResource>(
  schema: ZodType<R>,
) {
  return domainResourceSchema.extend({
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
  }) satisfies ZodType<Bundle<R>>
}

/**
 * Creates a Bundle schema for the given resource type.
 *
 * @param schema - The Zod schema for the resource type
 * @returns A Zod schema for Bundle containing the specified resource type
 */
export function bundleSchema<R extends DomainResource>(
  schema: ZodType<R>,
): ZodType<Bundle<R>> {
  return untypedBundleSchema(schema)
}

/**
 * Zod schema for FHIR Bundle resource (untyped version, generic).
 */
export const untypedGenericBundleSchema = z.lazy(() =>
  untypedBundleSchema(fhirResourceSchema),
)

/**
 * Zod schema for FHIR Bundle resource (generic).
 */
export const genericBundleSchema: ZodType<Bundle> = untypedGenericBundleSchema

/**
 * Wrapper class for FHIR Bundle resources.
 * Provides utility methods for working with bundles and their entries.
 *
 * @template R - The type of resources contained in the bundle
 */
export class FhirBundle<R extends DomainResource> extends FhirDomainResource<
  Bundle<R>
> {
  // Static Functions

  /**
   * Parses a generic FHIR Bundle from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirBundle instance containing any DomainResource
   */
  public static parseGeneric(value: unknown): FhirBundle<DomainResource> {
    return new FhirBundle(genericBundleSchema.parse(value))
  }

  /**
   * Parses a typed FHIR Bundle from unknown data.
   *
   * @template R - The type of resources in the bundle
   * @param value - The data to parse
   * @param schema - Zod schema for validating the resource type
   * @returns A FhirBundle instance containing resources of type R
   */
  public static parse<R extends DomainResource>(
    value: unknown,
    schema: ZodType<R>,
  ): FhirBundle<R> {
    return new FhirBundle(bundleSchema(schema).parse(value))
  }

  // Functions

  /**
   * Finds all resources in the bundle with a specific resource type.
   *
   * @template T - The specific resource type to find
   * @param resourceType - The FHIR resource type name (e.g., 'Patient', 'Observation')
   * @param predicate - Optional filter function to apply to resources
   * @returns Array of resources matching the specified type
   *
   * @example
   * ```typescript
   * const patients = bundle.findResources<Patient>('Patient')
   * const observations = bundle.findResources<Observation>('Observation')
   * ```
   */
  public findResources<T extends R>(
    resourceType: T['resourceType'],
    predicate?: (resource: T) => boolean,
  ): T[] {
    return (this.value.entry ?? [])
      .filter(
        (entry) =>
          entry.resource?.resourceType === resourceType &&
          (predicate ? predicate(entry.resource as T) : true),
      )
      .map((entry) => entry.resource as T)
  }

  /**
   * Finds a resource by its ID.
   *
   * @template T - The specific resource type to find
   * @param resourceType - The FHIR resource type name
   * @param id - The resource ID to find
   * @returns The resource with matching ID or undefined
   *
   * @example
   * ```typescript
   * const patient = bundle.findResourceById('patient-123')
   * ```
   */
  public resourceById<T extends R>(
    resourceType: T['resourceType'],
    id: string,
  ): R | undefined {
    return this.findResources(resourceType, (r) => r.id === id).at(0)
  }

  /**
   * Finds a resource by reference string.
   *
   * @param reference - Reference string (e.g., "Patient/123")
   * @returns The resource matching the reference or undefined
   *
   * @example
   * ```typescript
   * const patient = bundle.findResourceByReference('Patient/patient-123')
   * ```
   */
  public findResourceByReference(reference: string): R | undefined {
    const [resourceType, id] = reference.split('/')
    if (!resourceType || !id) return undefined
    return this.resourceById(resourceType, id)
  }
}
