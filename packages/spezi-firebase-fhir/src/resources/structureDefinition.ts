//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type StructureDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  idSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
  canonicalSchema,
  codeSchema,
  uriSchema,
} from '../elements/index.js'

const structureDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

const structureDefinitionKindSchema = z.enum([
  'primitive-type',
  'complex-type',
  'resource',
  'logical',
])

const extensionContextTypeSchema = z.enum([
  'fhirpath',
  'element',
  'extension',
])

export const untypedStructureDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('StructureDefinition').readonly(),
    url: uriSchema,
    _url: elementSchema.optional(),
    identifier: z.any().array().optional(), // Identifier
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: structureDefinitionStatusSchema,
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
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    keyword: codingSchema.array().optional(),
    fhirVersion: z.string().optional(), // FHIRVersion
    _fhirVersion: elementSchema.optional(),
    mapping: backboneElementSchema
      .extend({
        identity: idSchema,
        _identity: elementSchema.optional(),
        uri: uriSchema.optional(),
        _uri: elementSchema.optional(),
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
        comment: stringSchema.optional(),
        _comment: elementSchema.optional(),
      })
      .array()
      .optional(),
    kind: structureDefinitionKindSchema,
    _kind: elementSchema.optional(),
    abstract: booleanSchema,
    _abstract: elementSchema.optional(),
    context: backboneElementSchema
      .extend({
        type: extensionContextTypeSchema,
        _type: elementSchema.optional(),
        expression: stringSchema,
        _expression: elementSchema.optional(),
      })
      .array()
      .optional(),
    contextInvariant: stringSchema.array().optional(),
    _contextInvariant: elementSchema.array().optional(),
    type: uriSchema,
    _type: elementSchema.optional(),
    baseDefinition: canonicalSchema.optional(),
    _baseDefinition: elementSchema.optional(),
    derivation: z.enum(['specialization', 'constraint']).optional(),
    _derivation: elementSchema.optional(),
    snapshot: backboneElementSchema
      .extend({
        element: z.any().array(), // ElementDefinition array - extremely complex
      })
      .optional(),
    differential: backboneElementSchema
      .extend({
        element: z.any().array(), // ElementDefinition array - extremely complex
      })
      .optional(),
  }),
) satisfies ZodType<StructureDefinition>

export const structureDefinitionSchema: ZodType<StructureDefinition> =
  untypedStructureDefinitionSchema

export class FhirStructureDefinition extends FhirDomainResource<StructureDefinition> {
  public static parse(value: unknown): FhirStructureDefinition {
    return new FhirStructureDefinition(structureDefinitionSchema.parse(value))
  }
}
