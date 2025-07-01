//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import { z } from 'zod/v4'
import { markdownSchema } from '../primitiveTypes/primitiveTypes.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { referenceBackwardSchema, referenceForwardSchema } from './reference.js'

export type AnnotationDto = z.input<typeof annotationForwardSchema>
export type Annotation = z.output<typeof annotationForwardSchema>

export const annotationForwardSchema = elementForwardSchema.extend({
  authorReference: optionalish(referenceForwardSchema),
  authorString: optionalish(z.string()),
  time: optionalish(dateTimeSchema.forward),
  text: markdownSchema.forward,
})

export const annotationBackwardSchema = elementBackwardSchema.extend({
  authorReference: optionalish(referenceBackwardSchema),
  authorString: optionalish(z.string()),
  time: optionalish(dateTimeSchema.forward),
  text: markdownSchema.forward,
})
