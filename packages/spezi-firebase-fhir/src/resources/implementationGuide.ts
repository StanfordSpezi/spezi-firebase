//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ImplementationGuide } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedImplementationGuideSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ImplementationGuide').readonly(),
  }).passthrough(),
)

export const implementationGuideSchema = untypedImplementationGuideSchema

export class FhirImplementationGuide extends FhirDomainResource<ImplementationGuide> {
  // Static Functions

  public static parse(value: unknown): FhirImplementationGuide {
    const parsed = implementationGuideSchema.parse(value)
    return new FhirImplementationGuide(parsed as unknown as ImplementationGuide)
  }
}
