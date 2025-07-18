//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Dosage } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { backboneElementSchema } from './backBoneElement.js'
import { codeableConceptSchema } from './dataTypes/codeableConcept.js'
import { quantitySchema } from './dataTypes/quantity.js'
import { ratioSchema } from './dataTypes/ratio.js'
import { timingSchema } from './dataTypes/timing.js'
import { elementSchema } from './element.js'

export const dosageSchema: ZodType<Dosage> = z.lazy(() =>
  backboneElementSchema.extend({
    sequence: z.number().int().optional(),
    text: z.string().optional(),
    _text: elementSchema.optional(),
    additionalInstruction: codeableConceptSchema.array().optional(),
    patientInstruction: z.string().optional(),
    _patientInstruction: elementSchema.optional(),
    timing: timingSchema.optional(),
    asNeededBoolean: z.boolean().optional(),
    _asNeededBoolean: elementSchema.optional(),
    asNeededCodeableConcept: codeableConceptSchema.optional(),
    site: codeableConceptSchema.optional(),
    route: codeableConceptSchema.optional(),
    method: codeableConceptSchema.optional(),
    doseAndRate: elementSchema
      .extend({
        type: codeableConceptSchema.optional(),
        doseQuantity: quantitySchema.optional(),
        rateRatio: ratioSchema.optional(),
        rateRange: z
          .object({
            low: quantitySchema.optional(),
            high: quantitySchema.optional(),
          })
          .optional(),
      })
      .array()
      .optional(),
  }),
)
