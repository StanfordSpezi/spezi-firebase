//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type AuditEventAgent,
  type AuditEventAgentNetwork,
  type AuditEventEntity,
  type AuditEventEntityDetail,
  type AuditEventSource,
  type AuditEvent,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

const auditEventAgentNetworkSchema: ZodType<AuditEventAgentNetwork> =
  backboneElementSchema.extend({
    address: stringSchema.optional(),
    _address: elementSchema.optional(),
    type: codeSchema.optional(),
    _type: elementSchema.optional(),
  })

const auditEventAgentSchema: ZodType<AuditEventAgent> =
  backboneElementSchema.extend({
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
    network: auditEventAgentNetworkSchema.optional(),
    purposeOfUse: codeableConceptSchema.array().optional(),
  })

const auditEventSourceSchema: ZodType<AuditEventSource> =
  backboneElementSchema.extend({
    site: stringSchema.optional(),
    _site: elementSchema.optional(),
    observer: referenceSchema,
    type: codingSchema.array().optional(),
  })

const auditEventEntityDetailSchema: ZodType<AuditEventEntityDetail> =
  backboneElementSchema.extend({
    type: stringSchema,
    _type: elementSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueBase64Binary: base64BinarySchema.optional(),
    _valueBase64Binary: elementSchema.optional(),
  })

const auditEventEntitySchema: ZodType<AuditEventEntity> =
  backboneElementSchema.extend({
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
    detail: auditEventEntityDetailSchema.array().optional(),
  })

/**
 * Zod schema for FHIR AuditEvent resource (untyped version).
 */
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
    agent: auditEventAgentSchema.array().min(1),
    source: auditEventSourceSchema,
    entity: auditEventEntitySchema.array().optional(),
  }),
) satisfies ZodType<AuditEvent>

/**
 * Zod schema for FHIR AuditEvent resource.
 */
export const auditEventSchema: ZodType<AuditEvent> = untypedAuditEventSchema

/**
 * Wrapper class for FHIR AuditEvent resources.
 * Provides utility methods for working with audit events and their recorded times.
 */
export class FhirAuditEvent extends FhirDomainResource<AuditEvent> {
  /**
   * Parses an AuditEvent resource from unknown data.
   *
   * @param value - The data to parse and validate against the AuditEvent schema
   * @returns A FhirAuditEvent instance containing the validated resource
   */
  public static parse(value: unknown): FhirAuditEvent {
    return new FhirAuditEvent(auditEventSchema.parse(value))
  }

  /**
   * Gets the date/time when the auditable event was recorded.
   *
   * @returns The recorded date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const recordedDate = auditEvent.recordedDate
   * console.log(`Event recorded: ${recordedDate?.toISOString()}`)
   * ```
   */
  public get recordedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.recorded)
  }
}
