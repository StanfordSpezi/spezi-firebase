//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import { allergyIntoleranceSchema } from './allergyIntolerance.js'
import { appointmentSchema } from './appointment.js'
import { medicationSchema } from './medication.js'
import { medicationRequestSchema } from './medicationRequest.js'
import { questionnaireSchema } from './questionnaire.js'
import { questionnaireResponseSchema } from './questionnaireResponse.js'
import { FhirResource } from 'fhir/r4b.js'

export const fhirResourceSchema: ZodType<FhirResource> = z.lazy(() =>
  z.discriminatedUnion('resourceType', [
    allergyIntoleranceSchema,
    appointmentSchema,
    medicationSchema,
    medicationRequestSchema,
    questionnaireSchema,
    questionnaireResponseSchema,
  ]),
)
