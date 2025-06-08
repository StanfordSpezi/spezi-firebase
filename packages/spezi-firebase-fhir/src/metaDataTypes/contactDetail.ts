//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { elementSchema } from '../elements/element.js'
import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { contactPointSchema } from '../dataTypes/contactPoint.js'

export const contactDetailSchema = elementSchema.extend({
  name: optionalish(Schema.simple(z.string())),
  telecom: optionalish(contactPointSchema.array()),
})
