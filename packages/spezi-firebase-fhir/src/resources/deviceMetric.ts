//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { DeviceMetricCalibration, type DeviceMetric } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  referenceSchema,
  timingSchema,
} from '../elements/index.js'
import {
  deviceMetricCalibrationStateSchema,
  deviceMetricCalibrationTypeSchema,
  deviceMetricCategorySchema,
  deviceMetricColorSchema,
  deviceMetricOperationalStatusSchema,
} from '../valueSets/index.js'

const deviceMetricCalibrationSchema: ZodType<DeviceMetricCalibration> =
  backboneElementSchema.extend({
    type: deviceMetricCalibrationTypeSchema.optional(),
    _type: elementSchema.optional(),
    state: deviceMetricCalibrationStateSchema.optional(),
    _state: elementSchema.optional(),
    time: instantSchema.optional(),
    _time: elementSchema.optional(),
  })

export const untypedDeviceMetricSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DeviceMetric').readonly(),
    identifier: identifierSchema.array().optional(),
    type: codeableConceptSchema,
    unit: codeableConceptSchema.optional(),
    source: referenceSchema.optional(),
    parent: referenceSchema.optional(),
    operationalStatus: deviceMetricOperationalStatusSchema.optional(),
    _operationalStatus: elementSchema.optional(),
    color: deviceMetricColorSchema.optional(),
    _color: elementSchema.optional(),
    category: deviceMetricCategorySchema,
    _category: elementSchema.optional(),
    measurementPeriod: timingSchema.optional(),
    calibration: deviceMetricCalibrationSchema.array().optional(),
  }),
) satisfies ZodType<DeviceMetric>

export const deviceMetricSchema: ZodType<DeviceMetric> =
  untypedDeviceMetricSchema

export class FhirDeviceMetric extends FhirDomainResource<DeviceMetric> {
  // Static Functions

  public static parse(value: unknown): FhirDeviceMetric {
    return new FhirDeviceMetric(deviceMetricSchema.parse(value))
  }
}
