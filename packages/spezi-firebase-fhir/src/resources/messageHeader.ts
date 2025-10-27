//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MessageHeader } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  canonicalSchema,
  codeableConceptSchema,
  codingSchema,
  domainResourceSchema,
  elementSchema,
  idSchema,
  referenceSchema,
  stringSchema,
  uriSchema,
  urlSchema,
} from '../elements/index.js'

export const untypedMessageHeaderSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MessageHeader').readonly(),
    eventCoding: codingSchema.optional(),
    eventUri: uriSchema.optional(),
    _eventUri: elementSchema.optional(),
    destination: backboneElementSchema
      .extend({
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
        target: referenceSchema.optional(),
        endpoint: uriSchema,
        _endpoint: elementSchema.optional(),
        receiver: referenceSchema.optional(),
      })
      .array()
      .optional(),
    sender: referenceSchema.optional(),
    enterer: referenceSchema.optional(),
    author: referenceSchema.optional(),
    source: backboneElementSchema.extend({
      name: stringSchema.optional(),
      _name: elementSchema.optional(),
      software: stringSchema.optional(),
      _software: elementSchema.optional(),
      version: stringSchema.optional(),
      _version: elementSchema.optional(),
      endpoint: urlSchema,
      _endpoint: elementSchema.optional(),
    }),
    responsible: referenceSchema.optional(),
    reason: codeableConceptSchema.optional(),
    response: backboneElementSchema
      .extend({
        identifier: idSchema,
        _identifier: elementSchema.optional(),
        code: z.enum(['ok', 'transient-error', 'fatal-error']),
        details: referenceSchema.optional(),
      })
      .optional(),
    focus: referenceSchema.array().optional(),
    definition: canonicalSchema.optional(),
  }),
) satisfies ZodType<MessageHeader>

export const messageHeaderSchema: ZodType<MessageHeader> =
  untypedMessageHeaderSchema

export class FhirMessageHeader extends FhirDomainResource<MessageHeader> {
  // Static Functions

  public static parse(value: unknown): FhirMessageHeader {
    return new FhirMessageHeader(messageHeaderSchema.parse(value))
  }
}
