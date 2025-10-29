//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DetectedIssue } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  detectedIssueSeveritySchema,
  detectedIssueStatusSchema,
} from '../valueSets/index.js'

export const untypedDetectedIssueSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DetectedIssue').readonly(),
    identifier: identifierSchema.array().optional(),
    status: detectedIssueStatusSchema,
    _status: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    severity: detectedIssueSeveritySchema.optional(),
    _severity: elementSchema.optional(),
    patient: referenceSchema.optional(),
    identifiedDateTime: dateTimeSchema.optional(),
    _identifiedDateTime: elementSchema.optional(),
    identifiedPeriod: periodSchema.optional(),
    author: referenceSchema.optional(),
    implicated: referenceSchema.array().optional(),
    evidence: backboneElementSchema
      .extend({
        code: codeableConceptSchema.array().optional(),
        detail: referenceSchema.array().optional(),
      })
      .array()
      .optional(),
    detail: stringSchema.optional(),
    _detail: elementSchema.optional(),
    reference: stringSchema.optional(),
    _reference: elementSchema.optional(),
    mitigation: backboneElementSchema
      .extend({
        action: codeableConceptSchema,
        date: dateTimeSchema.optional(),
        _date: elementSchema.optional(),
        author: referenceSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<DetectedIssue>

export const detectedIssueSchema: ZodType<DetectedIssue> =
  untypedDetectedIssueSchema

export class FhirDetectedIssue extends FhirDomainResource<DetectedIssue> {
  // Static Functions

  public static parse(value: unknown): FhirDetectedIssue {
    return new FhirDetectedIssue(detectedIssueSchema.parse(value))
  }
}
