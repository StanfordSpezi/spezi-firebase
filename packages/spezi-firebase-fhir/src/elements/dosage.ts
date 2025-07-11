//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { backboneElementSchema } from './backBoneElement.js'
import { z } from 'zod/v4'
import { timingSchema } from './dataTypes/timing.js'
import { codeableConceptSchema } from './dataTypes/codeableConcept.js'
import { ratioSchema } from './dataTypes/ratio.js'
import { quantitySchema } from './dataTypes/quantity.js'
import { Dosage } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

export const dosageSchema = backboneElementSchema.extend({
  sequence: z.number().int().optional(),
  text: z.string().optional(),
  additionalInstruction: codeableConceptSchema.array().optional(),
  patientInstruction: z.string().optional(),
  timing: timingSchema.optional(),
  asNeededBoolean: z.boolean().optional(),
  asNeededCodeableConcept: codeableConceptSchema.optional(),
  site: codeableConceptSchema.optional(),
  route: codeableConceptSchema.optional(),
  method: codeableConceptSchema.optional(),
  doseAndRate: z
    .object({
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
})

type _Assert = AssertOutput<typeof dosageSchema, Dosage>
type _AssertFull = AssertOutputFull<typeof dosageSchema, Dosage>
