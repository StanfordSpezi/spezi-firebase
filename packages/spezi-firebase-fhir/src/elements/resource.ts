//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Resource } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import {
  codeSchema,
  stringSchema,
  uriSchema,
} from './dataTypes/primitiveTypes.js'
import { metaSchema } from './meta.js'

export const resourceSchema = z.object({
  resourceType: stringSchema,
  id: stringSchema.optional(),
  meta: metaSchema.optional(),
  implicitRules: uriSchema.optional(),
  language: codeSchema.optional(),
}) satisfies ZodType<Resource>
