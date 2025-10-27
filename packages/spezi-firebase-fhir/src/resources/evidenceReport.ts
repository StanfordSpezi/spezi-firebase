//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type EvidenceReport } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedEvidenceReportSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('EvidenceReport').readonly(),
    })
    .passthrough(),
)

export const evidenceReportSchema = untypedEvidenceReportSchema

export class FhirEvidenceReport extends FhirDomainResource<EvidenceReport> {
  // Static Functions

  public static parse(value: unknown): FhirEvidenceReport {
    const parsed = evidenceReportSchema.parse(value)
    return new FhirEvidenceReport(parsed as unknown as EvidenceReport)
  }
}
