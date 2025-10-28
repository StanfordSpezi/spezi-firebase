//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The kind of activity definition.
 * http://hl7.org/fhir/valueset-request-resource-types.html
 */
export const activityDefinitionKindSchema = z.enum([
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

export type ActivityDefinitionKind = z.infer<
  typeof activityDefinitionKindSchema
>

/**
 * Indicates the level of authority/intentionality associated with the activity.
 * http://hl7.org/fhir/valueset-request-intent.html
 */
export const activityDefinitionIntentSchema = z.enum([
  'proposal',
  'plan',
  'directive',
  'order',
  'original-order',
  'reflex-order',
  'filler-order',
  'instance-order',
  'option',
])

export type ActivityDefinitionIntent = z.infer<
  typeof activityDefinitionIntentSchema
>

/**
 * The type of participant in the activity.
 * http://hl7.org/fhir/valueset-action-participant-type.html
 */
export const activityDefinitionParticipantTypeSchema = z.enum([
  'patient',
  'practitioner',
  'related-person',
  'device',
])

export type ActivityDefinitionParticipantType = z.infer<
  typeof activityDefinitionParticipantTypeSchema
>
