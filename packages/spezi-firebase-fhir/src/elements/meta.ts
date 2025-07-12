//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import { uriSchema } from './primitiveTypes/primitiveTypes.js'
import { instantSchema } from './primitiveTypes/instant.js'
import { codingSchema } from './dataTypes/coding.js'
import { elementSchema } from './element.js'
import { Meta } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

export const metaSchema: ZodType<Meta> = z.lazy(() =>
  elementSchema.extend({
    versionId: z.string().optional(),
    lastUpdated: instantSchema.optional(),
    source: uriSchema.optional(),
    profile: uriSchema.array().optional(),
    security: codingSchema.array().optional(),
    tag: codingSchema.array().optional(),
  }),
)

type _Assert = AssertOutput<typeof metaSchema, Meta>
type _AssertFull = AssertOutputFull<typeof metaSchema, Meta>
