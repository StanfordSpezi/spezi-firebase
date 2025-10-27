//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MessageDefinition } from 'fhir/r4b.js'
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
  markdownSchema,
  stringSchema,
  unsignedIntSchema,
  urlSchema,
  usageContextSchema,
  canonicalSchema,
  codeSchema,
  idSchema,
} from '../elements/index.js'

const messageDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

const messageSignificanceCategorySchema = z.enum([
  'consequence',
  'currency',
  'notification',
])

const messageheaderResponseRequestSchema = z.enum([
  'always',
  'on-error',
  'never',
  'on-success',
])

export const untypedMessageDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MessageDefinition').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    identifier: z.any().array().optional(), // Identifier
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    replaces: canonicalSchema.array().optional(),
    _replaces: elementSchema.array().optional(),
    status: messageDefinitionStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema,
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
    base: canonicalSchema.optional(),
    _base: elementSchema.optional(),
    parent: canonicalSchema.array().optional(),
    _parent: elementSchema.array().optional(),
    eventCoding: codingSchema.optional(),
    eventUri: urlSchema.optional(),
    _eventUri: elementSchema.optional(),
    category: messageSignificanceCategorySchema.optional(),
    _category: elementSchema.optional(),
    focus: backboneElementSchema
      .extend({
        code: codeSchema,
        _code: elementSchema.optional(),
        profile: canonicalSchema.optional(),
        _profile: elementSchema.optional(),
        min: unsignedIntSchema,
        _min: elementSchema.optional(),
        max: stringSchema.optional(),
        _max: elementSchema.optional(),
      })
      .array()
      .optional(),
    responseRequired: messageheaderResponseRequestSchema.optional(),
    _responseRequired: elementSchema.optional(),
    allowedResponse: backboneElementSchema
      .extend({
        message: canonicalSchema,
        _message: elementSchema.optional(),
        situation: markdownSchema.optional(),
        _situation: elementSchema.optional(),
      })
      .array()
      .optional(),
    graph: canonicalSchema.array().optional(),
    _graph: elementSchema.array().optional(),
  }),
) satisfies ZodType<MessageDefinition>

export const messageDefinitionSchema: ZodType<MessageDefinition> =
  untypedMessageDefinitionSchema

export class FhirMessageDefinition extends FhirDomainResource<MessageDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirMessageDefinition {
    return new FhirMessageDefinition(messageDefinitionSchema.parse(value))
  }
}
