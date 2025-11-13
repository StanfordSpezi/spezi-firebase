//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type MessageHeaderDestination,
  type MessageHeaderResponse,
  type MessageHeaderSource,
  type MessageHeader,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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
import { messageHeaderResponseCodeSchema } from '../valueSets/index.js'

const messageHeaderDestinationSchema: ZodType<MessageHeaderDestination> =
  backboneElementSchema.extend({
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    target: referenceSchema.optional(),
    endpoint: uriSchema,
    _endpoint: elementSchema.optional(),
    receiver: referenceSchema.optional(),
  })

const messageHeaderSourceSchema: ZodType<MessageHeaderSource> =
  backboneElementSchema.extend({
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    software: stringSchema.optional(),
    _software: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    endpoint: urlSchema,
    _endpoint: elementSchema.optional(),
  })

const messageHeaderResponseSchema: ZodType<MessageHeaderResponse> =
  backboneElementSchema.extend({
    identifier: idSchema,
    _identifier: elementSchema.optional(),
    code: messageHeaderResponseCodeSchema,
    details: referenceSchema.optional(),
  })

/**
 * Zod schema for FHIR MessageHeader resource (untyped version).
 */
export const untypedMessageHeaderSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MessageHeader').readonly(),
    eventCoding: codingSchema.optional(),
    eventUri: uriSchema.optional(),
    _eventUri: elementSchema.optional(),
    destination: messageHeaderDestinationSchema.array().optional(),
    sender: referenceSchema.optional(),
    enterer: referenceSchema.optional(),
    author: referenceSchema.optional(),
    source: messageHeaderSourceSchema,
    responsible: referenceSchema.optional(),
    reason: codeableConceptSchema.optional(),
    response: messageHeaderResponseSchema.optional(),
    focus: referenceSchema.array().optional(),
    definition: canonicalSchema.optional(),
  }),
) satisfies ZodType<MessageHeader>

/**
 * Zod schema for FHIR MessageHeader resource.
 */
export const messageHeaderSchema: ZodType<MessageHeader> =
  untypedMessageHeaderSchema

/**
 * Wrapper class for FHIR MessageHeader resources.
 * Provides utility methods for working with message headers in messaging workflows.
 */
export class FhirMessageHeader extends FhirDomainResource<MessageHeader> {
  // Static Functions

  /**
   * Parses a MessageHeader resource from unknown data.
   *
   * @param value - The data to parse and validate against the MessageHeader schema
   * @returns A FhirMessageHeader instance containing the validated resource
   */
  public static parse(value: unknown): FhirMessageHeader {
    return new FhirMessageHeader(messageHeaderSchema.parse(value))
  }
}
