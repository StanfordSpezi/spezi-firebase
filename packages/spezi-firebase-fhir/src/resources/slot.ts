//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Slot } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { slotStatusSchema } from '../valueSets/index.js'

export const untypedSlotSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Slot').readonly(),
    identifier: identifierSchema.array().optional(),
    serviceCategory: codeableConceptSchema.array().optional(),
    serviceType: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    appointmentType: codeableConceptSchema.optional(),
    schedule: referenceSchema,
    status: slotStatusSchema,
    _status: elementSchema.optional(),
    start: dateTimeSchema,
    _start: elementSchema.optional(),
    end: dateTimeSchema,
    _end: elementSchema.optional(),
    overbooked: z.boolean().optional(),
    _overbooked: elementSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
  }),
)

export const slotSchema = untypedSlotSchema

export class FhirSlot extends FhirDomainResource<Slot> {
  // Static Functions

  public static parse(value: unknown): FhirSlot {
    return new FhirSlot(slotSchema.parse(value))
  }
}
