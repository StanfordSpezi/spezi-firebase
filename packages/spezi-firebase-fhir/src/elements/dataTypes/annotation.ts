//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { markdownSchema } from '../primitiveTypes/primitiveTypes.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { referenceSchema } from './reference.js'
import { Annotation } from 'fhir/r4b.js'
import { elementSchema } from '../element.js'
import { AssertOutput, AssertOutputFull } from '@stanfordspezi/spezi-firebase-utils'

export const annotationSchema = elementSchema.extend({
  authorReference: referenceSchema.optional(),
  authorString: z.string().optional(),
  _authorString: elementSchema.optional(),
  time: dateTimeSchema.optional(),
  _time: elementSchema.optional(),
  text: markdownSchema,
  _text: elementSchema.optional(),
})

type _Assert = AssertOutput<typeof annotationSchema, Annotation>
type _AssertFull = AssertOutputFull<typeof annotationSchema, Annotation>
