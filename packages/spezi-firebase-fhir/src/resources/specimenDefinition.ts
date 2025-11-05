//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  SpecimenDefinitionTypeTested,
  SpecimenDefinitionTypeTestedContainer,
  SpecimenDefinitionTypeTestedContainerAdditive,
  SpecimenDefinitionTypeTestedHandling,
  type SpecimenDefinition,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { specimenDefinitionTypeTestedPreferenceSchema } from '../valueSets/index.js'

const specimenDefinitionTypeTestedContainerAdditiveSchema: ZodType<SpecimenDefinitionTypeTestedContainerAdditive> =
  backboneElementSchema.extend({
    additiveCodeableConcept: codeableConceptSchema.optional(),
    additiveReference: referenceSchema.optional(),
  })

const specimenDefinitionTypeTestedContainerSchema: ZodType<SpecimenDefinitionTypeTestedContainer> =
  backboneElementSchema.extend({
    material: codeableConceptSchema.optional(),
    type: codeableConceptSchema.optional(),
    cap: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    capacity: quantitySchema.optional(),
    minimumVolumeQuantity: quantitySchema.optional(),
    minimumVolumeString: stringSchema.optional(),
    _minimumVolumeString: elementSchema.optional(),
    additive: specimenDefinitionTypeTestedContainerAdditiveSchema
      .array()
      .optional(),
    preparation: stringSchema.optional(),
    _preparation: elementSchema.optional(),
  })

const specimenDefinitionTypeTestedHandlingSchema: ZodType<SpecimenDefinitionTypeTestedHandling> =
  backboneElementSchema.extend({
    temperatureQualifier: codeableConceptSchema.optional(),
    temperatureRange: rangeSchema.optional(),
    maxDuration: quantitySchema.optional(),
    instruction: stringSchema.optional(),
    _instruction: elementSchema.optional(),
  })

const specimenDefinitionTypeTestedSchema: ZodType<SpecimenDefinitionTypeTested> =
  backboneElementSchema.extend({
    isDerived: booleanSchema.optional(),
    _isDerived: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    preference: specimenDefinitionTypeTestedPreferenceSchema,
    _preference: elementSchema.optional(),
    container: specimenDefinitionTypeTestedContainerSchema.optional(),
    requirement: stringSchema.optional(),
    _requirement: elementSchema.optional(),
    retentionTime: quantitySchema.optional(),
    rejectionCriterion: codeableConceptSchema.array().optional(),
    handling: specimenDefinitionTypeTestedHandlingSchema.array().optional(),
  })

export const untypedSpecimenDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SpecimenDefinition').readonly(),
    identifier: identifierSchema.optional(),
    typeCollected: codeableConceptSchema.optional(),
    patientPreparation: codeableConceptSchema.array().optional(),
    timeAspect: stringSchema.optional(),
    _timeAspect: elementSchema.optional(),
    collection: codeableConceptSchema.array().optional(),
    typeTested: specimenDefinitionTypeTestedSchema.array().optional(),
  }),
) satisfies ZodType<SpecimenDefinition>

export const specimenDefinitionSchema: ZodType<SpecimenDefinition> =
  untypedSpecimenDefinitionSchema

export class FhirSpecimenDefinition extends FhirDomainResource<SpecimenDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirSpecimenDefinition {
    return new FhirSpecimenDefinition(specimenDefinitionSchema.parse(value))
  }
}
