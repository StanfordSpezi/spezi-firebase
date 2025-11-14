//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type CodeableReference } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { codeableConceptSchema } from './codeableConcept.js'
import { referenceSchema } from './reference.js'
import { elementSchema } from '../element.js'

/**
 * Zod schema for FHIR CodeableReference data type.
 */
export const codeableReferenceSchema: ZodType<CodeableReference> = z.lazy(() =>
  elementSchema.extend({
    concept: codeableConceptSchema.optional(),
    reference: referenceSchema.optional(),
  }),
)
