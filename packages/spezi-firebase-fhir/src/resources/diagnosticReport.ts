//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DiagnosticReport } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  attachmentSchema,
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const diagnosticReportStatusSchema = z.enum([
  'registered',
  'partial',
  'preliminary',
  'final',
  'amended',
  'corrected',
  'appended',
  'cancelled',
  'entered-in-error',
  'unknown',
])

const diagnosticReportMediaSchema = z.lazy(() =>
  backboneElementSchema.extend({
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
    link: referenceSchema,
  }),
)

export const untypedDiagnosticReportSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DiagnosticReport').readonly(),
    basedOn: referenceSchema.array().optional(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema,
    conclusion: stringSchema.optional(),
    _conclusion: elementSchema.optional(),
    conclusionCode: codeableConceptSchema.array().optional(),
    effectiveDateTime: stringSchema.optional(),
    _effectiveDateTime: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    encounter: referenceSchema.optional(),
    identifier: identifierSchema.array().optional(),
    imagingStudy: referenceSchema.array().optional(),
    issued: stringSchema.optional(),
    _issued: elementSchema.optional(),
    media: diagnosticReportMediaSchema.array().optional(),
    performer: referenceSchema.array().optional(),
    presentedForm: attachmentSchema.array().optional(),
    result: referenceSchema.array().optional(),
    resultsInterpreter: referenceSchema.array().optional(),
    specimen: referenceSchema.array().optional(),
    status: diagnosticReportStatusSchema,
    _status: elementSchema.optional(),
    subject: referenceSchema.optional(),
  }),
) satisfies ZodType<DiagnosticReport>

export const diagnosticReportSchema: ZodType<DiagnosticReport> =
  untypedDiagnosticReportSchema

export class FhirDiagnosticReport extends FhirDomainResource<DiagnosticReport> {
  // Static Functions

  public static parse(value: unknown): FhirDiagnosticReport {
    return new FhirDiagnosticReport(diagnosticReportSchema.parse(value))
  }
}
