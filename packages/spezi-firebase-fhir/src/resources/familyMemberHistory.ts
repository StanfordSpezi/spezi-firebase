//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type FamilyMemberHistoryCondition,
  type FamilyMemberHistory,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import { familyMemberHistoryStatusSchema } from '../valueSets/index.js'

const familyMemberHistoryConditionSchema: ZodType<FamilyMemberHistoryCondition> =
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    outcome: codeableConceptSchema.optional(),
    contributedToDeath: booleanSchema.optional(),
    _contributedToDeath: elementSchema.optional(),
    onsetAge: quantitySchema.optional(),
    onsetRange: rangeSchema.optional(),
    onsetPeriod: periodSchema.optional(),
    onsetString: stringSchema.optional(),
    _onsetString: elementSchema.optional(),
    note: annotationSchema.array().optional(),
  })

/**
 * Zod schema for FHIR FamilyMemberHistory resource (untyped version).
 */
export const untypedFamilyMemberHistorySchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('FamilyMemberHistory').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: uriSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    status: familyMemberHistoryStatusSchema,
    _status: elementSchema.optional(),
    dataAbsentReason: codeableConceptSchema.optional(),
    patient: referenceSchema,
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    relationship: codeableConceptSchema,
    sex: codeableConceptSchema.optional(),
    bornPeriod: periodSchema.optional(),
    bornDate: dateSchema.optional(),
    _bornDate: elementSchema.optional(),
    bornString: stringSchema.optional(),
    _bornString: elementSchema.optional(),
    ageAge: quantitySchema.optional(),
    ageRange: rangeSchema.optional(),
    ageString: stringSchema.optional(),
    _ageString: elementSchema.optional(),
    estimatedAge: booleanSchema.optional(),
    _estimatedAge: elementSchema.optional(),
    deceasedBoolean: booleanSchema.optional(),
    _deceasedBoolean: elementSchema.optional(),
    deceasedAge: quantitySchema.optional(),
    deceasedRange: rangeSchema.optional(),
    deceasedDate: dateSchema.optional(),
    _deceasedDate: elementSchema.optional(),
    deceasedString: stringSchema.optional(),
    _deceasedString: elementSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    condition: familyMemberHistoryConditionSchema.array().optional(),
  }),
) satisfies ZodType<FamilyMemberHistory>

/**
 * Zod schema for FHIR FamilyMemberHistory resource.
 */
export const familyMemberHistorySchema: ZodType<FamilyMemberHistory> =
  untypedFamilyMemberHistorySchema

/**
 * Wrapper class for FHIR FamilyMemberHistory resources.
 * Provides utility methods for working with family medical history records.
 */
export class FhirFamilyMemberHistory extends FhirDomainResource<FamilyMemberHistory> {
  /**
   * Parses a FamilyMemberHistory resource from unknown data.
   *
   * @param value - The data to parse and validate against the FamilyMemberHistory schema
   * @returns A FhirFamilyMemberHistory instance containing the validated resource
   */
  public static parse(value: unknown): FhirFamilyMemberHistory {
    return new FhirFamilyMemberHistory(familyMemberHistorySchema.parse(value))
  }

  /**
   * Gets the date when the history was recorded.
   *
   * @returns The recorded date if available, undefined otherwise
   */
  public get date(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Gets the family member's birth date.
   *
   * @returns The birth date if available, undefined otherwise
   */
  public get bornDate(): Date | undefined {
    return FhirDomainResource.parseDate(this.value.bornDate)
  }

  /**
   * Gets the relationship display text.
   *
   * @returns The relationship display text
   */
  public get relationshipDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.relationship)
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
