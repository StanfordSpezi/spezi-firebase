//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type VisionPrescription,
  type VisionPrescriptionLensSpecification,
  type VisionPrescriptionLensSpecificationPrism,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  visionBaseSchema,
  visionEyesSchema,
  visionPrescriptionStatusSchema,
} from '../valueSets/index.js'

const visionPrescriptionLensSpecificationPrismSchema: ZodType<VisionPrescriptionLensSpecificationPrism> =
  backboneElementSchema.extend({
    amount: decimalSchema,
    _amount: elementSchema.optional(),
    base: visionBaseSchema,
    _base: elementSchema.optional(),
  })

const visionPrescriptionLensSpecificationSchema: ZodType<VisionPrescriptionLensSpecification> =
  backboneElementSchema.extend({
    product: codeableConceptSchema,
    eye: visionEyesSchema,
    _eye: elementSchema.optional(),
    sphere: decimalSchema.optional(),
    _sphere: elementSchema.optional(),
    cylinder: decimalSchema.optional(),
    _cylinder: elementSchema.optional(),
    axis: intSchema.optional(),
    _axis: elementSchema.optional(),
    prism: visionPrescriptionLensSpecificationPrismSchema.array().optional(),
    add: decimalSchema.optional(),
    _add: elementSchema.optional(),
    power: decimalSchema.optional(),
    _power: elementSchema.optional(),
    backCurve: decimalSchema.optional(),
    _backCurve: elementSchema.optional(),
    diameter: decimalSchema.optional(),
    _diameter: elementSchema.optional(),
    duration: quantitySchema.optional(),
    color: stringSchema.optional(),
    _color: elementSchema.optional(),
    brand: stringSchema.optional(),
    _brand: elementSchema.optional(),
    note: annotationSchema.array().optional(),
  })

export const untypedVisionPrescriptionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('VisionPrescription').readonly(),
    identifier: identifierSchema.array().optional(),
    status: visionPrescriptionStatusSchema,
    _status: elementSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    patient: referenceSchema,
    encounter: referenceSchema.optional(),
    dateWritten: dateTimeSchema,
    _dateWritten: elementSchema.optional(),
    prescriber: referenceSchema,
    lensSpecification: visionPrescriptionLensSpecificationSchema.array().min(1),
  }),
) satisfies ZodType<VisionPrescription>

export const visionPrescriptionSchema: ZodType<VisionPrescription> =
  untypedVisionPrescriptionSchema

export class FhirVisionPrescription extends FhirDomainResource<VisionPrescription> {
  // Static Functions

  public static parse(value: unknown): FhirVisionPrescription {
    return new FhirVisionPrescription(visionPrescriptionSchema.parse(value))
  }
}
