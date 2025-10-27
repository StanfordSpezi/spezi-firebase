//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type MeasureReport } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedMeasureReportSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('MeasureReport').readonly(),
    })
    .passthrough(),
)

export const measureReportSchema = untypedMeasureReportSchema

export class FhirMeasureReport extends FhirDomainResource<MeasureReport> {
  // Static Functions

  public static parse(value: unknown): FhirMeasureReport {
    const parsed = measureReportSchema.parse(value)
    return new FhirMeasureReport(parsed as unknown as MeasureReport)
  }
}
