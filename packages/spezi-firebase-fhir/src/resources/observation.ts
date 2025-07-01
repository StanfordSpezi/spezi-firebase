//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { domainResourceSchema } from '../elements/domainResource.js'
import { codeSchema, timeSchema } from '../primitiveTypes/primitiveTypes.js'
import { identifierForwardSchema } from '../dataTypes/identifier.js'
import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { referenceForwardSchema } from '../dataTypes/reference.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { periodSchema } from '../dataTypes/period.js'
import { timingSchema } from '../dataTypes/timing.js'
import { quantitySchema } from '../dataTypes/quantity.js'
import { rangeSchema } from '../dataTypes/range.js'
import { ratioSchema } from '../dataTypes/ratio.js'
import { sampledDataSchema } from '../dataTypes/sampledData.js'
import { backBoneElementForwardSchema } from '../elements/backBoneElement.js'
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

const observationReferenceRangeSchema = backBoneElementForwardSchema.extend({
  low: optionalish(quantitySchema),
  high: optionalish(quantitySchema),
  type: optionalish(codeableConceptSchema),
  appliesTo: optionalish(codeableConceptSchema.array()),
  age: optionalish(rangeSchema),
  text: optionalish(z.string()),
})

export const observationComponentSchema = backBoneElementForwardSchema.extend({
  code: codeableConceptSchema,
  valueQuantity: optionalish(quantitySchema),
  valueCodeableConcept: optionalish(codeableConceptSchema),
  valueString: optionalish(z.string()),
  valueBoolean: optionalish(z.boolean()),
  valueInteger: optionalish(z.number().int()),
  valueRange: optionalish(rangeSchema),
  valueRatio: optionalish(ratioSchema),
  valueSampledData: optionalish(sampledDataSchema),
  valueTime: optionalish(timeSchema.forward),
  valueDateTime: optionalish(dateTimeSchema.forward),
  valuePeriod: optionalish(periodSchema.forward),
  dataAbsentReason: optionalish(codeableConceptSchema),
  interpretation: optionalish(codeableConceptSchema.array()),
  referenceRange: optionalish(observationReferenceRangeSchema.array()),
})

export const observationSchema = domainResourceSchema.extend({
  resourceType: z.enum(['Observation']),
  status: codeSchema.forward, // TODO: Decide whether every "Required" code should be an enum or if we should only validate the string against the codeSchema
  identifier: optionalish(identifierForwardSchema.array()),
  basedOn: optionalish(referenceForwardSchema.array()),
  partOf: optionalish(referenceForwardSchema.array()),
  category: optionalish(codeableConceptSchema.array()),
  code: codeableConceptSchema,
  subject: optionalish(referenceForwardSchema),
  focus: optionalish(referenceForwardSchema.array()),
  encounter: optionalish(referenceForwardSchema),
  effectiveDateTime: optionalish(dateTimeSchema.forward),
  effectivePeriod: optionalish(periodSchema.forward),
  effectiveTiming: optionalish(timingSchema.forward),
  effectiveInstant: optionalish(instantSchema.forward),
  issued: optionalish(instantSchema.forward),
  performer: optionalish(referenceForwardSchema.array()),
  valueQuantity: optionalish(quantitySchema),
  valueCodeableConcept: optionalish(codeableConceptSchema),
  valueString: optionalish(z.string()),
  valueBoolean: optionalish(z.boolean()),
  valueInteger: optionalish(z.number().int()),
  valueRange: optionalish(rangeSchema),
  valueRatio: optionalish(ratioSchema),
  valueSampledData: optionalish(sampledDataSchema),
  valueTime: optionalish(timeSchema.forward),
  valueDateTime: optionalish(dateTimeSchema.forward),
  valuePeriod: optionalish(periodSchema.forward),
  dataAbsentReason: optionalish(codeableConceptSchema),
  interpretation: optionalish(codeableConceptSchema.array()),
  note: optionalish(referenceForwardSchema.array()),
  bodySite: optionalish(codeableConceptSchema),
  method: optionalish(codeableConceptSchema),
  specimen: optionalish(referenceForwardSchema),
  device: optionalish(referenceForwardSchema),
  referenceRange: optionalish(observationReferenceRangeSchema.array()),
  hasMember: optionalish(referenceForwardSchema.array()),
  derivedFrom: optionalish(referenceForwardSchema.array()),
  component: optionalish(observationComponentSchema.array()),
})
