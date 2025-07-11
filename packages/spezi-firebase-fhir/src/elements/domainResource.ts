//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { extensionSchema } from './extension.js'
import { elementSchema } from './element.js'
import { z } from 'zod/v4'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { DomainResource } from 'fhir/r4b.js'
import { narrativeSchema } from './index.js'

export const domainResourceSchema = elementSchema.extend({
  resourceType: z.string().readonly(),
  text: narrativeSchema.optional(),
  // contained: resourceSchema.array().optional(),
  // extension: extensionSchema.array().optional(),
  modifierExtension: extensionSchema.array().optional(),
})

type _Assert = AssertOutput<typeof domainResourceSchema, DomainResource>
type _AssertFull = AssertOutputFull<typeof domainResourceSchema, DomainResource>
