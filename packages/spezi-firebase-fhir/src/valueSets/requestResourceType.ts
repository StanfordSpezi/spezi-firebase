//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * A list of all the request resource types defined in this version of the FHIR specification.
 * http://hl7.org/fhir/valueset-request-resource-types
 */
export const requestResourceTypeSchema = z.enum([
  'Appointment',
  'AppointmentResponse',
  'CarePlan',
  'Claim',
  'CommunicationRequest',
  'Contract',
  'DeviceRequest',
  'EnrollmentRequest',
  'ImmunizationRecommendation',
  'MedicationRequest',
  'NutritionOrder',
  'ServiceRequest',
  'SupplyRequest',
  'Task',
  'VisionPrescription',
])

export type RequestResourceType = z.infer<typeof requestResourceTypeSchema>
