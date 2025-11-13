//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ContactDetail } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { contactPointSchema } from '../dataTypes/contactPoint.js'
import { stringSchema } from '../dataTypes/primitiveTypes.js'
import { elementSchema } from '../element.js'

/**
 * Zod schema for FHIR ContactDetail data type.
 */
export const contactDetailSchema: ZodType<ContactDetail> = z.lazy(() =>
  elementSchema.extend({
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    telecom: contactPointSchema.array().optional(),
  }),
)
