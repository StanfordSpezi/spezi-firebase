//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Media } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  attachmentSchema,
  codeableConceptSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  intSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { mediaStatusSchema } from '../valueSets/index.js'

export const untypedMediaSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Media').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: mediaStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    modality: codeableConceptSchema.optional(),
    view: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    createdDateTime: dateTimeSchema.optional(),
    _createdDateTime: elementSchema.optional(),
    createdPeriod: periodSchema.optional(),
    issued: instantSchema.optional(),
    _issued: elementSchema.optional(),
    operator: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    bodySite: codeableConceptSchema.optional(),
    deviceName: stringSchema.optional(),
    _deviceName: elementSchema.optional(),
    device: referenceSchema.optional(),
    height: intSchema.optional(),
    width: intSchema.optional(),
    frames: intSchema.optional(),
    duration: decimalSchema.optional(),
    content: attachmentSchema,
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<Media>

export const mediaSchema: ZodType<Media> = untypedMediaSchema

export class FhirMedia extends FhirDomainResource<Media> {
  // Static Functions

  public static parse(value: unknown): FhirMedia {
    return new FhirMedia(mediaSchema.parse(value))
  }
}
