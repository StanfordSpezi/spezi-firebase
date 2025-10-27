//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DocumentManifest } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedDocumentManifestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DocumentManifest').readonly(),
  }).passthrough(),
)

export const documentManifestSchema = untypedDocumentManifestSchema

export class FhirDocumentManifest extends FhirDomainResource<DocumentManifest> {
  // Static Functions

  public static parse(value: unknown): FhirDocumentManifest {
    const parsed = documentManifestSchema.parse(value)
    return new FhirDocumentManifest(parsed as unknown as DocumentManifest)
  }
}
