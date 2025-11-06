//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Goal, type GoalTarget } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  rangeSchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { goalLifecycleStatusSchema } from '../valueSets/index.js'

const goalTargetSchema: ZodType<GoalTarget> = backboneElementSchema.extend({
  measure: codeableConceptSchema.optional(),
  detailQuantity: quantitySchema.optional(),
  detailRange: rangeSchema.optional(),
  detailCodeableConcept: codeableConceptSchema.optional(),
  detailString: stringSchema.optional(),
  _detailString: elementSchema.optional(),
  detailBoolean: booleanSchema.optional(),
  _detailBoolean: elementSchema.optional(),
  detailInteger: z.number().optional(),
  _detailInteger: elementSchema.optional(),
  detailRatio: ratioSchema.optional(),
  dueDate: dateSchema.optional(),
  _dueDate: elementSchema.optional(),
  dueDuration: quantitySchema.optional(),
})

export const untypedGoalSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Goal').readonly(),
    identifier: identifierSchema.array().optional(),
    lifecycleStatus: goalLifecycleStatusSchema,
    _lifecycleStatus: elementSchema.optional(),
    achievementStatus: codeableConceptSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    priority: codeableConceptSchema.optional(),
    description: codeableConceptSchema,
    subject: referenceSchema,
    startDate: dateSchema.optional(),
    _startDate: elementSchema.optional(),
    startCodeableConcept: codeableConceptSchema.optional(),
    target: goalTargetSchema.array().optional(),
    statusDate: dateSchema.optional(),
    _statusDate: elementSchema.optional(),
    statusReason: stringSchema.optional(),
    _statusReason: elementSchema.optional(),
    expressedBy: referenceSchema.optional(),
    addresses: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    outcomeCode: codeableConceptSchema.array().optional(),
    outcomeReference: referenceSchema.array().optional(),
  }),
) satisfies ZodType<Goal>

export const goalSchema: ZodType<Goal> = untypedGoalSchema

export class FhirGoal extends FhirDomainResource<Goal> {
  // Static Functions

  public static parse(value: unknown): FhirGoal {
    return new FhirGoal(goalSchema.parse(value))
  }
}
