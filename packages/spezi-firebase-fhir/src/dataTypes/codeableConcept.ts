//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Schema } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod'
import { codingSchema } from './coding.js'
import { elementSchema } from '../elements/element.js'

export const codeableConceptSchema = elementSchema.extend({
  coding: codingSchema.array().optionalish(),
  text: Schema.simple(z.string()).optionalish(),
})
