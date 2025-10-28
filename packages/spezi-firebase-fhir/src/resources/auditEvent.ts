//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type AuditEvent } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  base64BinarySchema,
  booleanSchema,
  codeableConceptSchema,
  codeSchema,
  codingSchema,
  domainResourceSchema,
  elementSchema,
  instantSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'

export const untypedAuditEventSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('AuditEvent').readonly(),
    type: codingSchema,
    subtype: codingSchema.array().optional(),
    action: codeSchema.optional(),
    _action: elementSchema.optional(),
    period: periodSchema.optional(),
    recorded: instantSchema,
    _recorded: elementSchema.optional(),
    outcome: codeSchema.optional(),
    _outcome: elementSchema.optional(),
    outcomeDesc: stringSchema.optional(),
    _outcomeDesc: elementSchema.optional(),
    purposeOfEvent: codeableConceptSchema.array().optional(),
    agent: backboneElementSchema
      .extend({
        type: codeableConceptSchema.optional(),
        role: codeableConceptSchema.array().optional(),
        who: referenceSchema.optional(),
        altId: stringSchema.optional(),
        _altId: elementSchema.optional(),
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
        requestor: booleanSchema,
        _requestor: elementSchema.optional(),
        location: referenceSchema.optional(),
        policy: uriSchema.array().optional(),
        _policy: elementSchema.array().optional(),
        media: codingSchema.optional(),
        network: backboneElementSchema
          .extend({
            address: stringSchema.optional(),
            _address: elementSchema.optional(),
            type: codeSchema.optional(),
            _type: elementSchema.optional(),
          })
          .optional(),
        purposeOfUse: codeableConceptSchema.array().optional(),
      })
      .array()
      .min(1),
    source: backboneElementSchema.extend({
      site: stringSchema.optional(),
      _site: elementSchema.optional(),
      observer: referenceSchema,
      type: codingSchema.array().optional(),
    }),
    entity: backboneElementSchema
      .extend({
        what: referenceSchema.optional(),
        type: codingSchema.optional(),
        role: codingSchema.optional(),
        lifecycle: codingSchema.optional(),
        securityLabel: codingSchema.array().optional(),
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        query: base64BinarySchema.optional(),
        _query: elementSchema.optional(),
        detail: backboneElementSchema
          .extend({
            type: stringSchema,
            _type: elementSchema.optional(),
            valueString: stringSchema.optional(),
            _valueString: elementSchema.optional(),
            valueBase64Binary: base64BinarySchema.optional(),
            _valueBase64Binary: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<AuditEvent>

export const auditEventSchema: ZodType<AuditEvent> = untypedAuditEventSchema

export class FhirAuditEvent extends FhirDomainResource<AuditEvent> {
  // Static Functions

  public static parse(value: unknown): FhirAuditEvent {
    return new FhirAuditEvent(auditEventSchema.parse(value))
  }
}
