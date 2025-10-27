//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Media } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  domainResourceSchema,
} from '../elements/index.js'

export const untypedMediaSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Media').readonly(),
  }).passthrough(),
)

export const mediaSchema = untypedMediaSchema

export class FhirMedia extends FhirDomainResource<Media> {
  // Static Functions

  public static parse(value: unknown): FhirMedia {
    const parsed = mediaSchema.parse(value)
    return new FhirMedia(parsed as unknown as Media)
  }
}
