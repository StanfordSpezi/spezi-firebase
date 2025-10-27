//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { AuditEvent } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedAuditEventSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('AuditEvent').readonly(),
    })
    .passthrough(),
)

export const auditEventSchema = untypedAuditEventSchema

export class FhirAuditEvent extends FhirDomainResource<AuditEvent> {
  // Static Functions

  public static parse(value: unknown): FhirAuditEvent {
    const parsed = auditEventSchema.parse(value)
    return new FhirAuditEvent(parsed as unknown as AuditEvent)
  }
}
