//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type SearchParameterComponent,
  type SearchParameter,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  publicationStatusSchema,
  searchParameterComparatorSchema,
  searchParameterModifierSchema,
  searchParameterTypeSchema,
  searchParameterXpathUsageSchema,
} from '../valueSets/index.js'

const searchParameterComponentSchema: ZodType<SearchParameterComponent> =
  backboneElementSchema.extend({
    definition: urlSchema,
    _definition: elementSchema.optional(),
    expression: stringSchema,
    _expression: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR SearchParameter resource (untyped version).
 */
export const untypedSearchParameterSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SearchParameter').readonly(),
    base: stringSchema.array(),
    _base: elementSchema.array().optional(),
    chain: stringSchema.array().optional(),
    _chain: elementSchema.array().optional(),
    code: stringSchema,
    _code: elementSchema.optional(),
    comparator: searchParameterComparatorSchema.array().optional(),
    _comparator: elementSchema.array().optional(),
    component: searchParameterComponentSchema.array().optional(),
    contact: contactDetailSchema.array().optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    derivedFrom: urlSchema.optional(),
    _derivedFrom: elementSchema.optional(),
    description: stringSchema,
    _description: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    expression: stringSchema.optional(),
    _expression: elementSchema.optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    modifier: searchParameterModifierSchema.array().optional(),
    _modifier: elementSchema.array().optional(),
    multipleAnd: booleanSchema.optional(),
    _multipleAnd: elementSchema.optional(),
    multipleOr: booleanSchema.optional(),
    _multipleOr: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    purpose: stringSchema.optional(),
    _purpose: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    target: stringSchema.array().optional(),
    _target: elementSchema.array().optional(),
    type: searchParameterTypeSchema,
    _type: elementSchema.optional(),
    url: urlSchema,
    _url: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    xpath: stringSchema.optional(),
    _xpath: elementSchema.optional(),
    xpathUsage: searchParameterXpathUsageSchema.optional(),
    _xpathUsage: elementSchema.optional(),
  }),
) satisfies ZodType<SearchParameter>

/**
 * Zod schema for FHIR SearchParameter resource.
 */
export const searchParameterSchema: ZodType<SearchParameter> =
  untypedSearchParameterSchema

/**
 * Wrapper class for FHIR SearchParameter resources.
 * Provides utility methods for working with search parameters and custom search definitions.
 */
export class FhirSearchParameter extends FhirDomainResource<SearchParameter> {
  // Static Functions

  /**
   * Parses a SearchParameter resource from unknown data.
   *
   * @param value - The data to parse and validate against the SearchParameter schema
   * @returns A FhirSearchParameter instance containing the validated resource
   */
  public static parse(value: unknown): FhirSearchParameter {
    return new FhirSearchParameter(searchParameterSchema.parse(value))
  }
}
