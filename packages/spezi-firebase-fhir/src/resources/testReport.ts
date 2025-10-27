//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { TestReport } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedTestReportSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('TestReport').readonly(),
    })
    .passthrough(),
)

export const testReportSchema = untypedTestReportSchema

export class FhirTestReport extends FhirDomainResource<TestReport> {
  // Static Functions

  public static parse(value: unknown): FhirTestReport {
    const parsed = testReportSchema.parse(value)
    return new FhirTestReport(parsed as unknown as TestReport)
  }
}
