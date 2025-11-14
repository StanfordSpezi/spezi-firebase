//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type AllergyIntoleranceReaction,
  type AllergyIntolerance,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  allergyIntoleranceCategorySchema,
  allergyIntoleranceCriticalitySchema,
  allergyIntoleranceReactionSeveritySchema,
  allergyIntoleranceTypeSchema,
} from '../valueSets/index.js'

const allergyIntoleranceReactionSchema: ZodType<AllergyIntoleranceReaction> =
  backboneElementSchema.extend({
    substance: codeableConceptSchema.optional(),
    manifestation: codeableConceptSchema.array().min(1),
    onset: dateTimeSchema.optional(),
    _onset: elementSchema.optional(),
    severity: allergyIntoleranceReactionSeveritySchema.optional(),
    _severity: elementSchema.optional(),
    exposureRoute: codeableConceptSchema.optional(),
    note: annotationSchema.array().optional(),
  })

/**
 * Zod schema for FHIR AllergyIntolerance resource (untyped version).
 */
export const untypedAllergyIntoleranceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('AllergyIntolerance').readonly(),
    identifier: identifierSchema.array().optional(),
    clinicalStatus: codeableConceptSchema.optional(),
    verificationStatus: codeableConceptSchema.optional(),
    type: allergyIntoleranceTypeSchema,
    _type: elementSchema.optional(),
    category: allergyIntoleranceCategorySchema.array().optional(),
    _category: elementSchema.array().optional(),
    criticality: allergyIntoleranceCriticalitySchema.optional(),
    code: codeableConceptSchema.optional(),
    patient: referenceSchema,
    encounter: referenceSchema.optional(),
    onsetDateTime: dateTimeSchema.optional(),
    _onsetDateTime: elementSchema.optional(),
    onsetAge: quantitySchema.optional(),
    onsetPeriod: periodSchema.optional(),
    onsetRange: rangeSchema.optional(),
    onsetString: stringSchema.optional(),
    _onsetString: elementSchema.optional(),
    recordedDate: dateTimeSchema.optional(),
    _recordedDate: elementSchema.optional(),
    recorder: referenceSchema.optional(),
    asserter: referenceSchema.optional(),
    lastOccurrence: dateTimeSchema.optional(),
    _lastOccurrence: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    reaction: allergyIntoleranceReactionSchema.array().optional(),
  }),
) satisfies ZodType<AllergyIntolerance>

/**
 * Zod schema for FHIR AllergyIntolerance resource.
 */
export const allergyIntoleranceSchema: ZodType<AllergyIntolerance> =
  untypedAllergyIntoleranceSchema

/**
 * Wrapper class for FHIR AllergyIntolerance resources.
 * Provides utility methods for working with allergy information.
 */
export class FhirAllergyIntolerance extends FhirDomainResource<AllergyIntolerance> {
  // Static Functions

  /**
   * Parses an AllergyIntolerance resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirAllergyIntolerance instance
   */
  public static parse(value: unknown): FhirAllergyIntolerance {
    return new FhirAllergyIntolerance(allergyIntoleranceSchema.parse(value))
  }

  // Properties

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

  /**
   * Gets the onset date as a JavaScript Date object (from onsetDateTime).
   *
   * @returns The onset date if available
   */
  public get onsetDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.onsetDateTime)
  }

  /**
   * Gets the recorded date as a JavaScript Date object.
   *
   * @returns The recorded date if available
   */
  public get recordedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.recordedDate)
  }

  /**
   * Gets the last occurrence date as a JavaScript Date object.
   *
   * @returns The last occurrence date if available
   */
  public get lastOccurrenceDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.lastOccurrence)
  }

  /**
   * Gets the allergy/intolerance code display text.
   *
   * @returns The code display text
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Gets the clinical status display text.
   *
   * @returns The clinical status display
   */
  public get clinicalStatusDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.clinicalStatus)
  }

  /**
   * Gets the verification status display text.
   *
   * @returns The verification status display
   */
  public get verificationStatusDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(
      this.value.verificationStatus,
    )
  }

  /**
   * Checks if the allergy is currently active.
   *
   * @returns true if clinical status is active
   */
  public get isActive(): boolean {
    return FhirDomainResource.containsCoding(this.value.clinicalStatus, {
      system:
        'http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical',
      code: 'active',
    })
  }

  /**
   * Checks if the allergy is confirmed.
   *
   * @returns true if verification status is confirmed
   */
  public get isConfirmed(): boolean {
    return FhirDomainResource.containsCoding(this.value.verificationStatus, {
      system:
        'http://terminology.hl7.org/CodeSystem/allergyintolerance-verification',
      code: 'confirmed',
    })
  }

  /**
   * Gets all reaction manifestations.
   *
   * @returns Array of manifestation display texts
   */
  public get manifestationDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(
      this.value.reaction?.flatMap((reaction) => reaction.manifestation),
    )
  }

  /**
   * Gets all note texts.
   *
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }
}
