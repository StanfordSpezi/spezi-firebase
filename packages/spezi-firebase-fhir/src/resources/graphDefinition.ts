//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type GraphDefinition } from 'fhir/r4b.js'
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

const graphDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

export const untypedGraphDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('GraphDefinition').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    status: graphDefinitionStatusSchema,
    _status: elementSchema.optional(),
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
    start: codeSchema,
    _start: elementSchema.optional(),
    profile: canonicalSchema.optional(),
    _profile: elementSchema.optional(),
    link: z
      .lazy(() =>
        backboneElementSchema.extend({
          path: stringSchema.optional(),
          _path: elementSchema.optional(),
          sliceName: stringSchema.optional(),
          _sliceName: elementSchema.optional(),
          min: intSchema.optional(),
          _min: elementSchema.optional(),
          max: stringSchema.optional(),
          _max: elementSchema.optional(),
          description: stringSchema.optional(),
          _description: elementSchema.optional(),
          target: backboneElementSchema
            .extend({
              type: codeSchema,
              _type: elementSchema.optional(),
              params: stringSchema.optional(),
              _params: elementSchema.optional(),
              profile: canonicalSchema.optional(),
              _profile: elementSchema.optional(),
              compartment: backboneElementSchema
                .extend({
                  use: z.enum(['condition', 'requirement']),
                  _use: elementSchema.optional(),
                  code: codeSchema,
                  _code: elementSchema.optional(),
                  rule: z.enum(['identical', 'matching', 'different', 'custom']),
                  _rule: elementSchema.optional(),
                  expression: stringSchema.optional(),
                  _expression: elementSchema.optional(),
                  description: stringSchema.optional(),
                  _description: elementSchema.optional(),
                })
                .array()
                .optional(),
              link: z.array(z.any()).optional(), // Recursive reference
            })
            .array()
            .optional(),
        }),
      )
      .array()
      .optional(),
  }),
) satisfies ZodType<GraphDefinition>

export const graphDefinitionSchema: ZodType<GraphDefinition> =
  untypedGraphDefinitionSchema

export class FhirGraphDefinition extends FhirDomainResource<GraphDefinition> {
  public static parse(value: unknown): FhirGraphDefinition {
    return new FhirGraphDefinition(graphDefinitionSchema.parse(value))
  }
}
