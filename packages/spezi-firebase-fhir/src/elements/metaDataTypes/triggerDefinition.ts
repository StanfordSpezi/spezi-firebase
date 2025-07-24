//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type TriggerDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { dataRequirementSchema } from './dataRequirement.js'
import { expressionSchema } from './expression.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import {
  dateSchema,
  dateTimeSchema,
  stringSchema,
} from '../dataTypes/primitiveTypes.js'
import { referenceSchema } from '../dataTypes/reference.js'
import { timingSchema } from '../dataTypes/timing.js'
import { elementSchema } from '../element.js'

const triggerDefinitionTypeSchema = z.enum([
  'named-event',
  'periodic',
  'data-changed',
  'data-added',
  'data-modified',
  'data-removed',
  'data-accessed',
  'data-access-ended',
])
export type TriggerDefinitionType = z.infer<typeof triggerDefinitionTypeSchema>

export const triggerDefinitionSchema: ZodType<TriggerDefinition> = z.lazy(() =>
  elementSchema.extend({
    type: triggerDefinitionTypeSchema,
    _type: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    subscriptionTopic: stringSchema.optional(),
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
