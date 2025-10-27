//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Specimen } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { specimenStatusSchema } from '../valueSets/index.js'

export const untypedSpecimenSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Specimen').readonly(),
    identifier: identifierSchema.array().optional(),
    accessionIdentifier: identifierSchema.optional(),
    status: specimenStatusSchema.optional(),
    _status: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    receivedTime: dateTimeSchema.optional(),
    _receivedTime: elementSchema.optional(),
    parent: referenceSchema.array().optional(),
    request: referenceSchema.array().optional(),
    collection: backboneElementSchema
      .extend({
        collector: referenceSchema.optional(),
        collectedDateTime: dateTimeSchema.optional(),
        _collectedDateTime: elementSchema.optional(),
        collectedPeriod: periodSchema.optional(),
        duration: quantitySchema.optional(),
        quantity: quantitySchema.optional(),
        method: codeableConceptSchema.optional(),
        bodySite: codeableConceptSchema.optional(),
        fastingStatusCodeableConcept: codeableConceptSchema.optional(),
        fastingStatusDuration: quantitySchema.optional(),
      })
      .optional(),
    processing: backboneElementSchema
      .extend({
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        procedure: codeableConceptSchema.optional(),
        additive: referenceSchema.array().optional(),
        timeDateTime: dateTimeSchema.optional(),
        _timeDateTime: elementSchema.optional(),
        timePeriod: periodSchema.optional(),
      })
      .array()
      .optional(),
    container: backboneElementSchema
      .extend({
        identifier: identifierSchema.array().optional(),
        description: stringSchema.optional(),
        type: codeableConceptSchema.optional(),
        capacity: quantitySchema.optional(),
        specimenQuantity: quantitySchema.optional(),
        additiveCodeableConcept: codeableConceptSchema.optional(),
        additiveReference: referenceSchema.optional(),
      })
      .array()
      .optional(),
    condition: codeableConceptSchema.array().optional(),
    note: annotationSchema.array().optional(),
  }),
)

export const specimenSchema = untypedSpecimenSchema

export class FhirSpecimen extends FhirDomainResource<Specimen> {
  // Static Functions

  public static parse(value: unknown): FhirSpecimen {
    return new FhirSpecimen(specimenSchema.parse(value))
  }
}
