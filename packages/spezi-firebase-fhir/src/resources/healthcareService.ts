//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type HealthcareService } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { daysOfWeekSchema } from '../valueSets/index.js'

export const untypedHealthcareServiceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('HealthcareService').readonly(),
    identifier: identifierSchema.array().optional(),
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    providedBy: referenceSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    type: codeableConceptSchema.array().optional(),
    specialty: codeableConceptSchema.array().optional(),
    location: referenceSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
    extraDetails: markdownSchema.optional(),
    _extraDetails: elementSchema.optional(),
    photo: attachmentSchema.optional(),
    telecom: contactPointSchema.array().optional(),
    coverageArea: referenceSchema.array().optional(),
    serviceProvisionCode: codeableConceptSchema.array().optional(),
    eligibility: backboneElementSchema
      .extend({
        code: codeableConceptSchema,
        comment: stringSchema.optional(),
        _comment: elementSchema.optional(),
      })
      .array()
      .optional(),
    program: codeableConceptSchema.array().optional(),
    characteristic: codeableConceptSchema.array().optional(),
    communication: codeableConceptSchema.array().optional(),
    referralMethod: codeableConceptSchema.array().optional(),
    appointmentRequired: booleanSchema.optional(),
    _appointmentRequired: elementSchema.optional(),
    availableTime: backboneElementSchema
      .extend({
        daysOfWeek: daysOfWeekSchema.array().optional(),
        _daysOfWeek: elementSchema.array().optional(),
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
)

export const healthcareServiceSchema: ZodType<HealthcareService> =
  untypedHealthcareServiceSchema

export class FhirHealthcareService extends FhirDomainResource<HealthcareService> {
  // Static Functions

  public static parse(value: unknown): FhirHealthcareService {
    return new FhirHealthcareService(healthcareServiceSchema.parse(value))
  }
}
