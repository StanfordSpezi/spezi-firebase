//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type SubstanceDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  attachmentSchema,
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const substanceDefinitionStatusSchema = z.enum(['draft', 'active', 'retired', 'unknown'])

const substanceDefinitionMoietySchema = z.lazy(() =>
  backboneElementSchema.extend({
    role: codeableConceptSchema.optional(),
    identifier: identifierSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    stereochemistry: codeableConceptSchema.optional(),
    opticalActivity: codeableConceptSchema.optional(),
    molecularFormula: stringSchema.optional(),
    _molecularFormula: elementSchema.optional(),
    amountQuantity: quantitySchema.optional(),
    amountString: stringSchema.optional(),
    _amountString: elementSchema.optional(),
  }),
)

const substanceDefinitionPropertySchema = z.lazy(() =>
  backboneElementSchema.extend({
    category: codeableConceptSchema.optional(),
    code: codeableConceptSchema.optional(),
    parameters: stringSchema.optional(),
    _parameters: elementSchema.optional(),
    definingSubstance: codeableConceptSchema.optional(),
    amountQuantity: quantitySchema.optional(),
    amountString: stringSchema.optional(),
    _amountString: elementSchema.optional(),
  }),
)

const substanceDefinitionMolecularWeightSchema = z.lazy(() =>
  backboneElementSchema.extend({
    method: codeableConceptSchema.optional(),
    type: codeableConceptSchema.optional(),
    amount: quantitySchema,
  }),
)

const substanceDefinitionStructureSchema = z.lazy(() =>
  backboneElementSchema.extend({
    stereochemistry: codeableConceptSchema.optional(),
    opticalActivity: codeableConceptSchema.optional(),
    molecularFormula: stringSchema.optional(),
    _molecularFormula: elementSchema.optional(),
    molecularFormulaByMoiety: stringSchema.optional(),
    _molecularFormulaByMoiety: elementSchema.optional(),
    isotope: backboneElementSchema
      .extend({
        identifier: identifierSchema.optional(),
        name: codeableConceptSchema.optional(),
        substitution: codeableConceptSchema.optional(),
        halfLife: quantitySchema.optional(),
        molecularWeight: substanceDefinitionMolecularWeightSchema.optional(),
      })
      .array()
      .optional(),
    molecularWeight: substanceDefinitionMolecularWeightSchema.optional(),
    sourceDocument: referenceSchema.array().optional(),
    representation: backboneElementSchema
      .extend({
        type: codeableConceptSchema.optional(),
        representation: stringSchema.optional(),
        _representation: elementSchema.optional(),
        attachment: attachmentSchema.optional(),
      })
      .array()
      .optional(),
  }),
)

const substanceDefinitionCodeSchema = z.lazy(() =>
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    status: codeableConceptSchema.optional(),
    statusDate: stringSchema.optional(),
    _statusDate: elementSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
    source: referenceSchema.array().optional(),
  }),
)

const substanceDefinitionNameSchema = z.lazy(() =>
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
    synonym: z.lazy(() => substanceDefinitionNameSchema.array().optional()),
    translation: z.lazy(() => substanceDefinitionNameSchema.array().optional()),
    official: backboneElementSchema
      .extend({
        authority: codeableConceptSchema.optional(),
        status: codeableConceptSchema.optional(),
        date: stringSchema.optional(),
        _date: elementSchema.optional(),
      })
      .array()
      .optional(),
    source: referenceSchema.array().optional(),
  }),
)

const substanceDefinitionRelationshipSchema = z.lazy(() =>
  backboneElementSchema.extend({
    substanceDefinitionReference: referenceSchema.optional(),
    substanceDefinitionCodeableConcept: codeableConceptSchema.optional(),
    type: codeableConceptSchema,
    isDefining: z.boolean().optional(),
    _isDefining: elementSchema.optional(),
    amountQuantity: quantitySchema.optional(),
    amountRatio: ratioSchema.optional(),
    amountRatioLowLimit: ratioSchema.optional(),
    amountString: stringSchema.optional(),
    _amountString: elementSchema.optional(),
    amountType: codeableConceptSchema.optional(),
    source: referenceSchema.array().optional(),
  }),
)

const substanceDefinitionSourceMaterialSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    genus: codeableConceptSchema.optional(),
    species: codeableConceptSchema.optional(),
    part: codeableConceptSchema.optional(),
    countryOfOrigin: codeableConceptSchema.array().optional(),
  }),
)

export const untypedSubstanceDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SubstanceDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    status: substanceDefinitionStatusSchema.optional(),
    _status: elementSchema.optional(),
    classification: codeableConceptSchema.array().optional(),
    domain: codeableConceptSchema.optional(),
    grade: codeableConceptSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    informationSource: referenceSchema.array().optional(),
    note: elementSchema.array().optional(),
    manufacturer: referenceSchema.array().optional(),
    supplier: referenceSchema.array().optional(),
    moiety: substanceDefinitionMoietySchema.array().optional(),
    property: substanceDefinitionPropertySchema.array().optional(),
    referenceInformation: referenceSchema.optional(),
    structure: substanceDefinitionStructureSchema.optional(),
    code: substanceDefinitionCodeSchema.array().optional(),
    name: substanceDefinitionNameSchema.array().optional(),
    molecularWeight: substanceDefinitionMolecularWeightSchema.array().optional(),
    relationship: substanceDefinitionRelationshipSchema.array().optional(),
    nucleicAcid: referenceSchema.optional(),
    polymer: referenceSchema.optional(),
    protein: referenceSchema.optional(),
    sourceMaterial: substanceDefinitionSourceMaterialSchema.optional(),
  }),
) satisfies ZodType<SubstanceDefinition>

export const substanceDefinitionSchema: ZodType<SubstanceDefinition> =
  untypedSubstanceDefinitionSchema

export class FhirSubstanceDefinition extends FhirDomainResource<SubstanceDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirSubstanceDefinition {
    return new FhirSubstanceDefinition(substanceDefinitionSchema.parse(value))
  }
}
