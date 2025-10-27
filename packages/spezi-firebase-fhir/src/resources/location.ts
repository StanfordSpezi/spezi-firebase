//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Location } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  addressSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  contactPointSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
  timeSchema,
} from '../elements/index.js'
import {
  daysOfWeekSchema,
  locationModeSchema,
  locationStatusSchema,
} from '../valueSets/index.js'

export const untypedLocationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Location').readonly(),
    identifier: identifierSchema.array().optional(),
    status: locationStatusSchema.optional(),
    _status: elementSchema.optional(),
    operationalStatus: codingSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    alias: stringSchema.array().optional(),
    _alias: elementSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    mode: locationModeSchema.optional(),
    _mode: elementSchema.optional(),
    type: codeableConceptSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    address: addressSchema.optional(),
    physicalType: codeableConceptSchema.optional(),
    position: backboneElementSchema
      .extend({
        longitude: decimalSchema,
        latitude: decimalSchema,
        altitude: decimalSchema.optional(),
      })
      .optional(),
    managingOrganization: referenceSchema.optional(),
    partOf: referenceSchema.optional(),
    hoursOfOperation: backboneElementSchema
      .extend({
        daysOfWeek: daysOfWeekSchema.array().optional(),
        _daysOfWeek: elementSchema.array().optional(),
        allDay: booleanSchema.optional(),
        openingTime: timeSchema.optional(),
        _openingTime: elementSchema.optional(),
        closingTime: timeSchema.optional(),
        _closingTime: elementSchema.optional(),
      })
      .array()
      .optional(),
    availabilityExceptions: stringSchema.optional(),
    _availabilityExceptions: elementSchema.optional(),
    endpoint: referenceSchema.array().optional(),
  }),
) satisfies ZodType<Location>

export const locationSchema: ZodType<Location> = untypedLocationSchema

export class FhirLocation extends FhirDomainResource<Location> {
  // Static Functions

  public static parse(value: unknown): FhirLocation {
    return new FhirLocation(locationSchema.parse(value))
  }
}
