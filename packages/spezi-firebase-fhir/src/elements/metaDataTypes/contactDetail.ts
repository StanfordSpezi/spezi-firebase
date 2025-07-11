//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { elementSchema } from '../element.js'
import { contactPointSchema } from '../dataTypes/contactPoint.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { ContactDetail } from 'fhir/r4b.js'

export const contactDetailSchema = elementSchema.extend({
  name: z.string().optional(),
  telecom: contactPointSchema.array().optional(),
})

type _Assert = AssertOutput<typeof contactDetailSchema, ContactDetail>
type _AssertFull = AssertOutputFull<typeof contactDetailSchema, ContactDetail>
