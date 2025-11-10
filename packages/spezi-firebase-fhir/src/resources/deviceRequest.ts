//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DeviceRequestParameter, type DeviceRequest } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
  timingSchema,
} from '../elements/index.js'
import {
  deviceRequestIntentSchema,
  deviceRequestStatusSchema,
  requestPrioritySchema,
} from '../valueSets/index.js'

const deviceRequestParameterSchema: ZodType<DeviceRequestParameter> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueRange: rangeSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
  })

export const untypedDeviceRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DeviceRequest').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: stringSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: stringSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    priorRequest: referenceSchema.array().optional(),
    groupIdentifier: identifierSchema.optional(),
    status: deviceRequestStatusSchema.optional(),
    _status: elementSchema.optional(),
    intent: deviceRequestIntentSchema,
    _intent: elementSchema.optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    codeReference: referenceSchema.optional(),
    codeCodeableConcept: codeableConceptSchema.optional(),
    parameter: deviceRequestParameterSchema.array().optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    requester: referenceSchema.optional(),
    performerType: codeableConceptSchema.optional(),
    performer: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    insurance: referenceSchema.array().optional(),
    supportingInfo: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    relevantHistory: referenceSchema.array().optional(),
  }),
) satisfies ZodType<DeviceRequest>

export const deviceRequestSchema: ZodType<DeviceRequest> =
  untypedDeviceRequestSchema

export class FhirDeviceRequest extends FhirDomainResource<DeviceRequest> {
  // Static Functions

  public static parse(value: unknown): FhirDeviceRequest {
    return new FhirDeviceRequest(deviceRequestSchema.parse(value))
  }
}
