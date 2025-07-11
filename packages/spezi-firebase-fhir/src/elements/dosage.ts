//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  backBoneElementBackwardSchema,
  backBoneElementForwardSchema,
} from './backBoneElement.js'
import { z } from 'zod/v4'
import {
  timingBackwardSchema,
  timingForwardSchema,
} from '../dataTypes/timing.js'
import {
  codeableConceptBackwardSchema,
  codeableConceptForwardSchema,
} from '../dataTypes/codeableConcept.js'
import { ratioBackwardSchema, ratioForwardSchema } from '../dataTypes/ratio.js'
import {
  quantityBackwardSchema,
  quantityForwardSchema,
} from '../dataTypes/quantity.js'

export const dosageForwardSchema = backBoneElementForwardSchema.extend({
  get sequence() {
    return z.number().int().optional()
  },
  get text() {
    return z.string().optional()
  },
  get additionalInstruction() {
    return codeableConceptForwardSchema.array().optional()
  },
  get patientInstruction() {
    return z.string().optional()
  },
  get timing() {
    return timingForwardSchema.optional()
  },
  get asNeededBoolean() {
    return z.boolean().optional()
  },
  get asNeededCodeableConcept() {
    return codeableConceptForwardSchema.optional()
  },
  get site() {
    return codeableConceptForwardSchema.optional()
  },
  get route() {
    return codeableConceptForwardSchema.optional()
  },
  get method() {
    return codeableConceptForwardSchema.optional()
  },
  // TODO: doseAndRate
  get maxDosePerPeriod() {
    return ratioForwardSchema.optional()
  },
  get maxDosePerAdministration() {
    return quantityForwardSchema.optional()
  },
  get maxDosePerLifetime() {
    return quantityForwardSchema.optional()
  },
})

export const dosageBackwardSchema = backBoneElementBackwardSchema.extend({
  get sequence() {
    return z.number().int().optional()
  },
  get text() {
    return z.string().optional()
  },
  get additionalInstruction() {
    return codeableConceptBackwardSchema.array().optional()
  },
  get patientInstruction() {
    return z.string().optional()
  },
  get timing() {
    return timingBackwardSchema.optional()
  },
  get asNeededBoolean() {
    return z.boolean().optional()
  },
  get asNeededCodeableConcept() {
    return codeableConceptBackwardSchema.optional()
  },
  get site() {
    return codeableConceptBackwardSchema.optional()
  },
  get route() {
    return codeableConceptBackwardSchema.optional()
  },
  get method() {
    return codeableConceptBackwardSchema.optional()
  },
  // TODO: doseAndRate
  get maxDosePerPeriod() {
    return ratioBackwardSchema.optional()
  },
  get maxDosePerAdministration() {
    return quantityBackwardSchema.optional()
  },
  get maxDosePerLifetime() {
    return quantityBackwardSchema.optional()
  },
})
