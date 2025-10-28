//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type DocumentReference,
  type DocumentReferenceContent,
  type DocumentReferenceContext,
  type DocumentReferenceRelatesTo,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  attachmentSchema,
  backboneElementSchema,
  codeableConceptSchema,
  codingSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  documentReferenceDocStatusSchema,
  documentReferenceRelatesToCodeSchema,
  documentReferenceStatusSchema,
} from '../valueSets/index.js'

const documentReferenceRelatesToSchema: ZodType<DocumentReferenceRelatesTo> =
  z.lazy(() =>
    backboneElementSchema.extend({
      code: documentReferenceRelatesToCodeSchema,
      _code: elementSchema.optional(),
      target: referenceSchema,
    }),
  )

const documentReferenceContentSchema: ZodType<DocumentReferenceContent> =
  z.lazy(() =>
    backboneElementSchema.extend({
      attachment: attachmentSchema,
      format: codingSchema.optional(),
    }),
  )

const documentReferenceContextSchema: ZodType<DocumentReferenceContext> =
  z.lazy(() =>
    backboneElementSchema.extend({
      encounter: referenceSchema.array().optional(),
      event: codeableConceptSchema.array().optional(),
      period: periodSchema.optional(),
      facilityType: codeableConceptSchema.optional(),
      practiceSetting: codeableConceptSchema.optional(),
      sourcePatientInfo: referenceSchema.optional(),
      related: referenceSchema.array().optional(),
    }),
  )

export const untypedDocumentReferenceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DocumentReference').readonly(),
    masterIdentifier: identifierSchema.optional(),
    identifier: identifierSchema.array().optional(),
    status: documentReferenceStatusSchema,
    _status: elementSchema.optional(),
    docStatus: documentReferenceDocStatusSchema.optional(),
    _docStatus: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    subject: referenceSchema.optional(),
    date: instantSchema.optional(),
    _date: elementSchema.optional(),
    author: referenceSchema.array().optional(),
    authenticator: referenceSchema.optional(),
    custodian: referenceSchema.optional(),
    relatesTo: documentReferenceRelatesToSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    securityLabel: codeableConceptSchema.array().optional(),
    content: documentReferenceContentSchema.array(),
    context: documentReferenceContextSchema.optional(),
  }),
) satisfies ZodType<DocumentReference>

export const documentReferenceSchema: ZodType<DocumentReference> =
  untypedDocumentReferenceSchema

export class FhirDocumentReference extends FhirDomainResource<DocumentReference> {
  // Static Functions

  public static parse(value: unknown): FhirDocumentReference {
    return new FhirDocumentReference(documentReferenceSchema.parse(value))
  }
}
