//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type FhirResource } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { untypedAccountSchema } from './account.js'
import { untypedActivityDefinitionSchema } from './activityDefinition.js'
import { untypedAdministrableProductDefinitionSchema } from './administrableProductDefinition.js'
import { untypedAdverseEventSchema } from './adverseEvent.js'
import { untypedAllergyIntoleranceSchema } from './allergyIntolerance.js'
import { untypedAppointmentSchema } from './appointment.js'
import { untypedAppointmentResponseSchema } from './appointmentResponse.js'
import { untypedAuditEventSchema } from './auditEvent.js'
import { untypedBasicSchema } from './basic.js'
import { untypedBinarySchema } from './binary.js'
import { untypedBiologicallyDerivedProductSchema } from './biologicallyDerivedProduct.js'
import { untypedBodyStructureSchema } from './bodyStructure.js'
import { untypedBundleSchema } from './bundle.js'
import { untypedCapabilityStatementSchema } from './capabilityStatement.js'
import { untypedCarePlanSchema } from './carePlan.js'
import { untypedCareTeamSchema } from './careTeam.js'
import { untypedCatalogEntrySchema } from './catalogEntry.js'
import { untypedChargeItemSchema } from './chargeItem.js'
import { untypedChargeItemDefinitionSchema } from './chargeItemDefinition.js'
import { untypedCitationSchema } from './citation.js'
import { untypedClaimSchema } from './claim.js'
import { untypedClaimResponseSchema } from './claimResponse.js'
import { untypedClinicalImpressionSchema } from './clinicalImpression.js'
import { untypedClinicalUseDefinitionSchema } from './clinicalUseDefinition.js'
import { untypedCodeSystemSchema } from './codeSystem.js'
import { untypedCommunicationSchema } from './communication.js'
import { untypedCommunicationRequestSchema } from './communicationRequest.js'
import { untypedCompartmentDefinitionSchema } from './compartmentDefinition.js'
import { untypedCompositionSchema } from './composition.js'
import { untypedConceptMapSchema } from './conceptMap.js'
import { untypedConditionSchema } from './condition.js'
import { untypedConsentSchema } from './consent.js'
import { untypedContractSchema } from './contract.js'
import { untypedCoverageSchema } from './coverage.js'
import { untypedCoverageEligibilityRequestSchema } from './coverageEligibilityRequest.js'
import { untypedCoverageEligibilityResponseSchema } from './coverageEligibilityResponse.js'
import { untypedDetectedIssueSchema } from './detectedIssue.js'
import { untypedDeviceSchema } from './device.js'
import { untypedDeviceDefinitionSchema } from './deviceDefinition.js'
import { untypedDeviceMetricSchema } from './deviceMetric.js'
import { untypedDeviceRequestSchema } from './deviceRequest.js'
import { untypedDeviceUseStatementSchema } from './deviceUseStatement.js'
import { untypedDiagnosticReportSchema } from './diagnosticReport.js'
import { untypedDocumentManifestSchema } from './documentManifest.js'
import { untypedDocumentReferenceSchema } from './documentReference.js'
import { untypedEncounterSchema } from './encounter.js'
import { untypedEndpointSchema } from './endpoint.js'
import { untypedEnrollmentRequestSchema } from './enrollmentRequest.js'
import { untypedEnrollmentResponseSchema } from './enrollmentResponse.js'
import { untypedEpisodeOfCareSchema } from './episodeOfCare.js'
import { untypedEventDefinitionSchema } from './eventDefinition.js'
import { untypedEvidenceSchema } from './evidence.js'
import { untypedEvidenceReportSchema } from './evidenceReport.js'
import { untypedEvidenceVariableSchema } from './evidenceVariable.js'
import { untypedExampleScenarioSchema } from './exampleScenario.js'
import { untypedExplanationOfBenefitSchema } from './explanationOfBenefit.js'
import { untypedFamilyMemberHistorySchema } from './familyMemberHistory.js'
import { untypedFlagSchema } from './flag.js'
import { untypedGoalSchema } from './goal.js'
import { untypedGraphDefinitionSchema } from './graphDefinition.js'
import { untypedGroupSchema } from './group.js'
import { untypedGuidanceResponseSchema } from './guidanceResponse.js'
import { untypedHealthcareServiceSchema } from './healthcareService.js'
import { untypedImagingStudySchema } from './imagingStudy.js'
import { untypedImmunizationSchema } from './immunization.js'
import { untypedImmunizationEvaluationSchema } from './immunizationEvaluation.js'
import { untypedImmunizationRecommendationSchema } from './immunizationRecommendation.js'
import { untypedImplementationGuideSchema } from './implementationGuide.js'
import { untypedIngredientSchema } from './ingredient.js'
import { untypedInsurancePlanSchema } from './insurancePlan.js'
import { untypedInvoiceSchema } from './invoice.js'
import { untypedLibrarySchema } from './library.js'
import { untypedLinkageSchema } from './linkage.js'
import { untypedListSchema } from './list.js'
import { untypedLocationSchema } from './location.js'
import { untypedManufacturedItemDefinitionSchema } from './manufacturedItemDefinition.js'
import { untypedMeasureSchema } from './measure.js'
import { untypedMeasureReportSchema } from './measureReport.js'
import { untypedMediaSchema } from './media.js'
import { untypedMedicationSchema } from './medication.js'
import { untypedMedicationAdministrationSchema } from './medicationAdministration.js'
import { untypedMedicationDispenseSchema } from './medicationDispense.js'
import { untypedMedicationKnowledgeSchema } from './medicationKnowledge.js'
import { untypedMedicationRequestSchema } from './medicationRequest.js'
import { untypedMedicationStatementSchema } from './medicationStatement.js'
import { untypedMedicinalProductDefinitionSchema } from './medicinalProductDefinition.js'
import { untypedMessageDefinitionSchema } from './messageDefinition.js'
import { untypedMessageHeaderSchema } from './messageHeader.js'
import { untypedMolecularSequenceSchema } from './molecularSequence.js'
import { untypedNamingSystemSchema } from './namingSystem.js'
import { untypedNutritionOrderSchema } from './nutritionOrder.js'
import { untypedNutritionProductSchema } from './nutritionProduct.js'
import { untypedObservationSchema } from './observation.js'
import { untypedObservationDefinitionSchema } from './observationDefinition.js'
import { untypedOperationDefinitionSchema } from './operationDefinition.js'
import { untypedOperationOutcomeSchema } from './operationOutcome.js'
import { untypedOrganizationSchema } from './organization.js'
import { untypedOrganizationAffiliationSchema } from './organizationAffiliation.js'
import { untypedPackagedProductDefinitionSchema } from './packagedProductDefinition.js'
import { untypedParametersSchema } from './parameters.js'
import { untypedPatientSchema } from './patient.js'
import { untypedPaymentNoticeSchema } from './paymentNotice.js'
import { untypedPaymentReconciliationSchema } from './paymentReconciliation.js'
import { untypedPersonSchema } from './person.js'
import { untypedPlanDefinitionSchema } from './planDefinition.js'
import { untypedPractitionerSchema } from './practitioner.js'
import { untypedPractitionerRoleSchema } from './practitionerRole.js'
import { untypedProcedureSchema } from './procedure.js'
import { untypedProvenanceSchema } from './provenance.js'
import { untypedQuestionnaireSchema } from './questionnaire.js'
import { untypedQuestionnaireResponseSchema } from './questionnaireResponse.js'
import { untypedRegulatedAuthorizationSchema } from './regulatedAuthorization.js'
import { untypedRelatedPersonSchema } from './relatedPerson.js'
import { untypedRequestGroupSchema } from './requestGroup.js'
import { untypedResearchDefinitionSchema } from './researchDefinition.js'
import { untypedResearchElementDefinitionSchema } from './researchElementDefinition.js'
import { untypedResearchStudySchema } from './researchStudy.js'
import { untypedResearchSubjectSchema } from './researchSubject.js'
import { untypedRiskAssessmentSchema } from './riskAssessment.js'
import { untypedScheduleSchema } from './schedule.js'
import { untypedSearchParameterSchema } from './searchParameter.js'
import { untypedServiceRequestSchema } from './serviceRequest.js'
import { untypedSlotSchema } from './slot.js'
import { untypedSpecimenSchema } from './specimen.js'
import { untypedSpecimenDefinitionSchema } from './specimenDefinition.js'
import { untypedStructureDefinitionSchema } from './structureDefinition.js'
import { untypedStructureMapSchema } from './structureMap.js'
import { untypedSubscriptionSchema } from './subscription.js'
import { untypedSubscriptionStatusSchema } from './subscriptionStatus.js'
import { untypedSubscriptionTopicSchema } from './subscriptionTopic.js'
import { untypedSubstanceSchema } from './substance.js'
import { untypedSubstanceDefinitionSchema } from './substanceDefinition.js'
import { untypedSupplyDeliverySchema } from './supplyDelivery.js'
import { untypedSupplyRequestSchema } from './supplyRequest.js'
import { untypedTaskSchema } from './task.js'
import { untypedTerminologyCapabilitiesSchema } from './terminologyCapabilities.js'
import { untypedTestReportSchema } from './testReport.js'
import { untypedTestScriptSchema } from './testScript.js'
import { untypedValueSetSchema } from './valueSet.js'
import { untypedVerificationResultSchema } from './verificationResult.js'
import { untypedVisionPrescriptionSchema } from './visionPrescription.js'

