//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type DocumentReference,
  type DocumentReferenceContent,
  type DocumentReferenceContext,
  type DocumentReferenceRelatesTo,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  attachmentSchema,
  backboneElementSchema,
  codeableConceptSchema,
  codingSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  documentReferenceDocStatusSchema,
  documentReferenceRelatesToCodeSchema,
  documentReferenceStatusSchema,
} from '../valueSets/index.js'

const documentReferenceRelatesToSchema: ZodType<DocumentReferenceRelatesTo> =
  backboneElementSchema.extend({
    code: documentReferenceRelatesToCodeSchema,
    _code: elementSchema.optional(),
    target: referenceSchema,
  })

const documentReferenceContentSchema: ZodType<DocumentReferenceContent> =
  backboneElementSchema.extend({
    attachment: attachmentSchema,
    format: codingSchema.optional(),
  })

const documentReferenceContextSchema: ZodType<DocumentReferenceContext> =
  backboneElementSchema.extend({
    encounter: referenceSchema.array().optional(),
    event: codeableConceptSchema.array().optional(),
    period: periodSchema.optional(),
    facilityType: codeableConceptSchema.optional(),
    practiceSetting: codeableConceptSchema.optional(),
    sourcePatientInfo: referenceSchema.optional(),
    related: referenceSchema.array().optional(),
  })

/**
 * Zod schema for FHIR DocumentReference resource (untyped version).
 */
export const untypedDocumentReferenceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DocumentReference').readonly(),
    masterIdentifier: identifierSchema.optional(),
    identifier: identifierSchema.array().optional(),
    status: documentReferenceStatusSchema,
    _status: elementSchema.optional(),
    docStatus: documentReferenceDocStatusSchema.optional(),
    _docStatus: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    subject: referenceSchema.optional(),
    date: instantSchema.optional(),
    _date: elementSchema.optional(),
    author: referenceSchema.array().optional(),
    authenticator: referenceSchema.optional(),
    custodian: referenceSchema.optional(),
    relatesTo: documentReferenceRelatesToSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    securityLabel: codeableConceptSchema.array().optional(),
    content: documentReferenceContentSchema.array(),
    context: documentReferenceContextSchema.optional(),
  }),
) satisfies ZodType<DocumentReference>

/**
 * Zod schema for FHIR DocumentReference resource.
 */
export const documentReferenceSchema: ZodType<DocumentReference> =
  untypedDocumentReferenceSchema

/**
 * Wrapper class for FHIR DocumentReference resources.
 * Provides utility methods for working with document references.
 */
export class FhirDocumentReference extends FhirDomainResource<DocumentReference> {
  // Static Functions

  /**
   * Parses a DocumentReference resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirDocumentReference instance
   */
  public static parse(value: unknown): FhirDocumentReference {
    return new FhirDocumentReference(documentReferenceSchema.parse(value))
  }

  // Properties

  /**
   * Gets the date as a JavaScript Date object.
   *
   * @returns The date if available
   */
  public get date(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Gets the type display text.
   *
   * @returns The type display
   */
  public get typeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.type)
  }

  /**
   * Gets all category displays.
   *
   * @returns Array of category display texts
   */
  public get categoryDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.category)
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
   * @returns Array of identifier values matching any provided type
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
