//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { elementForwardSchema } from '../elements/element.js'
import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { contactPointSchema } from '../dataTypes/contactPoint.js'

export const contactDetailSchema = elementForwardSchema.extend({
  name: optionalish(z.string()),
  telecom: optionalish(contactPointSchema.array()),
})
