//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type TriggerDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { dataRequirementSchema } from './dataRequirement.js'
import { expressionSchema } from './expression.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { referenceSchema } from '../dataTypes/reference.js'
import { timingSchema } from '../dataTypes/timing.js'
import { elementSchema } from '../element.js'
import { dateSchema } from '../primitiveTypes/date.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { codeSchema } from '../primitiveTypes/primitiveTypes.js'

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
    _type: elementSchema.optional(),
    name: z.string().optional(),
    _name: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    subscriptionTopic: z.string().optional(),
    _subscriptionTopic: elementSchema.optional(),
    timingTiming: timingSchema.optional(),
    timingReference: referenceSchema.optional(),
    timingDate: dateSchema.optional(),
    _timingDate: elementSchema.optional(),
    timingDateTime: dateTimeSchema.optional(),
    _timingDateTime: elementSchema.optional(),
    data: dataRequirementSchema.array().optional(),
    condition: expressionSchema.optional(),
  }),
)
