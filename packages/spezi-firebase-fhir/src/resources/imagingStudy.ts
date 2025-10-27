//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ImagingStudy } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  codingSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  idSchema,
  referenceSchema,
  stringSchema,
  unsignedIntSchema,
} from '../elements/index.js'
import { imagingStudyStatusSchema } from '../valueSets/index.js'

export const untypedImagingStudySchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ImagingStudy').readonly(),
    identifier: identifierSchema.array().optional(),
    status: imagingStudyStatusSchema,
    _status: elementSchema.optional(),
    modality: codingSchema.array().optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    started: dateTimeSchema.optional(),
    _started: elementSchema.optional(),
    basedOn: referenceSchema.array().optional(),
    referrer: referenceSchema.optional(),
    interpreter: referenceSchema.array().optional(),
    endpoint: referenceSchema.array().optional(),
    numberOfSeries: unsignedIntSchema.optional(),
    numberOfInstances: unsignedIntSchema.optional(),
    procedureReference: referenceSchema.optional(),
    procedureCode: codeableConceptSchema.array().optional(),
    location: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    series: backboneElementSchema
      .extend({
        uid: idSchema,
        _uid: elementSchema.optional(),
        number: unsignedIntSchema.optional(),
        modality: codingSchema,
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        numberOfInstances: unsignedIntSchema.optional(),
        endpoint: referenceSchema.array().optional(),
        bodySite: codingSchema.optional(),
        laterality: codingSchema.optional(),
        specimen: referenceSchema.array().optional(),
        started: dateTimeSchema.optional(),
        _started: elementSchema.optional(),
        performer: backboneElementSchema
          .extend({
            function: codeableConceptSchema.optional(),
            actor: referenceSchema,
          })
          .array()
          .optional(),
        instance: backboneElementSchema
          .extend({
            uid: idSchema,
            _uid: elementSchema.optional(),
            sopClass: codingSchema,
            number: unsignedIntSchema.optional(),
            title: stringSchema.optional(),
            _title: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<ImagingStudy>

export const imagingStudySchema: ZodType<ImagingStudy> =
  untypedImagingStudySchema

export class FhirImagingStudy extends FhirDomainResource<ImagingStudy> {
  // Static Functions

  public static parse(value: unknown): FhirImagingStudy {
    return new FhirImagingStudy(imagingStudySchema.parse(value))
  }
}
