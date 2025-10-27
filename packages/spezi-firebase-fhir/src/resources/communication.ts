//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Communication } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  attachmentSchema,
  backboneElementSchema,
  canonicalSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'

const communicationStatusSchema = z.enum([
  'preparation',
  'in-progress',
  'not-done',
  'on-hold',
  'stopped',
  'completed',
  'entered-in-error',
  'unknown',
])

const communicationPrioritySchema = z.enum([
  'routine',
  'urgent',
  'asap',
  'stat',
])

export const untypedCommunicationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Communication').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    inResponseTo: referenceSchema.array().optional(),
    status: communicationStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    priority: communicationPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    medium: codeableConceptSchema.array().optional(),
    subject: referenceSchema.optional(),
    topic: codeableConceptSchema.optional(),
    about: referenceSchema.array().optional(),
    encounter: referenceSchema.optional(),
    sent: dateTimeSchema.optional(),
    _sent: elementSchema.optional(),
    received: dateTimeSchema.optional(),
    _received: elementSchema.optional(),
    recipient: referenceSchema.array().optional(),
    sender: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    payload: backboneElementSchema
      .extend({
        contentString: stringSchema.optional(),
        _contentString: elementSchema.optional(),
        contentAttachment: attachmentSchema.optional(),
        contentReference: referenceSchema.optional(),
      })
      .array()
      .optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<Communication>

export const communicationSchema: ZodType<Communication> =
  untypedCommunicationSchema

export class FhirCommunication extends FhirDomainResource<Communication> {
  // Static Functions

  public static parse(value: unknown): FhirCommunication {
    return new FhirCommunication(communicationSchema.parse(value))
  }
}
