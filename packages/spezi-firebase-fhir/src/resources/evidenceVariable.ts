//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type EvidenceVariable } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedEvidenceVariableSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('EvidenceVariable').readonly(),
  }).passthrough(),
)

export const evidenceVariableSchema = untypedEvidenceVariableSchema

export class FhirEvidenceVariable extends FhirDomainResource<EvidenceVariable> {
  // Static Functions

  public static parse(value: unknown): FhirEvidenceVariable {
    const parsed = evidenceVariableSchema.parse(value)
    return new FhirEvidenceVariable(parsed as unknown as EvidenceVariable)
  }
}
