//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type SearchParameter } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codeSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
  canonicalSchema,
} from '../elements/index.js'

const searchParameterStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

const searchParamTypeSchema = z.enum([
  'number',
  'date',
  'string',
  'token',
  'reference',
  'composite',
  'quantity',
  'uri',
  'special',
])

const searchComparatorSchema = z.enum(['eq', 'ne', 'gt', 'lt', 'ge', 'le', 'sa', 'eb', 'ap'])

const searchModifierCodeSchema = z.enum([
  'missing',
  'exact',
  'contains',
  'not',
  'text',
  'in',
  'not-in',
  'below',
  'above',
  'type',
  'identifier',
  'ofType',
])

const xpathUsageTypeSchema = z.enum(['normal', 'phonetic', 'nearby', 'distance', 'other'])

export const untypedSearchParameterSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SearchParameter').readonly(),
    url: urlSchema,
    _url: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    derivedFrom: canonicalSchema.optional(),
    _derivedFrom: elementSchema.optional(),
    status: searchParameterStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: markdownSchema,
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    code: codeSchema,
    _code: elementSchema.optional(),
    base: codeSchema.array(),
    _base: elementSchema.array().optional(),
    type: searchParamTypeSchema,
    _type: elementSchema.optional(),
    expression: stringSchema.optional(),
    _expression: elementSchema.optional(),
    xpath: stringSchema.optional(),
    _xpath: elementSchema.optional(),
    xpathUsage: xpathUsageTypeSchema.optional(),
    _xpathUsage: elementSchema.optional(),
    target: codeSchema.array().optional(),
    _target: elementSchema.array().optional(),
    multipleOr: booleanSchema.optional(),
    _multipleOr: elementSchema.optional(),
    multipleAnd: booleanSchema.optional(),
    _multipleAnd: elementSchema.optional(),
    comparator: searchComparatorSchema.array().optional(),
    _comparator: elementSchema.array().optional(),
    modifier: searchModifierCodeSchema.array().optional(),
    _modifier: elementSchema.array().optional(),
    chain: stringSchema.array().optional(),
    _chain: elementSchema.array().optional(),
    component: backboneElementSchema
      .extend({
        definition: canonicalSchema,
        _definition: elementSchema.optional(),
        expression: stringSchema,
        _expression: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<SearchParameter>

export const searchParameterSchema: ZodType<SearchParameter> =
  untypedSearchParameterSchema

export class FhirSearchParameter extends FhirDomainResource<SearchParameter> {
  // Static Functions

  public static parse(value: unknown): FhirSearchParameter {
    return new FhirSearchParameter(searchParameterSchema.parse(value))
  }
}
