//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import { codingSchema } from './coding.js'
import { CodeableConcept } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

export const codeableConceptSchema: ZodType<CodeableConcept> = z.lazy(() =>
  elementSchema.extend({
    coding: codingSchema.array().optional(),
    text: z.string().optional(),
  }),
)

type _Assert = AssertOutput<typeof codeableConceptSchema, CodeableConcept>
type _AssertFull = AssertOutputFull<
  typeof codeableConceptSchema,
  CodeableConcept
>
