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

const detectedIssueStatusSchema = z.enum([
  'registered',
  'preliminary',
  'final',
  'amended',
  'corrected',
  'cancelled',
  'entered-in-error',
  'unknown',
])

const detectedIssueSeveritySchema = z.enum(['high', 'moderate', 'low'])

export const untypedDetectedIssueSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DetectedIssue').readonly(),
    author: referenceSchema.optional(),
    code: codeableConceptSchema.optional(),
    detail: stringSchema.optional(),
    _detail: elementSchema.optional(),
    evidence: backboneElementSchema
      .extend({
        code: codeableConceptSchema.array().optional(),
        detail: referenceSchema.array().optional(),
      })
      .array()
      .optional(),
    identifiedDateTime: dateTimeSchema.optional(),
    _identifiedDateTime: elementSchema.optional(),
    identifiedPeriod: periodSchema.optional(),
    identifier: identifierSchema.array().optional(),
    implicated: referenceSchema.array().optional(),
    mitigation: backboneElementSchema
      .extend({
        action: codeableConceptSchema,
        author: referenceSchema.optional(),
        date: dateTimeSchema.optional(),
        _date: elementSchema.optional(),
      })
      .array()
      .optional(),
    patient: referenceSchema.optional(),
    reference: stringSchema.optional(),
    _reference: elementSchema.optional(),
    severity: detectedIssueSeveritySchema.optional(),
    _severity: elementSchema.optional(),
    status: detectedIssueStatusSchema,
    _status: elementSchema.optional(),
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
