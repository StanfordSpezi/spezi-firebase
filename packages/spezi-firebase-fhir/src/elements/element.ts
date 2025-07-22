//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Element } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { stringSchema } from './dataTypes/primitiveTypes.js'
import { extensionSchema } from './extension.js'

export const elementSchema = z.object({
  id: stringSchema.optional(),
  get _id() {
    const schema = elementSchema as ZodType<Element>
    return schema.optional()
  },
  extension: extensionSchema.array().optional(),
}) satisfies ZodType<Element>
