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
import { untypedAppointmentResponseSchema } from './appointmentResponse.js'
import { untypedCompositionSchema } from './composition.js'
import { untypedConditionSchema } from './condition.js'
import { untypedCoverageSchema } from './coverage.js'
import { untypedDeviceSchema } from './device.js'
import { untypedDiagnosticReportSchema } from './diagnosticReport.js'
import { untypedEncounterSchema } from './encounter.js'
import { untypedEndpointSchema } from './endpoint.js'
import { untypedEpisodeOfCareSchema } from './episodeOfCare.js'
import { untypedGroupSchema } from './group.js'
import { untypedHealthcareServiceSchema } from './healthcareService.js'
import { untypedImagingStudySchema } from './imagingStudy.js'
import { untypedImmunizationSchema } from './immunization.js'
import { untypedImmunizationEvaluationSchema } from './immunizationEvaluation.js'
import { untypedImmunizationRecommendationSchema } from './immunizationRecommendation.js'
import { untypedLibrarySchema } from './library.js'
import { untypedListSchema } from './list.js'
import { untypedLocationSchema } from './location.js'
import { untypedMedicationSchema } from './medication.js'
import { untypedMedicationAdministrationSchema } from './medicationAdministration.js'
import { untypedMedicationDispenseSchema } from './medicationDispense.js'
import { untypedMedicationKnowledgeSchema } from './medicationKnowledge.js'
import { untypedMedicationRequestSchema } from './medicationRequest.js'
import { untypedMedicationStatementSchema } from './medicationStatement.js'
import { untypedObservationSchema } from './observation.js'
import { untypedOrganizationSchema } from './organization.js'
import { untypedPatientSchema } from './patient.js'
import { untypedPersonSchema } from './person.js'
import { untypedPractitionerSchema } from './practitioner.js'
import { untypedPractitionerRoleSchema } from './practitionerRole.js'
import { untypedProcedureSchema } from './procedure.js'
import { untypedQuestionnaireSchema } from './questionnaire.js'
import { untypedQuestionnaireResponseSchema } from './questionnaireResponse.js'
import { untypedRelatedPersonSchema } from './relatedPerson.js'
import { untypedScheduleSchema } from './schedule.js'
import { untypedServiceRequestSchema } from './serviceRequest.js'
import { untypedSlotSchema } from './slot.js'
import { untypedSpecimenSchema } from './specimen.js'
import { untypedSubscriptionSchema } from './subscription.js'
import { untypedSubstanceSchema } from './substance.js'
import { untypedTaskSchema } from './task.js'

export const fhirResourceSchema: ZodType<FhirResource> = z.lazy(() =>
  z.discriminatedUnion('resourceType', [
    untypedAllergyIntoleranceSchema,
    untypedAppointmentSchema,
    untypedAppointmentResponseSchema,
    untypedCompositionSchema,
    untypedConditionSchema,
    untypedCoverageSchema,
    untypedDeviceSchema,
    untypedDiagnosticReportSchema,
    untypedEncounterSchema,
    untypedEndpointSchema,
    untypedEpisodeOfCareSchema,
    untypedGroupSchema,
    untypedHealthcareServiceSchema,
    untypedImagingStudySchema,
    untypedImmunizationSchema,
    untypedImmunizationEvaluationSchema,
    untypedImmunizationRecommendationSchema,
    untypedLibrarySchema,
    untypedListSchema,
    untypedLocationSchema,
    untypedMedicationSchema,
    untypedMedicationAdministrationSchema,
    untypedMedicationDispenseSchema,
    untypedMedicationKnowledgeSchema,
    untypedMedicationRequestSchema,
    untypedMedicationStatementSchema,
    untypedObservationSchema,
    untypedOrganizationSchema,
    untypedPatientSchema,
    untypedPersonSchema,
    untypedPractitionerSchema,
    untypedPractitionerRoleSchema,
    untypedProcedureSchema,
    untypedQuestionnaireSchema,
    untypedQuestionnaireResponseSchema,
    untypedRelatedPersonSchema,
    untypedScheduleSchema,
    untypedServiceRequestSchema,
    untypedSlotSchema,
    untypedSpecimenSchema,
    untypedSubscriptionSchema,
    untypedSubstanceSchema,
    untypedTaskSchema,
  ]),
)
