//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type SpecimenDefinitionTypeTested,
  type SpecimenDefinitionTypeTestedContainer,
  type SpecimenDefinitionTypeTestedContainerAdditive,
  type SpecimenDefinitionTypeTestedHandling,
  type SpecimenDefinition,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

/**
 * Zod schema for FHIR SpecimenDefinition resource (untyped version).
 */
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

/**
 * Zod schema for FHIR SpecimenDefinition resource.
 */
export const specimenDefinitionSchema: ZodType<SpecimenDefinition> =
  untypedSpecimenDefinitionSchema

/**
 * Wrapper class for FHIR SpecimenDefinition resources.
 * Provides utility methods for working with specimen definitions and collection protocols.
 */
export class FhirSpecimenDefinition extends FhirDomainResource<SpecimenDefinition> {
  // Static Functions

  /**
   * Parses a SpecimenDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the SpecimenDefinition schema
   * @returns A FhirSpecimenDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirSpecimenDefinition {
    return new FhirSpecimenDefinition(specimenDefinitionSchema.parse(value))
  }
}
