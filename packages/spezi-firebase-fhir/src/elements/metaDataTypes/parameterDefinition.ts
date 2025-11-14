//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ParameterDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import {
  codeSchema,
  intSchema,
  stringSchema,
} from '../dataTypes/primitiveTypes.js'
import { elementSchema } from '../element.js'

const parameterDefinitionUseSchema = z.enum(['in', 'out'])

/**
 * Zod schema for FHIR ParameterDefinition data type.
 */
export const parameterDefinitionSchema: ZodType<ParameterDefinition> = z.lazy(
  () =>
    elementSchema.extend({
      name: stringSchema.optional(),
      _name: elementSchema.optional(),
      use: parameterDefinitionUseSchema,
      _use: elementSchema.optional(),
      min: intSchema.optional(),
      max: z
        .string()
        .regex(/^\d+|\*$/)
        .optional(),
      _max: elementSchema.optional(),
      documentation: stringSchema.optional(),
      _documentation: elementSchema.optional(),
      type: codeSchema,
      _type: elementSchema.optional(),
      profile: stringSchema.optional(),
      _profile: elementSchema.optional(),
    }),
)
