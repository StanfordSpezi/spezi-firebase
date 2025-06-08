//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Schema } from '@stanfordspezi/spezi-firebase-utils'
import { backBoneElementSchema } from './backBoneElement.js'
import { z } from 'zod'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { quantitySchema } from '../dataTypes/quantity.js'
import { ratioSchema } from '../dataTypes/ratio.js'
import { timingSchema } from '../dataTypes/timing.js'

export const dosageSchema = backBoneElementSchema.extend({
  sequence: Schema.simple(z.number().int()).optionalish(),
  text: Schema.simple(z.string()).optionalish(),
  additionalInstruction: codeableConceptSchema.array().optionalish(),
  patientInstruction: Schema.simple(z.string()).optionalish(),
  timing: timingSchema.optionalish(),
  asNeededBoolean: Schema.simple(z.boolean()).optionalish(),
  asNeededCodeableConcept: codeableConceptSchema.optionalish(),
  site: codeableConceptSchema.optionalish(),
  route: codeableConceptSchema.optionalish(),
  method: codeableConceptSchema.optionalish(),
  // TODO: doseAndRate
  maxDosePerPeriod: ratioSchema.optionalish(),
  maxDosePerAdministration: quantitySchema.optionalish(),
  maxDosePerLifetime: quantitySchema.optionalish(),
})
