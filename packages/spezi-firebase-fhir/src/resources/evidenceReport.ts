//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type EvidenceReport,
  type EvidenceReportSubject,
  type EvidenceReportSection,
  type EvidenceReportSubjectCharacteristic,
  type EvidenceReportRelatesTo,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactDetailSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  narrativeSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  relatedArtifactSchema,
  stringSchema,
  uriSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  evidenceReportRelatesToCodeSchema,
  publicationStatusSchema,
  sectionModeSchema,
} from '../valueSets/index.js'

const evidenceReportSubjectCharacteristicSchema: ZodType<EvidenceReportSubjectCharacteristic> =
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    valueReference: referenceSchema.optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueRange: rangeSchema.optional(),
    exclude: booleanSchema.optional(),
    _exclude: elementSchema.optional(),
    period: periodSchema.optional(),
  })

const evidenceReportSubjectSchema: ZodType<EvidenceReportSubject> =
  backboneElementSchema.extend({
    characteristic: evidenceReportSubjectCharacteristicSchema
      .array()
      .optional(),
    note: annotationSchema.array().optional(),
  })

const evidenceReportSectionSchema: ZodType<EvidenceReportSection> =
  backboneElementSchema.extend({
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    focus: codeableConceptSchema.optional(),
    focusReference: referenceSchema.optional(),
    author: referenceSchema.array().optional(),
    text: narrativeSchema.optional(),
    mode: sectionModeSchema.optional(),
    _mode: elementSchema.optional(),
    orderedBy: codeableConceptSchema.optional(),
    entryClassifier: codeableConceptSchema.array().optional(),
    entryReference: referenceSchema.array().optional(),
    entryQuantity: quantitySchema.array().optional(),
    emptyReason: codeableConceptSchema.optional(),
    get section() {
      return evidenceReportSectionSchema.array().optional()
    },
  })

const evidenceReportRelatesToSchema: ZodType<EvidenceReportRelatesTo> =
  backboneElementSchema.extend({
    code: evidenceReportRelatesToCodeSchema,
    _code: elementSchema.optional(),
    targetIdentifier: identifierSchema.optional(),
    targetReference: referenceSchema.optional(),
  })

/**
 * Zod schema for FHIR EvidenceReport resource (untyped version).
 */
export const untypedEvidenceReportSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('EvidenceReport').readonly(),
    url: uriSchema.optional(),
    _url: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    identifier: identifierSchema.array().optional(),
    relatedIdentifier: identifierSchema.array().optional(),
    citeAsReference: referenceSchema.optional(),
    citeAsMarkdown: markdownSchema.optional(),
    _citeAsMarkdown: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    note: annotationSchema.array().optional(),
    relatedArtifact: relatedArtifactSchema.array().optional(),
    subject: evidenceReportSubjectSchema,
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    author: contactDetailSchema.array().optional(),
    editor: contactDetailSchema.array().optional(),
    reviewer: contactDetailSchema.array().optional(),
    endorser: contactDetailSchema.array().optional(),
    relatesTo: evidenceReportRelatesToSchema.array().optional(),
    section: evidenceReportSectionSchema.array().optional(),
  }),
) satisfies ZodType<EvidenceReport>

/**
 * Zod schema for FHIR EvidenceReport resource.
 */
export const evidenceReportSchema: ZodType<EvidenceReport> =
  untypedEvidenceReportSchema

/**
 * Wrapper class for FHIR EvidenceReport resources.
 * Provides utility methods for working with evidence reports that compile and present research findings.
 */
export class FhirEvidenceReport extends FhirDomainResource<EvidenceReport> {
  // Static Functions

  /**
   * Parses an EvidenceReport resource from unknown data.
   *
   * @param value - The data to parse and validate against the EvidenceReport schema
   * @returns A FhirEvidenceReport instance containing the validated resource
   */
  public static parse(value: unknown): FhirEvidenceReport {
    return new FhirEvidenceReport(evidenceReportSchema.parse(value))
  }
}
