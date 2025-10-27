//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Task } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { anyValueSchema } from '../elements/anyValueSchema.js'
import {
  annotationSchema,
  backboneElementSchema,
  canonicalSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  positiveIntSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

export const untypedTaskSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Task').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.optional(),
    _instantiatesCanonical: elementSchema.optional(),
    basedOn: referenceSchema.array().optional(),
    groupIdentifier: identifierSchema.optional(),
    partOf: referenceSchema.array().optional(),
    status: z.enum([
      'draft',
      'requested',
      'received',
      'accepted',
      'rejected',
      'ready',
      'cancelled',
      'in-progress',
      'on-hold',
      'failed',
      'completed',
      'entered-in-error',
    ]),
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    businessStatus: codeableConceptSchema.optional(),
    intent: z.enum([
      'unknown',
      'proposal',
      'plan',
      'order',
      'original-order',
      'reflex-order',
      'filler-order',
      'instance-order',
      'option',
    ]),
    _intent: elementSchema.optional(),
    priority: z.enum(['routine', 'urgent', 'asap', 'stat']).optional(),
    _priority: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    focus: referenceSchema.optional(),
    for: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    executionPeriod: periodSchema.optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    lastModified: dateTimeSchema.optional(),
    _lastModified: elementSchema.optional(),
    requester: referenceSchema.optional(),
    performerType: codeableConceptSchema.array().optional(),
    owner: referenceSchema.optional(),
    location: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.optional(),
    reasonReference: referenceSchema.optional(),
    insurance: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    relevantHistory: referenceSchema.array().optional(),
    restriction: backboneElementSchema
      .extend({
        repetitions: positiveIntSchema.optional(),
        period: periodSchema.optional(),
        recipient: referenceSchema.array().optional(),
      })
      .optional(),
    input: anyValueSchema
      .extend({
        type: codeableConceptSchema,
      })
      .array()
      .optional(),
    output: anyValueSchema
      .extend({
        type: codeableConceptSchema,
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Task>

export const taskSchema: ZodType<Task> = untypedTaskSchema

export class FhirTask extends FhirDomainResource<Task> {
  // Static Functions

  public static parse(value: unknown): FhirTask {
    return new FhirTask(taskSchema.parse(value))
  }
}
