//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { DocumentReference } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedDocumentReferenceSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('DocumentReference').readonly(),
    })
    .passthrough(),
)

export const documentReferenceSchema = untypedDocumentReferenceSchema

export class FhirDocumentReference extends FhirDomainResource<DocumentReference> {
  // Static Functions

  public static parse(value: unknown): FhirDocumentReference {
    const parsed = documentReferenceSchema.parse(value)
    return new FhirDocumentReference(parsed as unknown as DocumentReference)
  }
}
