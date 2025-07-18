//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ParameterDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'

const parameterDefinitionUse = ['in', 'out'] as const

export const parameterDefinitionSchema: ZodType<ParameterDefinition> = z.lazy(
  () =>
    elementSchema.extend({
      name: z.string().optional(),
      _name: elementSchema.optional(),
      use: z.enum(parameterDefinitionUse),
      _use: elementSchema.optional(),
      min: z.number().int().optional(),
      max: z
        .string()
        .regex(/^\d+|\*$/)
        .optional(),
      _max: elementSchema.optional(),
      documentation: z.string().optional(),
      _documentation: elementSchema.optional(),
      type: codeSchema,
      _type: elementSchema.optional(),
      profile: z.string().optional(),
      _profile: elementSchema.optional(),
    }),
)
