//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Medication } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
} from '../elements/index.js'

export const medicationStatus = [
  'active',
  'inactive',
  'entered-in-error',
] as const

export const medicationSchema: ZodType<Medication> = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Medication').readonly(),
    identifier: identifierSchema.array().optional(),
    code: codeableConceptSchema.optional(),
    status: z.enum(medicationStatus),
    _status: elementSchema.optional(),
    manufacturer: referenceSchema.optional(),
    form: codeableConceptSchema.optional(),
    amount: quantitySchema.optional(),
    ingredient: backboneElementSchema
      .extend({
        itemCodeableConcept: codeableConceptSchema.optional(),
        itemReference: referenceSchema.optional(),
        isActive: z.boolean().optional(),
        _isActive: elementSchema.optional(),
        strength: ratioSchema.optional(),
      })
      .array()
      .optional(),
    batch: backboneElementSchema.extend({
      lotNumber: z.string().optional(),
      _lotNumber: elementSchema.optional(),
      expirationDate: z.string().optional(),
      _expirationDate: elementSchema.optional(),
    }),
  }),
)
