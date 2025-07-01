//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { backBoneElementForwardSchema } from './backBoneElement.js'
import { z } from 'zod/v4'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { quantitySchema } from '../dataTypes/quantity.js'
import { ratioSchema } from '../dataTypes/ratio.js'
import { timingSchema } from '../dataTypes/timing.js'

export const dosageSchema = backBoneElementForwardSchema.extend({
  sequence: optionalish(z.number().int()),
  text: optionalish(z.string()),
  additionalInstruction: optionalish(codeableConceptSchema.array()),
  patientInstruction: optionalish(z.string()),
  timing: optionalish(timingSchema.forward),
  asNeededBoolean: optionalish(z.boolean()),
  asNeededCodeableConcept: optionalish(codeableConceptSchema),
  site: optionalish(codeableConceptSchema),
  route: optionalish(codeableConceptSchema),
  method: optionalish(codeableConceptSchema),
  // TODO: doseAndRate
  maxDosePerPeriod: optionalish(ratioSchema),
  maxDosePerAdministration: optionalish(quantitySchema),
  maxDosePerLifetime: optionalish(quantitySchema),
})
