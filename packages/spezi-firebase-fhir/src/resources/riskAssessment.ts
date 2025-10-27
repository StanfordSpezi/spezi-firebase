//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type RiskAssessment } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedRiskAssessmentSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('RiskAssessment').readonly(),
    })
    .passthrough(),
)

export const riskAssessmentSchema = untypedRiskAssessmentSchema

export class FhirRiskAssessment extends FhirDomainResource<RiskAssessment> {
  // Static Functions

  public static parse(value: unknown): FhirRiskAssessment {
    const parsed = riskAssessmentSchema.parse(value)
    return new FhirRiskAssessment(parsed as unknown as RiskAssessment)
  }
}
