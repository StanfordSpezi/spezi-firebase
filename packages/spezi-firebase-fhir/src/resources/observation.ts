//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Observation } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import {
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  intSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  ratioSchema,
  referenceSchema,
  sampledDataSchema,
  stringSchema,
  timeSchema,
  timingSchema,
} from '../elements/index.js'

const observationStatusSchema = z.enum([
  'registered',
  'preliminary',
  'final',
  'amended',
  'corrected',
  'cancelled',
  'entered-in-error',
  'unknown',
])

export const untypedObservationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Observation'),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: observationStatusSchema,
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema,
    subject: referenceSchema.optional(),
    focus: referenceSchema.array().optional(),
    encounter: referenceSchema.optional(),
    effectiveDateTime: dateTimeSchema.optional(),
    _effectiveDateTime: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    effectiveTiming: timingSchema.optional(),
    effectiveInstant: instantSchema.optional(),
    _effectiveInstant: elementSchema.optional(),
    issued: instantSchema.optional(),
    _issued: elementSchema.optional(),
    performer: referenceSchema.array().optional(),
    valueQuantity: quantitySchema.optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueInteger: intSchema.optional(),
    valueRange: rangeSchema.optional(),
    valueRatio: ratioSchema.optional(),
    valueSampledData: sampledDataSchema.optional(),
    valueTime: timeSchema.optional(),
    _valueTime: elementSchema.optional(),
    valueDateTime: dateTimeSchema.optional(),
    _valueDateTime: elementSchema.optional(),
    valuePeriod: periodSchema.optional(),
    dataAbsentReason: codeableConceptSchema.optional(),
    interpretation: codeableConceptSchema.array().optional(),
    referenceRange: elementSchema
      .extend({
        low: quantitySchema.optional(),
        high: quantitySchema.optional(),
        type: codeableConceptSchema.optional(),
        appliesTo: codeableConceptSchema.array().optional(),
        age: rangeSchema.optional(),
        text: stringSchema.optional(),
        _text: elementSchema.optional(),
      })
      .array()
      .optional(),
    hasMember: referenceSchema.array().optional(),
    derivedFrom: referenceSchema.array().optional(),
    component: elementSchema
      .extend({
        code: codeableConceptSchema,
        valueQuantity: quantitySchema.optional(),
        valueCodeableConcept: codeableConceptSchema.optional(),
        valueString: stringSchema.optional(),
        _valueString: elementSchema.optional(),
        valueBoolean: booleanSchema.optional(),
        _valueBoolean: elementSchema.optional(),
        valueInteger: intSchema.optional(),
        valueRange: rangeSchema.optional(),
        valueRatio: ratioSchema.optional(),
        valueSampledData: sampledDataSchema.optional(),
        valueTime: timeSchema.optional(),
        _valueTime: elementSchema.optional(),
        valueDateTime: dateTimeSchema.optional(),
        _valueDateTime: elementSchema.optional(),
        valuePeriod: periodSchema.optional(),
        dataAbsentReason: codeableConceptSchema.optional(),
        interpretation: codeableConceptSchema.array().optional(),
        referenceRange: elementSchema
          .extend({
            low: quantitySchema.optional(),
            high: quantitySchema.optional(),
            type: codeableConceptSchema.optional(),
            appliesTo: codeableConceptSchema.array().optional(),
            age: rangeSchema.optional(),
            text: stringSchema.optional(),
            _text: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Observation>

export const observationSchema: ZodType<Observation> = untypedObservationSchema
