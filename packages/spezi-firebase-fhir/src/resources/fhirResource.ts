//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type FhirResource } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { untypedAllergyIntoleranceSchema } from './allergyIntolerance.js'
import { untypedAppointmentSchema } from './appointment.js'
import { untypedMedicationSchema } from './medication.js'
import { untypedMedicationRequestSchema } from './medicationRequest.js'
import { untypedOrganizationSchema } from './organization.js'
import { untypedPatientSchema } from './patient.js'
import { untypedQuestionnaireSchema } from './questionnaire.js'
import { untypedQuestionnaireResponseSchema } from './questionnaireResponse.js'

export const fhirResourceSchema: ZodType<FhirResource> = z.lazy(() =>
  z.discriminatedUnion('resourceType', [
    untypedAllergyIntoleranceSchema,
    untypedAppointmentSchema,
    untypedMedicationSchema,
    untypedMedicationRequestSchema,
    untypedOrganizationSchema,
    untypedPatientSchema,
    untypedQuestionnaireSchema,
    untypedQuestionnaireResponseSchema,
  ]),
)
