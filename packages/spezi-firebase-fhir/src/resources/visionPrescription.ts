//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type VisionPrescription } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedVisionPrescriptionSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('VisionPrescription').readonly(),
    })
    .passthrough(),
)

export const visionPrescriptionSchema = untypedVisionPrescriptionSchema

export class FhirVisionPrescription extends FhirDomainResource<VisionPrescription> {
  // Static Functions

  public static parse(value: unknown): FhirVisionPrescription {
    const parsed = visionPrescriptionSchema.parse(value)
    return new FhirVisionPrescription(parsed as unknown as VisionPrescription)
  }
}
