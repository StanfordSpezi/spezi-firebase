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
import { untypedCoverageSchema } from './coverage.js'
import { untypedDeviceSchema } from './device.js'
import { untypedDiagnosticReportSchema } from './diagnosticReport.js'
import { untypedEncounterSchema } from './encounter.js'
import { untypedImmunizationSchema } from './immunization.js'
import { untypedImmunizationEvaluationSchema } from './immunizationEvaluation.js'
import { untypedImmunizationRecommendationSchema } from './immunizationRecommendation.js'
import { untypedMedicationSchema } from './medication.js'
import { untypedMedicationAdministrationSchema } from './medicationAdministration.js'
import { untypedMedicationDispenseSchema } from './medicationDispense.js'
import { untypedMedicationKnowledgeSchema } from './medicationKnowledge.js'
import { untypedMedicationRequestSchema } from './medicationRequest.js'
import { untypedMedicationStatementSchema } from './medicationStatement.js'
import { untypedOrganizationSchema } from './organization.js'
import { untypedPatientSchema } from './patient.js'
import { untypedPractitionerSchema } from './practitioner.js'
import { untypedQuestionnaireSchema } from './questionnaire.js'
import { untypedQuestionnaireResponseSchema } from './questionnaireResponse.js'
import { untypedServiceRequestSchema } from './serviceRequest.js'

export const fhirResourceSchema: ZodType<FhirResource> = z.lazy(() =>
  z.discriminatedUnion('resourceType', [
    untypedAllergyIntoleranceSchema,
    untypedAppointmentSchema,
    untypedCoverageSchema,
    untypedDeviceSchema,
    untypedDiagnosticReportSchema,
    untypedEncounterSchema,
    untypedImmunizationSchema,
    untypedImmunizationEvaluationSchema,
    untypedImmunizationRecommendationSchema,
    untypedMedicationSchema,
    untypedMedicationAdministrationSchema,
    untypedMedicationDispenseSchema,
    untypedMedicationKnowledgeSchema,
    untypedMedicationRequestSchema,
    untypedMedicationStatementSchema,
    untypedOrganizationSchema,
    untypedPatientSchema,
    untypedPractitionerSchema,
    untypedQuestionnaireSchema,
    untypedQuestionnaireResponseSchema,
    untypedServiceRequestSchema,
  ]),
)
