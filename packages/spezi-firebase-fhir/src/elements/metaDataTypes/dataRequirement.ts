//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { elementSchema } from '../element.js'
import {
  codeSchema,
  positiveIntSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { referenceSchema } from '../dataTypes/reference.js'
import { periodSchema } from '../dataTypes/period.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { codingSchema } from '../dataTypes/coding.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import path from 'path'
import { DataRequirement } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

export const dataRequirementSchema = elementSchema.extend({
  type: codeSchema,
  profile: z.string().array().optional(),
  subjectCodeableConcept: codeableConceptSchema.optional(),
  subjectReference: referenceSchema.optional(),
  mustSupport: z.string().array().optional(),
  codeFilter: z
    .object({
      path: z.string().optional(),
      searchParam: z.string().optional(),
      valueSet: z.string().optional(),
      code: codingSchema.array().optional(),
    })
    .array()
    .optional(),
  dateFilter: z
    .object({
      path: z.string().optional(),
      searchParam: z.string().optional(),
      valueDateTime: dateTimeSchema.optional(),
      valuePeriod: periodSchema.optional(),
    })
    .array()
    .optional(),
  limit: positiveIntSchema.optional(),
  sort: z.object({ path: z.string(), direction: codeSchema }).array().optional,
})

type _Assert = AssertOutput<typeof dataRequirementSchema, DataRequirement>
type _AssertFull = AssertOutputFull<
  typeof dataRequirementSchema,
  DataRequirement
>
