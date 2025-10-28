//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * Describes the type of a metric calibration.
 * http://hl7.org/fhir/valueset-metric-calibration-type.html
 */
export const deviceMetricCalibrationTypeSchema = z.enum([
  'unspecified',
  'offset',
  'gain',
  'two-point',
])

export type DeviceMetricCalibrationType = z.infer<
  typeof deviceMetricCalibrationTypeSchema
>

/**
 * Describes the state of a metric calibration.
 * http://hl7.org/fhir/valueset-metric-calibration-state.html
 */
export const deviceMetricCalibrationStateSchema = z.enum([
  'not-calibrated',
  'calibration-required',
  'calibrated',
  'unspecified',
])

export type DeviceMetricCalibrationState = z.infer<
  typeof deviceMetricCalibrationStateSchema
>

/**
 * Describes the operational status of the DeviceMetric.
 * http://hl7.org/fhir/valueset-metric-operational-status.html
 */
export const deviceMetricOperationalStatusSchema = z.enum([
  'on',
  'off',
  'standby',
  'entered-in-error',
])

export type DeviceMetricOperationalStatus = z.infer<
  typeof deviceMetricOperationalStatusSchema
>

/**
 * Describes the typical color of representation.
 * http://hl7.org/fhir/valueset-metric-color.html
 */
export const deviceMetricColorSchema = z.enum([
  'black',
  'red',
  'green',
  'yellow',
  'blue',
  'magenta',
  'cyan',
  'white',
])

export type DeviceMetricColor = z.infer<typeof deviceMetricColorSchema>

/**
 * Describes the category of the metric.
 * http://hl7.org/fhir/valueset-metric-category.html
 */
export const deviceMetricCategorySchema = z.enum([
  'measurement',
  'setting',
  'calculation',
  'unspecified',
])

export type DeviceMetricCategory = z.infer<typeof deviceMetricCategorySchema>
