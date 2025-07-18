//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Annotation } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { referenceSchema } from './reference.js'
import { elementSchema } from '../element.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { markdownSchema } from '../primitiveTypes/primitiveTypes.js'

export const annotationSchema: ZodType<Annotation> = z.lazy(() =>
  elementSchema.extend({
    authorReference: referenceSchema.optional(),
    authorString: z.string().optional(),
    _authorString: elementSchema.optional(),
    time: dateTimeSchema.optional(),
    _time: elementSchema.optional(),
    text: markdownSchema,
    _text: elementSchema.optional(),
  }),
)
