//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type RelatedPersonCommunication,
  type Coding,
  type RelatedPerson,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  addressSchema,
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactPointSchema,
  dateSchema,
  domainResourceSchema,
  elementSchema,
  humanNameSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'
import { administrativeGenderSchema } from '../valueSets/index.js'

const relatedPersonCommunicationSchema: ZodType<RelatedPersonCommunication> =
  backboneElementSchema.extend({
    language: codeableConceptSchema,
    preferred: booleanSchema.optional(),
    _preferred: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR RelatedPerson resource (untyped version).
 */
export const untypedRelatedPersonSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('RelatedPerson').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    patient: referenceSchema,
    relationship: codeableConceptSchema.array().optional(),
    name: humanNameSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    gender: administrativeGenderSchema.optional(),
    _gender: elementSchema.optional(),
    birthDate: dateSchema.optional(),
    _birthDate: elementSchema.optional(),
    address: addressSchema.array().optional(),
    photo: attachmentSchema.array().optional(),
    period: periodSchema.optional(),
    communication: relatedPersonCommunicationSchema.array().optional(),
  }),
) satisfies ZodType<RelatedPerson>

/**
 * Zod schema for FHIR RelatedPerson resource.
 */
export const relatedPersonSchema: ZodType<RelatedPerson> =
  untypedRelatedPersonSchema

/**
 * Wrapper class for FHIR RelatedPerson resources.
 * Provides utility methods for working with related person demographics.
 */
export class FhirRelatedPerson extends FhirDomainResource<RelatedPerson> {
  /**
   * Parses a RelatedPerson resource from unknown data.
   *
   * @param value - The data to parse and validate against the RelatedPerson schema
   * @returns A FhirRelatedPerson instance containing the validated resource
   */
  public static parse(value: unknown): FhirRelatedPerson {
    return new FhirRelatedPerson(relatedPersonSchema.parse(value))
  }

  /**
   * Gets the birth date of the related person as a JavaScript Date object.
   *
   * @returns The birth date if available
   */
  public get birthDate(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.birthDate)
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
