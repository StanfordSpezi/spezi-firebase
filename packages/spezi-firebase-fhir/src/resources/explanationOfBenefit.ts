//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ExplanationOfBenefit } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedExplanationOfBenefitSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ExplanationOfBenefit').readonly(),
  }).passthrough(),
)

export const explanationOfBenefitSchema = untypedExplanationOfBenefitSchema

export class FhirExplanationOfBenefit extends FhirDomainResource<ExplanationOfBenefit> {
  // Static Functions

  public static parse(value: unknown): FhirExplanationOfBenefit {
    const parsed = explanationOfBenefitSchema.parse(value)
    return new FhirExplanationOfBenefit(parsed as unknown as ExplanationOfBenefit)
  }
}
