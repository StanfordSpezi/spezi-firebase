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
import { referenceBackwardSchema, referenceForwardSchema } from './reference.js'

export type AnnotationDto = z.input<typeof annotationForwardSchema>
export type Annotation = z.output<typeof annotationForwardSchema>

export const annotationForwardSchema = elementForwardSchema.extend({
  get authorReference() {
    return referenceForwardSchema.optional()
  },
  get authorString() {
    return z.string().optional()
  },
  get time() {
    return dateTimeSchema.forward.optional()
  },
  get text() {
    return markdownSchema.forward.optional()
  },
})

export const annotationBackwardSchema = elementBackwardSchema.extend({
  get authorReference() {
    return referenceBackwardSchema.optional()
  },
  get authorString() {
    return z.string().optional()
  },
  get time() {
    return dateTimeSchema.backward.optional()
  },
  get text() {
    return markdownSchema.backward.optional()
  },
})
