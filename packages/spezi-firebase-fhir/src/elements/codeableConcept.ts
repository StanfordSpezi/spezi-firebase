//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod'
import { codingSchema } from './coding.js'
import { elementSchema } from './element.js'

export const codeableConceptSchema = elementSchema.extend({
  coding: optionalish(codingSchema.array()),
  text: optionalish(z.string()),
})
