//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type SubstanceDefinition } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedSubstanceDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SubstanceDefinition').readonly(),
  }).passthrough(),
)

export const substanceDefinitionSchema = untypedSubstanceDefinitionSchema

export class FhirSubstanceDefinition extends FhirDomainResource<SubstanceDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirSubstanceDefinition {
    const parsed = substanceDefinitionSchema.parse(value)
    return new FhirSubstanceDefinition(parsed as unknown as SubstanceDefinition)
  }
}
