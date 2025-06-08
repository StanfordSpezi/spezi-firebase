//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import { domainResourceSchema } from '../elements/domainResource.js'
import { codeSchema, timeSchema } from '../primitiveTypes/primitiveTypes.js'
import { identifierSchema } from '../dataTypes/identifier.js'
import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { referenceSchema } from '../dataTypes/reference.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { periodSchema } from '../dataTypes/period.js'
import { timingSchema } from '../dataTypes/timing.js'
import { quantitySchema } from '../dataTypes/quantity.js'
import { rangeSchema } from '../dataTypes/range.js'
import { ratioSchema } from '../dataTypes/ratio.js'
import { sampledDataSchema } from '../dataTypes/sampledData.js'
import { annotationSchema } from '../dataTypes/annotation.js'
import { backBoneElementSchema } from '../elements/backBoneElement.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { instantSchema } from '../primitiveTypes/instant.js'

export enum ObservationStatus {
  registered = 'registered',
  preliminary = 'preliminary',
  final = 'final',
  amended = 'amended',
  corrected = 'corrected',
  cancelled = 'cancelled',
  enteredInError = 'entered-in-error',
  unknown = 'unknown',
}

const observationReferenceRangeSchema = backBoneElementSchema.extend({
  low: optionalish(quantitySchema),
  high: optionalish(quantitySchema),
  type: optionalish(codeableConceptSchema),
  appliesTo: optionalish(codeableConceptSchema.array()),
  age: optionalish(rangeSchema),
  text: optionalish(Schema.simple(z.string())),
})

export const observationComponentSchema = backBoneElementSchema.extend({
  code: codeableConceptSchema,
  valueQuantity: optionalish(quantitySchema),
  valueCodeableConcept: optionalish(codeableConceptSchema),
  valueString: optionalish(Schema.simple(z.string())),
  valueBoolean: optionalish(Schema.simple(z.boolean())),
  valueInteger: optionalish(Schema.simple(z.number().int())),
  valueRange: optionalish(rangeSchema),
  valueRatio: optionalish(ratioSchema),
  valueSampledData: optionalish(sampledDataSchema),
  valueTime: optionalish(timeSchema),
  valueDateTime: optionalish(dateTimeSchema),
  valuePeriod: optionalish(periodSchema),
  dataAbsentReason: optionalish(codeableConceptSchema),
  interpretation: optionalish(codeableConceptSchema.array()),
  referenceRange: optionalish(observationReferenceRangeSchema.array()),
})

export const observationSchema = domainResourceSchema.extend({
  resourceType: Schema.simple(z.enum(['Observation'])),
  status: codeSchema, // TODO: Decide whether every "Required" code should be an enum or if we should only validate the string against the codeSchema
  identifier: optionalish(identifierSchema.array()),
  basedOn: optionalish(referenceSchema.array()),
  partOf: optionalish(referenceSchema.array()),
  category: optionalish(codeableConceptSchema.array()),
  code: codeableConceptSchema,
  subject: optionalish(referenceSchema),
  focus: optionalish(referenceSchema.array()),
  encounter: optionalish(referenceSchema),
  effectiveDateTime: optionalish(dateTimeSchema),
  effectivePeriod: optionalish(periodSchema),
  effectiveTiming: optionalish(timingSchema),
  effectiveInstant: optionalish(instantSchema),
  issued: optionalish(instantSchema),
  performer: optionalish(referenceSchema.array()),
  valueQuantity: optionalish(quantitySchema),
  valueCodeableConcept: optionalish(codeableConceptSchema),
  valueString: optionalish(Schema.simple(z.string())),
  valueBoolean: optionalish(Schema.simple(z.boolean())),
  valueInteger: optionalish(Schema.simple(z.number().int())),
  valueRange: optionalish(rangeSchema),
  valueRatio: optionalish(ratioSchema),
  valueSampledData: optionalish(sampledDataSchema),
  valueTime: optionalish(timeSchema),
  valueDateTime: optionalish(dateTimeSchema),
  valuePeriod: optionalish(periodSchema),
  dataAbsentReason: optionalish(codeableConceptSchema),
  interpretation: optionalish(codeableConceptSchema.array()),
  note: optionalish(annotationSchema.array()),
  bodySite: optionalish(codeableConceptSchema),
  method: optionalish(codeableConceptSchema),
  specimen: optionalish(referenceSchema),
  device: optionalish(referenceSchema),
  referenceRange: optionalish(observationReferenceRangeSchema.array()),
  hasMember: optionalish(referenceSchema.array()),
  derivedFrom: optionalish(referenceSchema.array()),
  component: optionalish(observationComponentSchema.array()),
})
