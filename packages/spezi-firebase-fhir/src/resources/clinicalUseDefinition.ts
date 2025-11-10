//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ClinicalUseDefinition,
  type ClinicalUseDefinitionContraindication,
  type ClinicalUseDefinitionIndication,
  type ClinicalUseDefinitionInteraction,
  type ClinicalUseDefinitionInteractionInteractant,
  type ClinicalUseDefinitionUndesirableEffect,
  type ClinicalUseDefinitionWarning,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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

const clinicalUseDefinitionContraindicationSchema: ZodType<ClinicalUseDefinitionContraindication> =
  backboneElementSchema.extend({
    diseaseSymptomProcedure: codeableReferenceSchema.optional(),
    diseaseStatus: codeableReferenceSchema.optional(),
    comorbidity: codeableReferenceSchema.array().optional(),
    indication: referenceSchema.array().optional(),
    otherTherapy: backboneElementSchema
      .extend({
        relationshipType: codeableConceptSchema,
        therapy: codeableReferenceSchema,
      })
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
    otherTherapy: backboneElementSchema
      .extend({
        relationshipType: codeableConceptSchema,
        therapy: codeableReferenceSchema,
      })
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

export const clinicalUseDefinitionSchema: ZodType<ClinicalUseDefinition> =
  untypedClinicalUseDefinitionSchema

export class FhirClinicalUseDefinition extends FhirDomainResource<ClinicalUseDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirClinicalUseDefinition {
    return new FhirClinicalUseDefinition(
      clinicalUseDefinitionSchema.parse(value),
    )
  }
}
