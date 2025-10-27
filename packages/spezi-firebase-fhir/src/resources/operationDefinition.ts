//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { OperationDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedOperationDefinitionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('OperationDefinition').readonly(),
    })
    .passthrough(),
)

export const operationDefinitionSchema = untypedOperationDefinitionSchema

export class FhirOperationDefinition extends FhirDomainResource<OperationDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirOperationDefinition {
    const parsed = operationDefinitionSchema.parse(value)
    return new FhirOperationDefinition(parsed as unknown as OperationDefinition)
  }
}