export const fhirResourceSchema: ZodType<FhirResource> = z.lazy(() =>
  z.discriminatedUnion('resourceType', [
    untypedAccountSchema,
    untypedActivityDefinitionSchema,
    untypedAdministrableProductDefinitionSchema,
    untypedAdverseEventSchema,
    untypedAllergyIntoleranceSchema,
    untypedAppointmentSchema,
    untypedAppointmentResponseSchema,
    untypedAuditEventSchema,
    untypedBasicSchema,
    untypedBinarySchema,
    untypedBiologicallyDerivedProductSchema,
    untypedBodyStructureSchema,
    untypedBundleSchema,
    untypedCapabilityStatementSchema,
    untypedCarePlanSchema,
    untypedCareTeamSchema,
    untypedCatalogEntrySchema,
    untypedChargeItemSchema,
    untypedChargeItemDefinitionSchema,
    untypedCitationSchema,
    untypedClaimSchema,
    untypedClaimResponseSchema,
    untypedClinicalImpressionSchema,
    untypedClinicalUseDefinitionSchema,
    untypedCodeSystemSchema,
    untypedCommunicationSchema,
    untypedCommunicationRequestSchema,
    untypedCompartmentDefinitionSchema,
    untypedCompositionSchema,
    untypedConceptMapSchema,
    untypedConditionSchema,
    untypedConsentSchema,
    untypedContractSchema,
    untypedCoverageSchema,
    untypedCoverageEligibilityRequestSchema,
    untypedCoverageEligibilityResponseSchema,
    untypedDetectedIssueSchema,
    untypedDeviceSchema,
    untypedDeviceDefinitionSchema,
    untypedDeviceMetricSchema,
    untypedDeviceRequestSchema,
    untypedDeviceUseStatementSchema,
    untypedDiagnosticReportSchema,
    untypedDocumentManifestSchema,
    untypedDocumentReferenceSchema,
    untypedEncounterSchema,
    untypedEndpointSchema,
    untypedEnrollmentRequestSchema,
    untypedEnrollmentResponseSchema,
    untypedEpisodeOfCareSchema,
    untypedEventDefinitionSchema,
    untypedEvidenceSchema,
    untypedEvidenceReportSchema,
    untypedEvidenceVariableSchema,
    untypedExampleScenarioSchema,
    untypedExplanationOfBenefitSchema,
    untypedFamilyMemberHistorySchema,
    untypedFlagSchema,
    untypedGoalSchema,
    untypedGraphDefinitionSchema,
    untypedGroupSchema,
    untypedGuidanceResponseSchema,
    untypedHealthcareServiceSchema,
    untypedImagingStudySchema,
    untypedImplementationGuideSchema,
    untypedImmunizationSchema,
    untypedImmunizationEvaluationSchema,
    untypedImmunizationRecommendationSchema,
    untypedIngredientSchema,
    untypedInsurancePlanSchema,
    untypedInvoiceSchema,
    untypedLibrarySchema,
    untypedLinkageSchema,
    untypedListSchema,
    untypedLocationSchema,
    untypedManufacturedItemDefinitionSchema,
    untypedMeasureSchema,
    untypedMeasureReportSchema,
    untypedMediaSchema,
    untypedMedicationSchema,
    untypedMedicationAdministrationSchema,
    untypedMedicationDispenseSchema,
    untypedMedicationKnowledgeSchema,
    untypedMedicationRequestSchema,
    untypedMedicationStatementSchema,
    untypedMedicinalProductDefinitionSchema,
    untypedMessageDefinitionSchema,
    untypedMessageHeaderSchema,
    untypedMolecularSequenceSchema,
    untypedNamingSystemSchema,
    untypedNutritionOrderSchema,
    untypedNutritionProductSchema,
    untypedObservationSchema,
    untypedObservationDefinitionSchema,
    untypedOperationDefinitionSchema,
    untypedOperationOutcomeSchema,
    untypedOrganizationSchema,
    untypedOrganizationAffiliationSchema,
    untypedPackagedProductDefinitionSchema,
    untypedParametersSchema,
    untypedPatientSchema,
    untypedPaymentNoticeSchema,
    untypedPaymentReconciliationSchema,
    untypedPersonSchema,
    untypedPlanDefinitionSchema,
    untypedPractitionerSchema,
    untypedPractitionerRoleSchema,
    untypedProcedureSchema,
    untypedProvenanceSchema,
    untypedQuestionnaireSchema,
    untypedQuestionnaireResponseSchema,
    untypedRegulatedAuthorizationSchema,
    untypedRelatedPersonSchema,
    untypedRequestGroupSchema,
    untypedResearchDefinitionSchema,
    untypedResearchElementDefinitionSchema,
    untypedResearchStudySchema,
    untypedResearchSubjectSchema,
    untypedRiskAssessmentSchema,
    untypedScheduleSchema,
    untypedSearchParameterSchema,
    untypedServiceRequestSchema,
    untypedSlotSchema,
    untypedSpecimenSchema,
    untypedSpecimenDefinitionSchema,
    untypedStructureDefinitionSchema,
    untypedStructureMapSchema,
    untypedSubscriptionSchema,
    untypedSubscriptionStatusSchema,
    untypedSubscriptionTopicSchema,
    untypedSubstanceSchema,
    untypedSubstanceDefinitionSchema,
    untypedSupplyDeliverySchema,
    untypedSupplyRequestSchema,
    untypedTaskSchema,
    untypedTerminologyCapabilitiesSchema,
    untypedTestReportSchema,
    untypedTestScriptSchema,
    untypedValueSetSchema,
    untypedVerificationResultSchema,
    untypedVisionPrescriptionSchema,
  ]),
)
