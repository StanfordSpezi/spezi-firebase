//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type MessageDefinitionAllowedResponse,
  type MessageDefinitionFocus,
  type MessageDefinition,
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
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  messageDefinitionCategorySchema,
  messageDefinitionResponseRequiredSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const messageDefinitionAllowedResponseSchema: ZodType<MessageDefinitionAllowedResponse> =
  backboneElementSchema.extend({
    message: urlSchema,
    _message: elementSchema.optional(),
    situation: markdownSchema.optional(),
    _situation: elementSchema.optional(),
  })

const messageDefinitionFocusSchema: ZodType<MessageDefinitionFocus> =
  backboneElementSchema.extend({
    code: stringSchema,
    _code: elementSchema.optional(),
    max: stringSchema.optional(),
    _max: elementSchema.optional(),
    min: intSchema,
    profile: urlSchema.optional(),
    _profile: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR MessageDefinition resource (untyped version).
 */
export const untypedMessageDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MessageDefinition').readonly(),
    allowedResponse: messageDefinitionAllowedResponseSchema.array().optional(),
    base: urlSchema.optional(),
    _base: elementSchema.optional(),
    category: messageDefinitionCategorySchema.optional(),
    _category: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    date: dateTimeSchema,
    _date: elementSchema.optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    eventCoding: codingSchema.optional(),
    eventUri: urlSchema.optional(),
    _eventUri: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    focus: messageDefinitionFocusSchema.array().optional(),
    graph: urlSchema.array().optional(),
    _graph: elementSchema.array().optional(),
    identifier: identifierSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    parent: urlSchema.array().optional(),
    _parent: elementSchema.array().optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    replaces: urlSchema.array().optional(),
    _replaces: elementSchema.array().optional(),
    responseRequired: messageDefinitionResponseRequiredSchema.optional(),
    _responseRequired: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
  }),
) satisfies ZodType<MessageDefinition>

/**
 * Zod schema for FHIR MessageDefinition resource.
 */
export const messageDefinitionSchema: ZodType<MessageDefinition> =
  untypedMessageDefinitionSchema

/**
 * Wrapper class for FHIR MessageDefinition resources.
 * Provides utility methods for working with message definitions in messaging workflows.
 */
export class FhirMessageDefinition extends FhirDomainResource<MessageDefinition> {
  // Static Functions

  /**
   * Parses a MessageDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the MessageDefinition schema
   * @returns A FhirMessageDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirMessageDefinition {
    return new FhirMessageDefinition(messageDefinitionSchema.parse(value))
  }
}
