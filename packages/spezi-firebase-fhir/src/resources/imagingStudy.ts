//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type ImagingStudy } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  codingSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  idSchema,
  referenceSchema,
  stringSchema,
  unsignedIntSchema,
} from '../elements/index.js'
import { imagingStudyStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR ImagingStudy resource (untyped version).
 */
export const untypedImagingStudySchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ImagingStudy').readonly(),
    identifier: identifierSchema.array().optional(),
    status: imagingStudyStatusSchema,
    _status: elementSchema.optional(),
    modality: codingSchema.array().optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    started: dateTimeSchema.optional(),
    _started: elementSchema.optional(),
    basedOn: referenceSchema.array().optional(),
    referrer: referenceSchema.optional(),
    interpreter: referenceSchema.array().optional(),
    endpoint: referenceSchema.array().optional(),
    numberOfSeries: unsignedIntSchema.optional(),
    numberOfInstances: unsignedIntSchema.optional(),
    procedureReference: referenceSchema.optional(),
    procedureCode: codeableConceptSchema.array().optional(),
    location: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    series: backboneElementSchema
      .extend({
        uid: idSchema,
        _uid: elementSchema.optional(),
        number: unsignedIntSchema.optional(),
        modality: codingSchema,
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        numberOfInstances: unsignedIntSchema.optional(),
        endpoint: referenceSchema.array().optional(),
        bodySite: codingSchema.optional(),
        laterality: codingSchema.optional(),
        specimen: referenceSchema.array().optional(),
        started: dateTimeSchema.optional(),
        _started: elementSchema.optional(),
        performer: backboneElementSchema
          .extend({
            function: codeableConceptSchema.optional(),
            actor: referenceSchema,
          })
          .array()
          .optional(),
        instance: backboneElementSchema
          .extend({
            uid: idSchema,
            _uid: elementSchema.optional(),
            sopClass: codingSchema,
            number: unsignedIntSchema.optional(),
            title: stringSchema.optional(),
            _title: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<ImagingStudy>

/**
 * Zod schema for FHIR ImagingStudy resource.
 */
export const imagingStudySchema: ZodType<ImagingStudy> =
  untypedImagingStudySchema

/**
 * Wrapper class for FHIR ImagingStudy resources.
 * Provides utility methods for working with imaging studies and their metadata.
 */
export class FhirImagingStudy extends FhirDomainResource<ImagingStudy> {
  // Static Functions

  /**
   * Parses an ImagingStudy resource from unknown data.
   *
   * @param value - The data to parse and validate against the ImagingStudy schema
   * @returns A FhirImagingStudy instance containing the validated resource
   */
  public static parse(value: unknown): FhirImagingStudy {
    return new FhirImagingStudy(imagingStudySchema.parse(value))
  }

  /**
   * Gets the study started date as a JavaScript Date object.
   *
   * @returns The started date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const startedDate = study.startedDate
   * console.log(`Study started: ${startedDate?.toLocaleDateString()}`)
   * ```
   */
  public get startedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.started)
  }

  /**
   * Gets all modalities used in the study.
   *
   * @returns Array of modality display texts
   *
   * @example
   * ```typescript
   * const modalities = study.getModalityDisplays()
   * console.log(`Modalities: ${modalities.join(', ')}`)
   * ```
   */
  public get modalityDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.modality)
  }

  /**
   * Gets the reason code displays for why the study was performed.
   *
   * @returns Array of reason display texts
   *
   * @example
   * ```typescript
   * const reasons = study.getReasonDisplays()
   * console.log(`Study reasons: ${reasons.join(', ')}`)
   * ```
   */
  public get reasonDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.reasonCode)
  }

  /**
   * Gets the note texts as an array of strings.
   *
   * @returns Array of note texts
   *
   * @example
   * ```typescript
   * const notes = study.noteTexts
   * notes.forEach(note => console.log(note))
   * ```
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
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
