//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The category of interval of values for continuous or ordinal observations.
 * http://hl7.org/fhir/valueset-observation-range-category.html
 */
export const observationDefinitionRangeCategorySchema = z.enum([
  'reference',
  'critical',
  'absolute',
])

export type ObservationDefinitionRangeCategory = z.infer<
  typeof observationDefinitionRangeCategorySchema
>

/**
 * Permitted data type for observation value.
 * http://hl7.org/fhir/valueset-permitted-data-type.html
 */
export const observationDefinitionPermittedDataTypeSchema = z.enum([
  'Quantity',
  'CodeableConcept',
  'string',
  'boolean',
  'integer',
  'Range',
  'Ratio',
  'SampledData',
  'time',
  'dateTime',
  'Period',
])

export type ObservationDefinitionPermittedDataType = z.infer<
  typeof observationDefinitionPermittedDataTypeSchema
>
