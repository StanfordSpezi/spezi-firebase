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
import { untypedBodyStructureSchema } from './bodyStructure.js'
import { untypedCodeSystemSchema } from './codeSystem.js'
import { untypedCompositionSchema } from './composition.js'
import { untypedConceptMapSchema } from './conceptMap.js'
import { untypedConditionSchema } from './condition.js'
import { untypedCoverageSchema } from './coverage.js'
import { untypedDeviceSchema } from './device.js'
import { untypedDeviceDefinitionSchema } from './deviceDefinition.js'
import { untypedDeviceMetricSchema } from './deviceMetric.js'
import { untypedDeviceRequestSchema } from './deviceRequest.js'
import { untypedDeviceUseStatementSchema } from './deviceUseStatement.js'
import { untypedDiagnosticReportSchema } from './diagnosticReport.js'
import { untypedEncounterSchema } from './encounter.js'
import { untypedEndpointSchema } from './endpoint.js'
import { untypedEpisodeOfCareSchema } from './episodeOfCare.js'
import { untypedFamilyMemberHistorySchema } from './familyMemberHistory.js'
import { untypedGroupSchema } from './group.js'
import { untypedHealthcareServiceSchema } from './healthcareService.js'
import { untypedImagingStudySchema } from './imagingStudy.js'
import { untypedImmunizationSchema } from './immunization.js'
import { untypedImmunizationEvaluationSchema } from './immunizationEvaluation.js'
import { untypedImmunizationRecommendationSchema } from './immunizationRecommendation.js'
import { untypedLibrarySchema } from './library.js'
import { untypedLinkageSchema } from './linkage.js'
import { untypedListSchema } from './list.js'
import { untypedLocationSchema } from './location.js'
import { untypedMediaSchema } from './media.js'
import { untypedMedicationSchema } from './medication.js'
import { untypedMedicationAdministrationSchema } from './medicationAdministration.js'
import { untypedMedicationDispenseSchema } from './medicationDispense.js'
import { untypedMedicationKnowledgeSchema } from './medicationKnowledge.js'
import { untypedMedicationRequestSchema } from './medicationRequest.js'
import { untypedMedicationStatementSchema } from './medicationStatement.js'
import { untypedMessageHeaderSchema } from './messageHeader.js'
import { untypedMolecularSequenceSchema } from './molecularSequence.js'
import { untypedNamingSystemSchema } from './namingSystem.js'
import { untypedObservationSchema } from './observation.js'
import { untypedObservationDefinitionSchema } from './observationDefinition.js'
import { untypedOperationOutcomeSchema } from './operationOutcome.js'
import { untypedOrganizationSchema } from './organization.js'
import { untypedOrganizationAffiliationSchema } from './organizationAffiliation.js'
import { untypedParametersSchema } from './parameters.js'
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
import { untypedSpecimenDefinitionSchema } from './specimenDefinition.js'
import { untypedSubscriptionSchema } from './subscription.js'
import { untypedSubstanceSchema } from './substance.js'
import { untypedTaskSchema } from './task.js'
import { untypedTerminologyCapabilitiesSchema } from './terminologyCapabilities.js'
import { untypedValueSetSchema } from './valueSet.js'

export const fhirResourceSchema: ZodType<FhirResource> = z.lazy(() =>
  z.discriminatedUnion('resourceType', [
    untypedAllergyIntoleranceSchema,
    untypedAppointmentSchema,
    untypedAppointmentResponseSchema,
    untypedBodyStructureSchema,
    untypedCodeSystemSchema,
    untypedCompositionSchema,
    untypedConceptMapSchema,
    untypedConditionSchema,
    untypedCoverageSchema,
    untypedDeviceSchema,
    untypedDeviceDefinitionSchema,
    untypedDeviceMetricSchema,
    untypedDeviceRequestSchema,
    untypedDeviceUseStatementSchema,
    untypedDiagnosticReportSchema,
    untypedEncounterSchema,
    untypedEndpointSchema,
    untypedEpisodeOfCareSchema,
    untypedFamilyMemberHistorySchema,
    untypedGroupSchema,
    untypedHealthcareServiceSchema,
    untypedImagingStudySchema,
    untypedImmunizationSchema,
    untypedImmunizationEvaluationSchema,
    untypedImmunizationRecommendationSchema,
    untypedLibrarySchema,
    untypedLinkageSchema,
    untypedListSchema,
    untypedLocationSchema,
    untypedMediaSchema,
    untypedMedicationSchema,
    untypedMedicationAdministrationSchema,
    untypedMedicationDispenseSchema,
    untypedMedicationKnowledgeSchema,
    untypedMedicationRequestSchema,
    untypedMedicationStatementSchema,
    untypedMessageHeaderSchema,
    untypedMolecularSequenceSchema,
    untypedNamingSystemSchema,
    untypedObservationSchema,
    untypedObservationDefinitionSchema,
    untypedOperationOutcomeSchema,
    untypedOrganizationSchema,
    untypedOrganizationAffiliationSchema,
    untypedParametersSchema,
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
    untypedSpecimenDefinitionSchema,
    untypedSubscriptionSchema,
    untypedSubstanceSchema,
    untypedTaskSchema,
    untypedTerminologyCapabilitiesSchema,
    untypedValueSetSchema,
  ]),
)
