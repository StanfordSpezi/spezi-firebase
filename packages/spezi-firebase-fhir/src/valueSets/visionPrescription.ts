//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A code specifying the state of the resource instance.
 * http://hl7.org/fhir/valueset-fm-status.html
 */
export const visionPrescriptionStatusSchema = z.enum([
  'active',
  'cancelled',
  'draft',
  'entered-in-error',
])

/**
 * A code specifying the state of the resource instance.
 * http://hl7.org/fhir/valueset-fm-status.html
 */
export type VisionPrescriptionStatus = z.infer<
  typeof visionPrescriptionStatusSchema
>

/**
 * A coded concept listing the eye codes.
 * http://hl7.org/fhir/valueset-vision-eye-codes.html
 */
export const visionEyesSchema = z.enum(['right', 'left'])

/**
 * A coded concept listing the eye codes.
 * http://hl7.org/fhir/valueset-vision-eye-codes.html
 */
export type VisionEyes = z.infer<typeof visionEyesSchema>

/**
 * A coded concept listing the base codes.
 * http://hl7.org/fhir/valueset-vision-base-codes.html
 */
export const visionBaseSchema = z.enum(['up', 'down', 'in', 'out'])

/**
 * A coded concept listing the base codes.
 * http://hl7.org/fhir/valueset-vision-base-codes.html
 */
export type VisionBase = z.infer<typeof visionBaseSchema>
