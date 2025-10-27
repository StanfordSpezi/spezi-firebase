//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { import { type DetectedIssue } from 'fhir/r4b.js' } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedDetectedIssueSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('DetectedIssue').readonly(),
    })
    .passthrough(),
)

export const detectedIssueSchema = untypedDetectedIssueSchema

export class FhirDetectedIssue extends FhirDomainResource<DetectedIssue> {
  // Static Functions

  public static parse(value: unknown): FhirDetectedIssue {
    const parsed = detectedIssueSchema.parse(value)
    return new FhirDetectedIssue(parsed as unknown as DetectedIssue)
  }
}
