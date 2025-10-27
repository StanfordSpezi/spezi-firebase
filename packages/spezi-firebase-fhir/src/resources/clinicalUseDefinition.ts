//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type ClinicalUseDefinition } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedClinicalUseDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ClinicalUseDefinition').readonly(),
    })
    .passthrough(),
)

export const clinicalUseDefinitionSchema = untypedClinicalUseDefinitionSchema

export class FhirClinicalUseDefinition extends FhirDomainResource<ClinicalUseDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirClinicalUseDefinition {
    const parsed = clinicalUseDefinitionSchema.parse(value)
    return new FhirClinicalUseDefinition(
      parsed as unknown as ClinicalUseDefinition,
    )
  }
}
