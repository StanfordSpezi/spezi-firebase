//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { metaSchema } from './meta.js'
import { codeSchema, uriSchema } from './primitiveTypes/primitiveTypes.js'
import { AssertOutput } from '@stanfordspezi/spezi-firebase-utils'
import { Resource } from 'fhir/r4b.js'

export const resourceSchema = z.object({
  resourceType: z.string(),
  id: z.string().optional(),
  meta: metaSchema.optional(),
  implicitRules: uriSchema.optional(),
  language: codeSchema.optional(),
})

type _Assert = AssertOutput<typeof resourceSchema, Resource>
