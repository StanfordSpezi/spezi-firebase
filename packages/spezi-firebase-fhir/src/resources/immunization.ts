//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type Immunization } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  positiveIntSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import { immunizationStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR Immunization resource (untyped version).
 */
export const untypedImmunizationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Immunization').readonly(),
    identifier: identifierSchema.array().optional(),
    status: immunizationStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    vaccineCode: codeableConceptSchema,
    patient: referenceSchema,
    encounter: referenceSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrenceString: stringSchema.optional(),
    _occurrenceString: elementSchema.optional(),
    recorded: dateTimeSchema.optional(),
    _recorded: elementSchema.optional(),
    primarySource: booleanSchema.optional(),
    _primarySource: elementSchema.optional(),
    reportOrigin: codeableConceptSchema.optional(),
    location: referenceSchema.optional(),
    manufacturer: referenceSchema.optional(),
    lotNumber: stringSchema.optional(),
    _lotNumber: elementSchema.optional(),
    expirationDate: dateTimeSchema.optional(),
    _expirationDate: elementSchema.optional(),
    site: codeableConceptSchema.optional(),
    route: codeableConceptSchema.optional(),
    doseQuantity: quantitySchema.optional(),
    performer: backboneElementSchema
      .extend({
        function: codeableConceptSchema.optional(),
        actor: referenceSchema,
      })
      .array()
      .optional(),
    note: annotationSchema.array().optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    isSubpotent: booleanSchema.optional(),
    _isSubpotent: elementSchema.optional(),
    subpotentReason: codeableConceptSchema.array().optional(),
    education: backboneElementSchema
      .extend({
        documentType: stringSchema.optional(),
        _documentType: elementSchema.optional(),
        reference: uriSchema.optional(),
        _reference: elementSchema.optional(),
        publicationDate: dateTimeSchema.optional(),
        _publicationDate: elementSchema.optional(),
        presentationDate: dateTimeSchema.optional(),
        _presentationDate: elementSchema.optional(),
      })
      .array()
      .optional(),
    programEligibility: codeableConceptSchema.array().optional(),
    fundingSource: codeableConceptSchema.optional(),
    reaction: backboneElementSchema
      .extend({
        date: dateTimeSchema.optional(),
        _date: elementSchema.optional(),
        detail: referenceSchema.optional(),
        reported: booleanSchema.optional(),
        _reported: elementSchema.optional(),
      })
      .array()
      .optional(),
    protocolApplied: backboneElementSchema
      .extend({
        series: stringSchema.optional(),
        _series: elementSchema.optional(),
        authority: referenceSchema.optional(),
        targetDisease: codeableConceptSchema.array().optional(),
        doseNumberPositiveInt: positiveIntSchema.optional(),
        doseNumberString: stringSchema.optional(),
        _doseNumberString: elementSchema.optional(),
        seriesDosesPositiveInt: positiveIntSchema.optional(),
        seriesDosesString: stringSchema.optional(),
        _seriesDosesString: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Immunization>

/**
 * Zod schema for FHIR Immunization resource.
 */
export const immunizationSchema: ZodType<Immunization> =
  untypedImmunizationSchema

/**
 * Wrapper class for FHIR Immunization resources.
 * Provides utility methods for working with immunizations.
 */
export class FhirImmunization extends FhirDomainResource<Immunization> {
  // Static Functions

  /**
   * Parses an Immunization resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirImmunization instance
   */
  public static parse(value: unknown): FhirImmunization {
    return new FhirImmunization(immunizationSchema.parse(value))
  }

  // Properties

  /**
   * Gets the occurrence date as a JavaScript Date object.
   *
   * @returns The occurrence date if available
   */
  public get occurrenceDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.occurrenceDateTime)
  }

  /**
   * Gets the recorded date as a JavaScript Date object.
   *
   * @returns The recorded date if available
   */
  public get recordedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.recorded)
  }

  /**
   * Gets the expiration date as a JavaScript Date object.
   *
   * @returns The expiration date if available
   */
  public get expirationDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.expirationDate)
  }

  /**
   * Gets the vaccine code display text.
   *
   * @returns The vaccine code display
   */
  public get vaccineDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.vaccineCode)
  }

  /**
   * Gets the site display text (anatomical location).
   *
   * @returns The site display
   */
  public get siteDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.site)
  }

  /**
   * Gets the route display text (how administered).
   *
   * @returns The route display
   */
  public get routeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.route)
  }

  /**
   * Checks if the vaccine is expired based on expiration date.
   *
   * @param asOfDate - Date to check against (defaults to now)
   * @returns true if expired
   */
  public isExpired(asOfDate: Date = new Date()): boolean {
    const expDate = this.expirationDate
    if (!expDate) return false
    return asOfDate > expDate
  }

  /**
   * Gets note texts from the immunization.
   *
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
  }

  /**
   * Gets all reaction displays.
   *
   * @returns Array of reaction display texts
   */
  public get reactionDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(
      this.value.reaction?.flatMap((reaction) =>
        reaction.detail ? [reaction.detail] : [],
      ),
    )
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
