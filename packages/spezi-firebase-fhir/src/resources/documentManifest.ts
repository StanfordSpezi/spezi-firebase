//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type DocumentManifest,
  type DocumentManifestRelated,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import { documentManifestStatusSchema } from '../valueSets/index.js'

const documentManifestRelatedSchema: ZodType<DocumentManifestRelated> =
  backboneElementSchema.extend({
    identifier: identifierSchema.optional(),
    ref: referenceSchema.optional(),
  })

export const untypedDocumentManifestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DocumentManifest').readonly(),
    masterIdentifier: identifierSchema.optional(),
    identifier: identifierSchema.array().optional(),
    status: documentManifestStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    created: dateTimeSchema.optional(),
    _created: elementSchema.optional(),
    author: referenceSchema.array().optional(),
    recipient: referenceSchema.array().optional(),
    source: uriSchema.optional(),
    _source: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    content: referenceSchema.array(),
    related: documentManifestRelatedSchema.array().optional(),
  }),
) satisfies ZodType<DocumentManifest>

export const documentManifestSchema: ZodType<DocumentManifest> =
  untypedDocumentManifestSchema

export class FhirDocumentManifest extends FhirDomainResource<DocumentManifest> {
  // Static Functions

  public static parse(value: unknown): FhirDocumentManifest {
    return new FhirDocumentManifest(documentManifestSchema.parse(value))
  }
}
