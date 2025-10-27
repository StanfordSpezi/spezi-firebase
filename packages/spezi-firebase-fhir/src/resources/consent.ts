//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type Consent } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedConsentSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('Consent').readonly(),
    })
    .passthrough(),
)

export const consentSchema = untypedConsentSchema

export class FhirConsent extends FhirDomainResource<Consent> {
  // Static Functions

  public static parse(value: unknown): FhirConsent {
    const parsed = consentSchema.parse(value)
    return new FhirConsent(parsed as unknown as Consent)
  }
}
