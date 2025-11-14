//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type Media } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  attachmentSchema,
  codeableConceptSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  intSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { mediaStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR Media resource (untyped version).
 */
export const untypedMediaSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Media').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: mediaStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    modality: codeableConceptSchema.optional(),
    view: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    createdDateTime: dateTimeSchema.optional(),
    _createdDateTime: elementSchema.optional(),
    createdPeriod: periodSchema.optional(),
    issued: instantSchema.optional(),
    _issued: elementSchema.optional(),
    operator: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    bodySite: codeableConceptSchema.optional(),
    deviceName: stringSchema.optional(),
    _deviceName: elementSchema.optional(),
    device: referenceSchema.optional(),
    height: intSchema.optional(),
    width: intSchema.optional(),
    frames: intSchema.optional(),
    duration: decimalSchema.optional(),
    content: attachmentSchema,
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<Media>

/**
 * Zod schema for FHIR Media resource.
 */
export const mediaSchema: ZodType<Media> = untypedMediaSchema

/**
 * Wrapper class for FHIR Media resources.
 * Provides utility methods for working with media attachments and their metadata.
 */
export class FhirMedia extends FhirDomainResource<Media> {
  /**
   * Parses a Media resource from unknown data.
   *
   * @param value - The data to parse and validate against the Media schema
   * @returns A FhirMedia instance containing the validated resource
   */
  public static parse(value: unknown): FhirMedia {
    return new FhirMedia(mediaSchema.parse(value))
  }

  /**
   * Gets the creation date/time of the media as a JavaScript Date object.
   *
   * @returns The creation date if available
   */
  public get createdDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.createdDateTime)
  }

  /**
   * Gets the issued date/time of the media as a JavaScript Date object.
   *
   * @returns The issued date if available
   */
  public get issuedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.issued)
  }

  /**
   * Gets the media type as display text.
   *
   * @returns The type display text, if available
   */
  public get typeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.type)
  }

  /**
   * Get the modality of the media as display text.
   *
   * @returns The modality display text, or undefined if not set
   */
  public get modalityDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.modality)
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
