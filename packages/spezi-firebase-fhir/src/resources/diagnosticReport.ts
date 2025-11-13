//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DiagnosticReportMedia, type DiagnosticReport } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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
import { diagnosticReportStatusSchema } from '../valueSets/index.js'

const diagnosticReportMediaSchema: ZodType<DiagnosticReportMedia> =
  backboneElementSchema.extend({
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
    link: referenceSchema,
  })

/**
 * Zod schema for FHIR DiagnosticReport resource (untyped version).
 */
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

/**
 * Zod schema for FHIR DiagnosticReport resource.
 */
export const diagnosticReportSchema: ZodType<DiagnosticReport> =
  untypedDiagnosticReportSchema

/**
 * Wrapper class for FHIR DiagnosticReport resources.
 * Provides utility methods for working with diagnostic reports.
 */
export class FhirDiagnosticReport extends FhirDomainResource<DiagnosticReport> {
  // Static Functions

  /**
   * Parses a DiagnosticReport resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirDiagnosticReport instance
   */
  public static parse(value: unknown): FhirDiagnosticReport {
    return new FhirDiagnosticReport(diagnosticReportSchema.parse(value))
  }

  // Properties

  /**
   * Gets the effective date as a JavaScript Date object.
   *
   * @returns The effective date if available
   */
  public get effectiveDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.effectiveDateTime)
  }

  /**
   * Gets the issued date as a JavaScript Date object.
   *
   * @returns The issued date if available
   */
  public get issuedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.issued)
  }

  /**
   * Gets the code display text (type of report).
   *
   * @returns The code display
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Gets all conclusion code displays.
   *
   * @returns Array of conclusion code display texts
   */
  public get conclusionDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.conclusionCode)
  }

  /**
   * Gets all category displays.
   *
   * @returns Array of category display texts
   */
  public get categoryDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.category)
  }
}
