//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Device } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

export const deviceNameTypeSchema = z.enum([
  'udi-label-name',
  'user-friendly-name',
  'patient-reported-name',
  'manufacturer-name',
  'model-name',
  'other',
])

export const deviceStatusSchema = z.enum([
  'active',
  'inactive',
  'entered-in-error',
])

export const deviceDefinitionDeviceName = z.lazy(() =>
  backboneElementSchema.extend({
    name: stringSchema,
    type: deviceNameTypeSchema,
    _type: elementSchema.optional(),
  }),
)

export const devicePropertySchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCode: codeableConceptSchema.array().optional(),
    valueQuantity: quantitySchema.array().optional(),
  }),
)

export const deviceDefinitionSpecializationSchema = z.lazy(() =>
  backboneElementSchema.extend({
    systemType: codeableConceptSchema,
    _systemType: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
  }),
)

export const deviceUdiCarrierSchema = z.lazy(() =>
  backboneElementSchema.extend({
    deviceIdentifier: stringSchema,
    _deviceIdentifier: elementSchema.optional(),
    issuer: stringSchema.optional(),
    _issuer: elementSchema.optional(),
    jurisdiction: stringSchema.optional(),
    _jurisdiction: elementSchema.optional(),
    carrierHRF: stringSchema.optional(),
    _carrierHRF: elementSchema.optional(),
    carrierAIDC: stringSchema.optional(),
    _carrierAIDC: elementSchema.optional(),
  }),
)

export const deviceVersionSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    component: codeableConceptSchema.optional(),
    value: stringSchema,
    _value: elementSchema.optional(),
  }),
)

export const untypedDeviceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Device').readonly(),
    contact: contactPointSchema.array().optional(),
    definition: referenceSchema.optional(),
    deviceName: deviceDefinitionDeviceName.array().optional(),
    distinctIdentifier: stringSchema.optional(),
    _distinctIdentifier: elementSchema.optional(),
    expirationDate: stringSchema.optional(),
    _expirationDate: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    location: referenceSchema.optional(),
    lotNumber: stringSchema.optional(),
    _lotNumber: elementSchema.optional(),
    manufactureDate: stringSchema.optional(),
    _manufactureDate: elementSchema.optional(),
    manufacturer: stringSchema.optional(),
    _manufacturer: elementSchema.optional(),
    modelNumber: stringSchema.optional(),
    _modelNumber: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    owner: referenceSchema.optional(),
    parent: referenceSchema.optional(),
    partNumber: stringSchema.optional(),
    _partNumber: elementSchema.optional(),
    patient: referenceSchema.optional(),
    property: devicePropertySchema.array().optional(),
    safety: codeableConceptSchema.array().optional(),
    serialNumber: stringSchema.optional(),
    _serialNumber: elementSchema.optional(),
    specialization: deviceDefinitionSpecializationSchema.array().optional(),
    status: deviceStatusSchema.optional(),
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    udiCarrier: deviceUdiCarrierSchema.array().optional(),
    url: stringSchema.optional(),
    _url: elementSchema.optional(),
    version: deviceVersionSchema.array().optional(),
  }),
) satisfies ZodType<Device>

export const deviceSchema: ZodType<Device> = untypedDeviceSchema
