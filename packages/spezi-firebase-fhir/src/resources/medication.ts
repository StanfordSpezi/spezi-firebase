//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Medication } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

export const medicationStatusSchema = z.enum([
  'active',
  'inactive',
  'entered-in-error',
])

export const untypedMedicationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Medication').readonly(),
    identifier: identifierSchema.array().optional(),
    code: codeableConceptSchema.optional(),
    status: medicationStatusSchema,
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
    batch: elementSchema.extend({
      lotNumber: stringSchema.optional(),
      _lotNumber: elementSchema.optional(),
      expirationDate: dateTimeSchema.optional(),
      _expirationDate: elementSchema.optional(),
    }),
  }),
) satisfies ZodType<Medication>

export const medicationSchema: ZodType<Medication> = untypedMedicationSchema
