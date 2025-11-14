//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type UsageContext } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { codingSchema } from '../dataTypes/coding.js'
import { quantitySchema } from '../dataTypes/quantity.js'
import { rangeSchema } from '../dataTypes/range.js'
import { referenceSchema } from '../dataTypes/reference.js'
import { elementSchema } from '../element.js'

/**
 * Zod schema for FHIR UsageContext data type.
 */
export const usageContextSchema: ZodType<UsageContext> = z.lazy(() =>
  elementSchema.extend({
    code: codingSchema,
    _code: elementSchema.optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueRange: rangeSchema.optional(),
    valueReference: referenceSchema.optional(),
  }),
)
