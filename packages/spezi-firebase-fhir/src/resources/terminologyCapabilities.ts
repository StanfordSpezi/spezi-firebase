//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type TerminologyCapabilities } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedTerminologyCapabilitiesSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('TerminologyCapabilities').readonly(),
  }).passthrough(),
)

export const terminologyCapabilitiesSchema = untypedTerminologyCapabilitiesSchema

export class FhirTerminologyCapabilities extends FhirDomainResource<TerminologyCapabilities> {
  // Static Functions

  public static parse(value: unknown): FhirTerminologyCapabilities {
    const parsed = terminologyCapabilitiesSchema.parse(value)
    return new FhirTerminologyCapabilities(parsed as unknown as TerminologyCapabilities)
  }
}
