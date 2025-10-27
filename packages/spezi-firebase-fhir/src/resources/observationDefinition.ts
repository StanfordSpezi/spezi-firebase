//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { ObservationDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedObservationDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('ObservationDefinition').readonly(),
    })
    .passthrough(),
)

export const observationDefinitionSchema = untypedObservationDefinitionSchema

export class FhirObservationDefinition extends FhirDomainResource<ObservationDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirObservationDefinition {
    const parsed = observationDefinitionSchema.parse(value)
    return new FhirObservationDefinition(
      parsed as unknown as ObservationDefinition,
    )
  }
}
