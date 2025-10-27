//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Schedule } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

export const untypedScheduleSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Schedule').readonly(),
    identifier: identifierSchema.array().optional(),
    active: z.boolean().optional(),
    _active: elementSchema.optional(),
    serviceCategory: codeableConceptSchema.array().optional(),
    serviceType: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    actor: referenceSchema.array(),
    planningHorizon: periodSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
  }),
)

export const scheduleSchema= untypedScheduleSchema

export class FhirSchedule extends FhirDomainResource<Schedule> {
  // Static Functions

  public static parse(value: unknown): FhirSchedule {
    return new FhirSchedule(scheduleSchema.parse(value))
  }
}
