//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type ClinicalImpression } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedClinicalImpressionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ClinicalImpression').readonly(),
    })
    .passthrough(),
)

export const clinicalImpressionSchema = untypedClinicalImpressionSchema

export class FhirClinicalImpression extends FhirDomainResource<ClinicalImpression> {
  // Static Functions

  public static parse(value: unknown): FhirClinicalImpression {
    const parsed = clinicalImpressionSchema.parse(value)
    return new FhirClinicalImpression(parsed as unknown as ClinicalImpression)
  }
}
