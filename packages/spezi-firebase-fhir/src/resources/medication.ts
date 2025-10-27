//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Medication } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  medicationStatusSchema,
} from '../valueSets/index.js'

export const untypedMedicationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Medication').readonly(),
    identifier: identifierSchema.array().optional(),
    code: codeableConceptSchema.optional(),
    status: medicationStatusSchema.optional(),
    _status: elementSchema.optional(),
    manufacturer: referenceSchema.optional(),
    form: codeableConceptSchema.optional(),
    amount: quantitySchema.optional(),
    ingredient: backboneElementSchema
      .extend({
        itemCodeableConcept: codeableConceptSchema.optional(),
        itemReference: referenceSchema.optional(),
        isActive: booleanSchema.optional(),
        _isActive: elementSchema.optional(),
        strength: ratioSchema.optional(),
      })
      .array()
      .optional(),
    batch: elementSchema
      .extend({
        lotNumber: stringSchema.optional(),
        _lotNumber: elementSchema.optional(),
        expirationDate: dateTimeSchema.optional(),
        _expirationDate: elementSchema.optional(),
      })
      .optional(),
  }),
) satisfies ZodType<Medication>

export const medicationSchema: ZodType<Medication> = untypedMedicationSchema

export class FhirMedication extends FhirDomainResource<Medication> {
  // Static Functions

  public static parse(value: unknown): FhirMedication {
    return new FhirMedication(medicationSchema.parse(value))
  }
}
