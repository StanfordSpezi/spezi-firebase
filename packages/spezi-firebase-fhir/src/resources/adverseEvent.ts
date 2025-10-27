//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { AdverseEvent } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedAdverseEventSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('AdverseEvent').readonly(),
    })
    .passthrough(),
)

export const adverseEventSchema = untypedAdverseEventSchema

export class FhirAdverseEvent extends FhirDomainResource<AdverseEvent> {
  // Static Functions

  public static parse(value: unknown): FhirAdverseEvent {
    const parsed = adverseEventSchema.parse(value)
    return new FhirAdverseEvent(parsed as unknown as AdverseEvent)
  }
}
