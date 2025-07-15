//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { ParameterDefinition } from 'fhir/r4b.js'
import { z, ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

export const parameterDefinitionSchema: ZodType<ParameterDefinition> = z.lazy(
  () =>
    elementSchema.extend({
      name: z.string().optional(),
      use: z.enum(['in', 'out']),
      min: z.number().int().optional(),
      max: z
        .string()
        .regex(/^\d+|\*$/)
        .optional(),
      documentation: z.string().optional(),
      type: codeSchema,
      profile: z.string().optional(),
    }),
)

type _Assert = AssertOutput<
  typeof parameterDefinitionSchema,
  ParameterDefinition
>
type _AssertFull = AssertOutputFull<
  typeof parameterDefinitionSchema,
  ParameterDefinition
>
