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
import { untypedDeviceSchema } from './device.js'
import { untypedDiagnosticReportSchema } from './diagnosticReport.js'
import { untypedEncounterSchema } from './encounter.js'
import { untypedMedicationSchema } from './medication.js'
import { untypedMedicationAdministrationSchema } from './medicationAdministration.js'
import { untypedMedicationDispenseSchema } from './medicationDispense.js'
import { untypedMedicationRequestSchema } from './medicationRequest.js'
import { untypedMedicationStatementSchema } from './medicationStatement.js'
import { untypedOrganizationSchema } from './organization.js'
import { untypedPatientSchema } from './patient.js'
import { untypedQuestionnaireSchema } from './questionnaire.js'
import { untypedQuestionnaireResponseSchema } from './questionnaireResponse.js'
import { untypedServiceRequestSchema } from './serviceRequest.js'

export const fhirResourceSchema: ZodType<FhirResource> = z.lazy(() =>
  z.discriminatedUnion('resourceType', [
    untypedAllergyIntoleranceSchema,
    untypedAppointmentSchema,
    untypedDeviceSchema,
    untypedDiagnosticReportSchema,
    untypedEncounterSchema,
    untypedMedicationSchema,
    untypedMedicationAdministrationSchema,
    untypedMedicationDispenseSchema,
    untypedMedicationRequestSchema,
    untypedMedicationStatementSchema,
    untypedOrganizationSchema,
    untypedPatientSchema,
    untypedQuestionnaireSchema,
    untypedQuestionnaireResponseSchema,
    untypedServiceRequestSchema,
  ]),
)
