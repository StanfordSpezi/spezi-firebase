//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Meta } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { codingSchema } from './dataTypes/coding.js'
import {
  idSchema,
  instantSchema,
  uriSchema,
} from './dataTypes/primitiveTypes.js'
import { elementSchema } from './element.js'

export const metaSchema: ZodType<Meta> = z.lazy(() =>
  elementSchema.extend({
    versionId: idSchema.optional(),
    _versionId: elementSchema.optional(),
    lastUpdated: instantSchema.optional(),
    _lastUpdated: elementSchema.optional(),
    source: uriSchema.optional(),
    _source: elementSchema.optional(),
    profile: uriSchema.array().optional(),
    _profile: elementSchema.array().optional(),
    security: codingSchema.array().optional(),
    tag: codingSchema.array().optional(),
  }),
)
