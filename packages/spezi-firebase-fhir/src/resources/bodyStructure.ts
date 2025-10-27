//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type BodyStructure } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedBodyStructureSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('BodyStructure').readonly(),
  }).passthrough(),
)

export const bodyStructureSchema = untypedBodyStructureSchema

export class FhirBodyStructure extends FhirDomainResource<BodyStructure> {
  // Static Functions

  public static parse(value: unknown): FhirBodyStructure {
    const parsed = bodyStructureSchema.parse(value)
    return new FhirBodyStructure(parsed as unknown as BodyStructure)
  }
}
