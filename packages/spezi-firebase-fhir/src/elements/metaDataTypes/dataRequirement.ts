//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DataRequirement } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { codingSchema } from '../dataTypes/coding.js'
import { periodSchema } from '../dataTypes/period.js'
import { referenceSchema } from '../dataTypes/reference.js'
import { elementSchema } from '../element.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import {
  codeSchema,
  positiveIntSchema,
} from '../primitiveTypes/primitiveTypes.js'

const sortDirection = ['ascending', 'descending'] as const

export const dataRequirementSchema: ZodType<DataRequirement> = z.lazy(() =>
  elementSchema.extend({
    type: codeSchema,
    _type: elementSchema.optional(),
    profile: z.string().array().optional(),
    _profile: elementSchema.array().optional(),
    subjectCodeableConcept: codeableConceptSchema.optional(),
    subjectReference: referenceSchema.optional(),
    mustSupport: z.string().array().optional(),
    _mustSupport: elementSchema.array().optional(),
    codeFilter: elementSchema
      .extend({
        path: z.string().optional(),
        searchParam: z.string().optional(),
        valueSet: z.string().optional(),
        code: codingSchema.array().optional(),
      })
      .array()
      .optional(),
    dateFilter: elementSchema
      .extend({
        path: z.string().optional(),
        searchParam: z.string().optional(),
        valueDateTime: dateTimeSchema.optional(),
        valuePeriod: periodSchema.optional(),
      })
      .array()
      .optional(),
    limit: positiveIntSchema.optional(),
    sort: elementSchema
      .extend({
        direction: z.enum(sortDirection),
        _direction: elementSchema.optional(),
        path: z.string(),
        _path: elementSchema.optional(),
      })
      .array(),
  }),
)
