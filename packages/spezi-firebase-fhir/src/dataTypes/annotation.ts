//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Schema } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from '../elements/element.js'
import { referenceSchema } from './reference.js'
import { z } from 'zod'
import { markdownSchema } from '../primitiveTypes/primitiveTypes.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

export const annotationSchema = elementSchema.extend({
  authorReference: referenceSchema.optionalish(),
  authorString: Schema.simple(z.string()).optionalish(),
  time: dateTimeSchema.optionalish(),
  text: markdownSchema,
})
