//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type OperationDefinition } from 'fhir/r4b.js'
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
  intSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
  canonicalSchema,
} from '../elements/index.js'

const operationDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

const operationKindSchema = z.enum(['operation', 'query'])

const operationParameterUseSchema = z.enum(['in', 'out'])

const operationParameterSearchTypeSchema = z.enum([
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

export const untypedOperationDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('OperationDefinition').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: operationDefinitionStatusSchema,
    _status: elementSchema.optional(),
    kind: operationKindSchema,
    _kind: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    affectsState: booleanSchema.optional(),
    _affectsState: elementSchema.optional(),
    code: codeSchema,
    _code: elementSchema.optional(),
    comment: markdownSchema.optional(),
    _comment: elementSchema.optional(),
    base: canonicalSchema.optional(),
    _base: elementSchema.optional(),
    resource: codeSchema.array().optional(),
    _resource: elementSchema.array().optional(),
    system: booleanSchema,
    _system: elementSchema.optional(),
    type: booleanSchema,
    _type: elementSchema.optional(),
    instance: booleanSchema,
    _instance: elementSchema.optional(),
    inputProfile: canonicalSchema.optional(),
    _inputProfile: elementSchema.optional(),
    outputProfile: canonicalSchema.optional(),
    _outputProfile: elementSchema.optional(),
    parameter: z
      .lazy(() =>
        backboneElementSchema.extend({
          name: codeSchema,
          _name: elementSchema.optional(),
          use: operationParameterUseSchema,
          _use: elementSchema.optional(),
          min: intSchema,
          _min: elementSchema.optional(),
          max: stringSchema,
          _max: elementSchema.optional(),
          documentation: stringSchema.optional(),
          _documentation: elementSchema.optional(),
          type: codeSchema.optional(),
          _type: elementSchema.optional(),
          targetProfile: canonicalSchema.array().optional(),
          _targetProfile: elementSchema.array().optional(),
          searchType: operationParameterSearchTypeSchema.optional(),
          _searchType: elementSchema.optional(),
          binding: backboneElementSchema
            .extend({
              strength: z.enum(['required', 'extensible', 'preferred', 'example']),
              _strength: elementSchema.optional(),
              valueSet: canonicalSchema,
              _valueSet: elementSchema.optional(),
            })
            .optional(),
          referencedFrom: backboneElementSchema
            .extend({
              source: stringSchema,
              _source: elementSchema.optional(),
              sourceId: stringSchema.optional(),
              _sourceId: elementSchema.optional(),
            })
            .array()
            .optional(),
          part: z.array(z.any()).optional(), // Recursive reference
        }),
      )
      .array()
      .optional(),
    overload: backboneElementSchema
      .extend({
        parameterName: stringSchema.array().optional(),
        _parameterName: elementSchema.array().optional(),
        comment: stringSchema.optional(),
        _comment: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<OperationDefinition>

export const operationDefinitionSchema: ZodType<OperationDefinition> =
  untypedOperationDefinitionSchema

export class FhirOperationDefinition extends FhirDomainResource<OperationDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirOperationDefinition {
    return new FhirOperationDefinition(operationDefinitionSchema.parse(value))
  }
}
