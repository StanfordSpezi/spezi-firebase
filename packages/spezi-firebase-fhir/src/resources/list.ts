//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ListEntry, type Coding, type List } from 'fhir/r4b.js'
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
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { listStatusSchema, listModeSchema } from '../valueSets/index.js'

const listEntrySchema: ZodType<ListEntry> = backboneElementSchema.extend({
  flag: codeableConceptSchema.optional(),
  deleted: booleanSchema.optional(),
  _deleted: elementSchema.optional(),
  date: dateTimeSchema.optional(),
  _date: elementSchema.optional(),
  item: referenceSchema,
})

/**
 * Zod schema for FHIR List resource (untyped version).
 */
export const untypedListSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('List').readonly(),
    identifier: identifierSchema.array().optional(),
    status: listStatusSchema.readonly(),
    _status: elementSchema.optional(),
    mode: listModeSchema.readonly(),
    _mode: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    source: referenceSchema.optional(),
    orderedBy: codeableConceptSchema.optional(),
    note: annotationSchema.array().optional(),
    entry: listEntrySchema.array().optional(),
    emptyReason: codeableConceptSchema.optional(),
  }),
) satisfies ZodType<List>

/**
 * Zod schema for FHIR List resource.
 */
export const listSchema: ZodType<List> = untypedListSchema

/**
 * Wrapper class for FHIR List resources.
 */
export class FhirList extends FhirDomainResource<List> {
  /**
   * Parses a List resource from unknown data.
   *
   * @param value - The data to parse and validate against the List schema
   * @returns A FhirList instance containing the validated resource
   */
  public static parse(value: unknown): FhirList {
    return new FhirList(listSchema.parse(value))
  }

  /**
   * Gets the date/time the list was prepared as a JavaScript Date object.
   *
   * @returns The preparation date if available
   */
  public get date(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Gets note texts from the list.
   *
   * @returns Array of note text strings
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
