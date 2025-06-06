//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { backBoneElementSchema } from './backboneElement.js'
import { z } from 'zod'
import { codeableConceptSchema } from './codeableConcept.js'
import { quantitySchema } from './quantity.js'
import { ratioSchema } from './ratio.js'
import { timingSchema } from './timing.js'

export const dosageSchema = backBoneElementSchema.extend({
  sequence: optionalish(z.number().int()),
  text: optionalish(z.string()),
  additionalInstruction: optionalish(codeableConceptSchema.array()),
  patientInstruction: optionalish(z.string()),
  timing: optionalish(timingSchema),
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
