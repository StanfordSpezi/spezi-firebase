//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type SpecimenDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedSpecimenDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SpecimenDefinition').readonly(),
  }).passthrough(),
)

export const specimenDefinitionSchema = untypedSpecimenDefinitionSchema

export class FhirSpecimenDefinition extends FhirDomainResource<SpecimenDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirSpecimenDefinition {
    const parsed = specimenDefinitionSchema.parse(value)
    return new FhirSpecimenDefinition(parsed as unknown as SpecimenDefinition)
  }
}
