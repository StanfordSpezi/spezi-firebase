//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ValueSetComposeIncludeConceptDesignation,
  type ValueSet,
  type ValueSetExpansionContains,
  type Coding,
  type ValueSetCompose,
  type ValueSetExpansion,
  type ValueSetExpansionParameter,
  type ValueSetComposeInclude,
  type ValueSetComposeIncludeConcept,
  type ValueSetComposeIncludeFilter,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  contactDetailSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  filterOperatorSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const valueSetComposeIncludeConceptDesignationSchema: ZodType<ValueSetComposeIncludeConceptDesignation> =
  backboneElementSchema.extend({
    language: stringSchema.optional(),
    _language: elementSchema.optional(),
    use: codingSchema.optional(),
    value: stringSchema,
    _value: elementSchema.optional(),
  })

const valueSetExpansionContainsSchema: ZodType<ValueSetExpansionContains> =
  backboneElementSchema.extend({
    system: urlSchema.optional(),
    _system: elementSchema.optional(),
    abstract: booleanSchema.optional(),
    _abstract: elementSchema.optional(),
    inactive: booleanSchema.optional(),
    _inactive: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    code: stringSchema.optional(),
    _code: elementSchema.optional(),
    display: stringSchema.optional(),
    _display: elementSchema.optional(),
    designation: valueSetComposeIncludeConceptDesignationSchema
      .array()
      .optional(),
    get contains() {
      return valueSetExpansionContainsSchema.array().optional()
    },
  })

const valueSetComposeIncludeConceptSchema: ZodType<ValueSetComposeIncludeConcept> =
  backboneElementSchema.extend({
    code: stringSchema,
    _code: elementSchema.optional(),
    display: stringSchema.optional(),
    _display: elementSchema.optional(),
    designation: valueSetComposeIncludeConceptDesignationSchema
      .array()
      .optional(),
  })

const valueSetComposeIncludeFilterSchema: ZodType<ValueSetComposeIncludeFilter> =
  backboneElementSchema.extend({
    property: stringSchema,
    _property: elementSchema.optional(),
    op: filterOperatorSchema,
    _op: elementSchema.optional(),
    value: stringSchema,
    _value: elementSchema.optional(),
  })

const valueSetComposeIncludeSchema: ZodType<ValueSetComposeInclude> =
  backboneElementSchema.extend({
    system: urlSchema.optional(),
    _system: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    concept: valueSetComposeIncludeConceptSchema.array().optional(),
    filter: valueSetComposeIncludeFilterSchema.array().optional(),
    valueSet: urlSchema.array().optional(),
    _valueSet: elementSchema.array().optional(),
  })

const valueSetComposeSchema: ZodType<ValueSetCompose> =
  backboneElementSchema.extend({
    lockedDate: dateTimeSchema.optional(),
    _lockedDate: elementSchema.optional(),
    inactive: booleanSchema.optional(),
    _inactive: elementSchema.optional(),
    include: valueSetComposeIncludeSchema.array(),
    exclude: valueSetComposeIncludeSchema.array().optional(),
  })

const valueSetExpansionParameterSchema: ZodType<ValueSetExpansionParameter> =
  backboneElementSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueInteger: intSchema.optional(),
    valueDecimal: decimalSchema.optional(),
    valueUri: urlSchema.optional(),
    _valueUri: elementSchema.optional(),
    valueCode: stringSchema.optional(),
    _valueCode: elementSchema.optional(),
    valueDateTime: dateTimeSchema.optional(),
    _valueDateTime: elementSchema.optional(),
  })

const valueSetExpansionSchema: ZodType<ValueSetExpansion> =
  backboneElementSchema.extend({
    identifier: urlSchema.optional(),
    _identifier: elementSchema.optional(),
    timestamp: dateTimeSchema,
    _timestamp: elementSchema.optional(),
    total: intSchema.optional(),
    offset: intSchema.optional(),
    parameter: valueSetExpansionParameterSchema.array().optional(),
    contains: valueSetExpansionContainsSchema.array().optional(),
  })

/**
 * Zod schema for FHIR ValueSet resource (untyped version).
 */
export const untypedValueSetSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ValueSet').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    immutable: booleanSchema.optional(),
    _immutable: elementSchema.optional(),
    purpose: stringSchema.optional(),
    _purpose: elementSchema.optional(),
    copyright: stringSchema.optional(),
    _copyright: elementSchema.optional(),
    compose: valueSetComposeSchema.optional(),
    expansion: valueSetExpansionSchema.optional(),
  }),
) satisfies ZodType<ValueSet>

/**
 * Zod schema for FHIR ValueSet resource.
 */
export const valueSetSchema: ZodType<ValueSet> = untypedValueSetSchema

/**
 * Wrapper class for FHIR ValueSet resources.
 * Provides utility methods for working with value sets that define sets of coded values for use in specific contexts.
 */
export class FhirValueSet extends FhirDomainResource<ValueSet> {
  // Static Functions

  /**
   * Parses a ValueSet resource from unknown data.
   *
   * @param value - The data to parse and validate against the ValueSet schema
   * @returns A FhirValueSet instance containing the validated resource
   */
  public static parse(value: unknown): FhirValueSet {
    return new FhirValueSet(valueSetSchema.parse(value))
  }

  /**
   * Retrieves all identifier values matching any of the specified system URIs.
   *
   * @param system - One or more system URIs to filter identifiers by
   * @returns Array of identifier values from matching systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Retrieves the first identifier value matching any of the specified system URIs.
   *
   * @param system - One or more system URIs to filter identifiers by
   * @returns The first matching identifier value, or undefined if none found
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Retrieves all identifier values matching any of the specified type codings.
   *
   * @param type - One or more Coding objects representing identifier types
   * @returns Array of identifier values from matching types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Retrieves the first identifier value matching any of the specified type codings.
   *
   * @param type - One or more Coding objects representing identifier types
   * @returns The first matching identifier value, or undefined if none found
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
