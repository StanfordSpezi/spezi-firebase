//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type PractitionerRole } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  booleanSchema,
  elementSchema,
  codeableConceptSchema,
  periodSchema,
  referenceSchema,
  contactPointSchema,
  stringSchema,
} from '../elements/index.js'

export const untypedPractitionerRoleSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PractitionerRole').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    period: periodSchema.optional(),
    practitioner: referenceSchema.optional(),
    organization: referenceSchema.optional(),
    code: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    location: referenceSchema.array().optional(),
    healthcareService: referenceSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    availableTime: backboneElementSchema
      .extend({
        daysOfWeek: z
          .enum(['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'])
          .array()
          .optional(),
        allDay: booleanSchema.optional(),
        _allDay: elementSchema.optional(),
        availableStartTime: stringSchema.optional(),
        _availableStartTime: elementSchema.optional(),
        availableEndTime: stringSchema.optional(),
        _availableEndTime: elementSchema.optional(),
      })
      .array()
      .optional(),
    notAvailable: backboneElementSchema
      .extend({
        description: stringSchema,
        _description: elementSchema.optional(),
        during: periodSchema.optional(),
      })
      .array()
      .optional(),
    availabilityExceptions: stringSchema.optional(),
    _availabilityExceptions: elementSchema.optional(),
    endpoint: referenceSchema.array().optional(),
  }),
) satisfies ZodType<PractitionerRole>

export const practitionerRoleSchema: ZodType<PractitionerRole> =
  untypedPractitionerRoleSchema

export class FhirPractitionerRole extends FhirDomainResource<PractitionerRole> {
  // Static Functions

  public static parse(value: unknown): FhirPractitionerRole {
    return new FhirPractitionerRole(practitionerRoleSchema.parse(value))
  }
}
