//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type ClinicalUseDefinition,
  type ClinicalUseDefinitionContraindication,
  type ClinicalUseDefinitionIndication,
  type ClinicalUseDefinitionInteraction,
  type ClinicalUseDefinitionInteractionInteractant,
  type ClinicalUseDefinitionUndesirableEffect,
  type ClinicalUseDefinitionWarning,
  type ClinicalUseDefinitionContraindicationOtherTherapy,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  codeableReferenceSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { clinicalUseDefinitionTypeSchema } from '../valueSets/index.js'

const clinicalUseDefinitionContraindicationOtherTherapySchema: ZodType<ClinicalUseDefinitionContraindicationOtherTherapy> =
  backboneElementSchema.extend({
    relationshipType: codeableConceptSchema,
    therapy: codeableReferenceSchema,
  })

const clinicalUseDefinitionContraindicationSchema: ZodType<ClinicalUseDefinitionContraindication> =
  backboneElementSchema.extend({
    diseaseSymptomProcedure: codeableReferenceSchema.optional(),
    diseaseStatus: codeableReferenceSchema.optional(),
    comorbidity: codeableReferenceSchema.array().optional(),
    indication: referenceSchema.array().optional(),
    otherTherapy: clinicalUseDefinitionContraindicationOtherTherapySchema
      .array()
      .optional(),
  })

const clinicalUseDefinitionIndicationSchema: ZodType<ClinicalUseDefinitionIndication> =
  backboneElementSchema.extend({
    diseaseSymptomProcedure: codeableReferenceSchema.optional(),
    diseaseStatus: codeableReferenceSchema.optional(),
    comorbidity: codeableReferenceSchema.array().optional(),
    intendedEffect: codeableReferenceSchema.optional(),
    duration: elementSchema.optional(),
    undesirableEffect: referenceSchema.array().optional(),
    otherTherapy: clinicalUseDefinitionContraindicationOtherTherapySchema
      .array()
      .optional(),
  })

const clinicalUseDefinitionInteractionInteractantSchema: ZodType<ClinicalUseDefinitionInteractionInteractant> =
  backboneElementSchema.extend({
    itemReference: referenceSchema.optional(),
    itemCodeableConcept: codeableConceptSchema.optional(),
  })

const clinicalUseDefinitionInteractionSchema: ZodType<ClinicalUseDefinitionInteraction> =
  backboneElementSchema.extend({
    interactant: clinicalUseDefinitionInteractionInteractantSchema
      .array()
      .optional(),
    type: codeableConceptSchema.optional(),
    effect: codeableReferenceSchema.optional(),
    incidence: codeableConceptSchema.optional(),
    management: codeableConceptSchema.array().optional(),
  })

const clinicalUseDefinitionUndesirableEffectSchema: ZodType<ClinicalUseDefinitionUndesirableEffect> =
  backboneElementSchema.extend({
    symptomConditionEffect: codeableReferenceSchema.optional(),
    classification: codeableConceptSchema.optional(),
    frequencyOfOccurrence: codeableConceptSchema.optional(),
  })

const clinicalUseDefinitionWarningSchema: ZodType<ClinicalUseDefinitionWarning> =
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
  })

/**
 * Zod schema for FHIR ClinicalUseDefinition resource (untyped version).
 */
export const untypedClinicalUseDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ClinicalUseDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    type: clinicalUseDefinitionTypeSchema,
    _type: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    subject: referenceSchema.array().optional(),
    status: codeableConceptSchema.optional(),
    contraindication: clinicalUseDefinitionContraindicationSchema.optional(),
    indication: clinicalUseDefinitionIndicationSchema.optional(),
    interaction: clinicalUseDefinitionInteractionSchema.optional(),
    population: referenceSchema.array().optional(),
    undesirableEffect: clinicalUseDefinitionUndesirableEffectSchema.optional(),
    warning: clinicalUseDefinitionWarningSchema.optional(),
  }),
) satisfies ZodType<ClinicalUseDefinition>

/**
 * Zod schema for FHIR ClinicalUseDefinition resource.
 */
export const clinicalUseDefinitionSchema: ZodType<ClinicalUseDefinition> =
  untypedClinicalUseDefinitionSchema

/**
 * Wrapper class for FHIR ClinicalUseDefinition resources.
 * Provides utility methods for working with clinical use definitions including indications, contraindications, and interactions.
 */
export class FhirClinicalUseDefinition extends FhirDomainResource<ClinicalUseDefinition> {
  // Static Functions

  /**
   * Parses a ClinicalUseDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the ClinicalUseDefinition schema
   * @returns A FhirClinicalUseDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirClinicalUseDefinition {
    return new FhirClinicalUseDefinition(
      clinicalUseDefinitionSchema.parse(value),
    )
  }

  /**
   * Gets all identifier values that match any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns Array of identifier values matching the specified systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value that matches any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values that match any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns Array of identifier values matching the specified types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value that matches any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
