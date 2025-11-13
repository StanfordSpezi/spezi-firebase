//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type SubstanceDefinition,
  type SubstanceDefinitionName,
  type SubstanceDefinitionMoiety,
  type SubstanceDefinitionProperty,
  type SubstanceDefinitionRelationship,
  type SubstanceDefinitionSourceMaterial,
  type SubstanceDefinitionMolecularWeight,
  type SubstanceDefinitionStructure,
  type SubstanceDefinitionStructureRepresentation,
  type SubstanceDefinitionNameOfficial,
  type SubstanceDefinitionCode,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const substanceDefinitionCodeSchema: ZodType<SubstanceDefinitionCode> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    status: codeableConceptSchema.optional(),
    statusDate: stringSchema.optional(),
    _statusDate: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    source: referenceSchema.array().optional(),
  })

const substanceDefinitionNameOfficialSchema: ZodType<SubstanceDefinitionNameOfficial> =
  backboneElementSchema.extend({
    authority: codeableConceptSchema.optional(),
    status: codeableConceptSchema.optional(),
    date: stringSchema.optional(),
    _date: elementSchema.optional(),
  })

const substanceDefinitionNameSchema: ZodType<SubstanceDefinitionName> =
  backboneElementSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    status: codeableConceptSchema.optional(),
    preferred: z.boolean().optional(),
    _preferred: elementSchema.optional(),
    language: codeableConceptSchema.array().optional(),
    domain: codeableConceptSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    get synonym() {
      return substanceDefinitionNameSchema.array().optional()
    },
    get translation() {
      return substanceDefinitionNameSchema.array().optional()
    },
    official: substanceDefinitionNameOfficialSchema.array().optional(),
    source: referenceSchema.array().optional(),
  })

const substanceDefinitionMoietySchema: ZodType<SubstanceDefinitionMoiety> =
  backboneElementSchema.extend({
    role: codeableConceptSchema.optional(),
    identifier: identifierSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    stereochemistry: codeableConceptSchema.optional(),
    opticalActivity: codeableConceptSchema.optional(),
    molecularFormula: stringSchema.optional(),
    _molecularFormula: elementSchema.optional(),
    amountQuantity: elementSchema.optional(),
    amountString: stringSchema.optional(),
    _amountString: elementSchema.optional(),
    measurementType: codeableConceptSchema.optional(),
  })

const substanceDefinitionPropertySchema: ZodType<SubstanceDefinitionProperty> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: elementSchema.optional(),
    valueDate: stringSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueBoolean: z.boolean().optional(),
    _valueBoolean: elementSchema.optional(),
    valueAttachment: elementSchema.optional(),
  })

const substanceDefinitionRelationshipSchema: ZodType<SubstanceDefinitionRelationship> =
  backboneElementSchema.extend({
    substanceDefinitionReference: referenceSchema.optional(),
    substanceDefinitionCodeableConcept: codeableConceptSchema.optional(),
    type: codeableConceptSchema,
    isDefining: booleanSchema.optional(),
    _isDefining: elementSchema.optional(),
    amountQuantity: elementSchema.optional(),
    amountRatio: elementSchema.optional(),
    amountString: stringSchema.optional(),
    _amountString: elementSchema.optional(),
    ratioHighLimitAmount: elementSchema.optional(),
    comparator: codeableConceptSchema.optional(),
    source: referenceSchema.array().optional(),
  })

const substanceDefinitionSourceMaterialSchema: ZodType<SubstanceDefinitionSourceMaterial> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    genus: codeableConceptSchema.optional(),
    species: codeableConceptSchema.optional(),
    part: codeableConceptSchema.optional(),
    countryOfOrigin: codeableConceptSchema.array().optional(),
  })

const substanceDefinitionMolecularWeightSchema: ZodType<SubstanceDefinitionMolecularWeight> =
  backboneElementSchema.extend({
    method: codeableConceptSchema.optional(),
    type: codeableConceptSchema.optional(),
    amount: quantitySchema,
  })

const substanceDefinitionStructureRepresentationSchema: ZodType<SubstanceDefinitionStructureRepresentation> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    representation: stringSchema.optional(),
    _representation: elementSchema.optional(),
    format: codeableConceptSchema.optional(),
    document: referenceSchema.optional(),
  })

const substanceDefinitionStructureSchema: ZodType<SubstanceDefinitionStructure> =
  backboneElementSchema.extend({
    stereochemistry: codeableConceptSchema.optional(),
    opticalActivity: codeableConceptSchema.optional(),
    molecularFormula: stringSchema.optional(),
    _molecularFormula: elementSchema.optional(),
    molecularFormulaByMoiety: stringSchema.optional(),
    _molecularFormulaByMoiety: elementSchema.optional(),
    molecularWeight: substanceDefinitionMolecularWeightSchema.optional(),
    technique: codeableConceptSchema.array().optional(),
    sourceDocument: referenceSchema.array().optional(),
    representation: substanceDefinitionStructureRepresentationSchema
      .array()
      .optional(),
  })

/**
 * Zod schema for FHIR SubstanceDefinition resource (untyped version).
 */
export const untypedSubstanceDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SubstanceDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    status: codeableConceptSchema.optional(),
    classification: codeableConceptSchema.array().optional(),
    domain: codeableConceptSchema.optional(),
    grade: codeableConceptSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    informationSource: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    manufacturer: referenceSchema.array().optional(),
    supplier: referenceSchema.array().optional(),
    moiety: substanceDefinitionMoietySchema.array().optional(),
    property: substanceDefinitionPropertySchema.array().optional(),
    referenceInformation: referenceSchema.optional(),
    molecularWeight: substanceDefinitionMolecularWeightSchema
      .array()
      .optional(),
    structure: substanceDefinitionStructureSchema.optional(),
    code: substanceDefinitionCodeSchema.array().optional(),
    name: substanceDefinitionNameSchema.array().optional(),
    relationship: substanceDefinitionRelationshipSchema.array().optional(),
    nucleicAcid: referenceSchema.optional(),
    polymer: referenceSchema.optional(),
    protein: referenceSchema.optional(),
    sourceMaterial: substanceDefinitionSourceMaterialSchema.optional(),
  }),
) satisfies ZodType<SubstanceDefinition>

/**
 * Zod schema for FHIR SubstanceDefinition resource.
 */
export const substanceDefinitionSchema: ZodType<SubstanceDefinition> =
  untypedSubstanceDefinitionSchema

/**
 * Wrapper class for FHIR SubstanceDefinition resources.
 * Provides utility methods for working with substance definitions containing detailed information about the composition and properties of substances.
 */
export class FhirSubstanceDefinition extends FhirDomainResource<SubstanceDefinition> {
  // Static Functions

  /**
   * Parses a SubstanceDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the SubstanceDefinition schema
   * @returns A FhirSubstanceDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirSubstanceDefinition {
    return new FhirSubstanceDefinition(substanceDefinitionSchema.parse(value))
  }

  /**
   * Retrieves all identifier values matching any of the specified system URIs.
   *
   * @param system - One or more system URIs to filter identifiers by
   * @returns Array of identifier values from matching systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Retrieves the first identifier value matching any of the specified system URIs.
   *
   * @param system - One or more system URIs to filter identifiers by
   * @returns The first matching identifier value, or undefined if none found
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Retrieves all identifier values matching any of the specified type codings.
   *
   * @param type - One or more Coding objects representing identifier types
   * @returns Array of identifier values from matching types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Retrieves the first identifier value matching any of the specified type codings.
   *
   * @param type - One or more Coding objects representing identifier types
   * @returns The first matching identifier value, or undefined if none found
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
