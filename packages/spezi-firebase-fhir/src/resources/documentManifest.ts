//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type DocumentManifest,
  type DocumentManifestRelated,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import { documentManifestStatusSchema } from '../valueSets/index.js'

const documentManifestRelatedSchema: ZodType<DocumentManifestRelated> =
  backboneElementSchema.extend({
    identifier: identifierSchema.optional(),
    ref: referenceSchema.optional(),
  })

/**
 * Zod schema for FHIR DocumentManifest resource (untyped version).
 */
export const untypedDocumentManifestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DocumentManifest').readonly(),
    masterIdentifier: identifierSchema.optional(),
    identifier: identifierSchema.array().optional(),
    status: documentManifestStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    created: dateTimeSchema.optional(),
    _created: elementSchema.optional(),
    author: referenceSchema.array().optional(),
    recipient: referenceSchema.array().optional(),
    source: uriSchema.optional(),
    _source: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    content: referenceSchema.array(),
    related: documentManifestRelatedSchema.array().optional(),
  }),
) satisfies ZodType<DocumentManifest>

/**
 * Zod schema for FHIR DocumentManifest resource.
 */
export const documentManifestSchema: ZodType<DocumentManifest> =
  untypedDocumentManifestSchema

/**
 * Wrapper class for FHIR DocumentManifest resources.
 * Provides utility methods for working with document manifests and collections.
 */
export class FhirDocumentManifest extends FhirDomainResource<DocumentManifest> {
  // Static Functions

  /**
   * Parses a DocumentManifest resource from unknown data.
   *
   * @param value - The data to parse and validate against the DocumentManifest schema
   * @returns A FhirDocumentManifest instance containing the validated resource
   */
  public static parse(value: unknown): FhirDocumentManifest {
    return new FhirDocumentManifest(documentManifestSchema.parse(value))
  }

  /**
   * Gets all identifier values that match any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns Array of identifier values matching the specified systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value that matches any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values that match any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns Array of identifier values matching the specified types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value that matches any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
