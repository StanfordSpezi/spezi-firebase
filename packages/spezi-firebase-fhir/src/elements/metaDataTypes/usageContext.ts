//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { codingSchema } from '../dataTypes/coding.js'
import { elementSchema } from '../element.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { referenceSchema } from '../dataTypes/reference.js'
import { quantitySchema } from '../dataTypes/quantity.js'
import { rangeSchema } from '../dataTypes/range.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { UsageContext } from 'fhir/r4b.js'

export const usageContextSchema = elementSchema.extend({
  code: codingSchema,
  valueCodeableConcept: codeableConceptSchema.optional(),
  valueQuantity: quantitySchema.optional(),
  valueRange: rangeSchema.optional(),
  valueReference: referenceSchema.optional(),
})

type _Assert = AssertOutput<typeof usageContextSchema, UsageContext>
type _AssertFull = AssertOutputFull<typeof usageContextSchema, UsageContext>
