//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import { elementSchema } from '../element.js'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'
import { referenceSchema } from '../dataTypes/reference.js'
import { timingSchema } from '../dataTypes/timing.js'
import { dateSchema } from '../primitiveTypes/date.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { expressionSchema } from './expression.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { TriggerDefinition } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'

const triggerDefinitionType = [
  'named-event',
  'periodic',
  'data-changed',
  'data-added',
  'data-modified',
  'data-removed',
  'data-accessed',
  'data-access-ended',
] as const

export const triggerDefinitionSchema: ZodType<TriggerDefinition> = z.lazy(() =>
  elementSchema.extend({
    type: z.enum(triggerDefinitionType),
    name: z.string().optional(),
    code: codeableConceptSchema.optional(),
    subscriptionTopic: z.string().optional(),
    timingTiming: timingSchema.optional(),
    timingReference: referenceSchema.optional(),
    timingDate: dateSchema.optional(),
    timingDateTime: dateTimeSchema.optional(),
    // data: dataRequirementSchema.array().optional(),
    condition: expressionSchema.optional(),
  }),
)

type _Assert = AssertOutput<typeof triggerDefinitionSchema, TriggerDefinition>
type _AssertFull = AssertOutputFull<
  typeof triggerDefinitionSchema,
  TriggerDefinition
>
