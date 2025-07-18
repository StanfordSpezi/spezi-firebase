//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CodeableConcept } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { codingSchema } from './coding.js'
import { elementSchema } from '../element.js'

export const codeableConceptSchema: ZodType<CodeableConcept> = z.lazy(() =>
  elementSchema.extend({
    coding: codingSchema.array().optional(),
    _coding: elementSchema.optional(),
    text: z.string().optional(),
    _text: elementSchema.optional(),
  }),
)
