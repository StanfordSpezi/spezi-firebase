//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MedicinalProductDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedMedicinalProductDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicinalProductDefinition').readonly(),
  }).passthrough(),
)

export const medicinalProductDefinitionSchema = untypedMedicinalProductDefinitionSchema

export class FhirMedicinalProductDefinition extends FhirDomainResource<MedicinalProductDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirMedicinalProductDefinition {
    const parsed = medicinalProductDefinitionSchema.parse(value)
    return new FhirMedicinalProductDefinition(parsed as unknown as MedicinalProductDefinition)
  }
}
