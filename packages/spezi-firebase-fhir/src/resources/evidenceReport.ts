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
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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

const evidenceReportSubjectSchema: ZodType<EvidenceReportSubject> =
  backboneElementSchema.extend({
    characteristic: backboneElementSchema
      .extend({
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
    relatesTo: backboneElementSchema
      .extend({
        code: evidenceReportRelatesToCodeSchema,
        _code: elementSchema.optional(),
        targetIdentifier: identifierSchema.optional(),
        targetReference: referenceSchema.optional(),
      })
      .array()
      .optional(),
    section: evidenceReportSectionSchema.array().optional(),
  }),
) satisfies ZodType<EvidenceReport>

export const evidenceReportSchema: ZodType<EvidenceReport> =
  untypedEvidenceReportSchema

export class FhirEvidenceReport extends FhirDomainResource<EvidenceReport> {
  // Static Functions

  public static parse(value: unknown): FhirEvidenceReport {
    return new FhirEvidenceReport(evidenceReportSchema.parse(value))
  }
}
