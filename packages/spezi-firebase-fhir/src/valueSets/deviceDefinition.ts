//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The type of name the device is referred by.
 * http://hl7.org/fhir/valueset-device-nametype.html
 */
export const deviceDefinitionNameTypeSchema = z.enum([
  'udi-label-name',
  'user-friendly-name',
  'patient-reported-name',
  'manufacturer-name',
  'model-name',
  'other',
])

/**
 * The type of name the device is referred by.
 * http://hl7.org/fhir/valueset-device-nametype.html
 */
export type DeviceDefinitionNameType = z.infer<
  typeof deviceDefinitionNameTypeSchema
>
