//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CommunicationRequest } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const communicationRequestStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'revoked',
  'completed',
  'entered-in-error',
  'unknown',
])

const communicationRequestPrioritySchema = z.enum([
  'routine',
  'urgent',
  'asap',
  'stat',
])

export const untypedCommunicationRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('CommunicationRequest').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    replaces: referenceSchema.array().optional(),
    groupIdentifier: identifierSchema.optional(),
    status: communicationRequestStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    priority: communicationRequestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    doNotPerform: booleanSchema.optional(),
    _doNotPerform: elementSchema.optional(),
    medium: codeableConceptSchema.array().optional(),
    subject: referenceSchema.optional(),
    about: referenceSchema.array().optional(),
    encounter: referenceSchema.optional(),
    payload: backboneElementSchema
      .extend({
        contentString: stringSchema.optional(),
        _contentString: elementSchema.optional(),
        contentAttachment: attachmentSchema.optional(),
        contentReference: referenceSchema.optional(),
      })
      .array()
      .optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    requester: referenceSchema.optional(),
    recipient: referenceSchema.array().optional(),
    sender: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<CommunicationRequest>

export const communicationRequestSchema: ZodType<CommunicationRequest> =
  untypedCommunicationRequestSchema

export class FhirCommunicationRequest extends FhirDomainResource<CommunicationRequest> {
  // Static Functions

  public static parse(value: unknown): FhirCommunicationRequest {
    return new FhirCommunicationRequest(communicationRequestSchema.parse(value))
  }
}
