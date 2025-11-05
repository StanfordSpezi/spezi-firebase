//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type MedicinalProductDefinition,
  type MedicinalProductDefinitionCharacteristic,
  type MedicinalProductDefinitionContact,
  type MedicinalProductDefinitionCrossReference,
  type MedicinalProductDefinitionName,
  type MedicinalProductDefinitionNameCountryLanguage,
  type MedicinalProductDefinitionNameNamePart,
  type MedicinalProductDefinitionOperation,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  codeableReferenceSchema,
  codingSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const medicinalProductDefinitionCharacteristicSchema: ZodType<MedicinalProductDefinitionCharacteristic> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueQuantity: elementSchema.optional(),
    valueInteger: z.number().optional(),
    valueDate: stringSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueBoolean: z.boolean().optional(),
    _valueBoolean: elementSchema.optional(),
    valueAttachment: elementSchema.optional(),
  })

const medicinalProductDefinitionContactSchema: ZodType<MedicinalProductDefinitionContact> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    contact: referenceSchema,
  })

const medicinalProductDefinitionCrossReferenceSchema: ZodType<MedicinalProductDefinitionCrossReference> =
  backboneElementSchema.extend({
    product: codeableReferenceSchema,
    type: codeableConceptSchema.optional(),
  })

const medicinalProductDefinitionNameNamePartSchema: ZodType<MedicinalProductDefinitionNameNamePart> =
  backboneElementSchema.extend({
    part: stringSchema,
    _part: elementSchema.optional(),
    type: codeableConceptSchema,
  })

const medicinalProductDefinitionNameCountryLanguageSchema: ZodType<MedicinalProductDefinitionNameCountryLanguage> =
  backboneElementSchema.extend({
    country: codeableConceptSchema,
    jurisdiction: codeableConceptSchema.optional(),
    language: codeableConceptSchema,
  })

const medicinalProductDefinitionNameSchema: ZodType<MedicinalProductDefinitionName> =
  backboneElementSchema.extend({
    productName: stringSchema,
    _productName: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    namePart: medicinalProductDefinitionNameNamePartSchema.array().optional(),
    countryLanguage: medicinalProductDefinitionNameCountryLanguageSchema
      .array()
      .optional(),
  })

const medicinalProductDefinitionOperationSchema: ZodType<MedicinalProductDefinitionOperation> =
  backboneElementSchema.extend({
    type: codeableReferenceSchema.optional(),
    effectiveDate: elementSchema.optional(),
    organization: referenceSchema.array().optional(),
    confidentialityIndicator: codeableConceptSchema.optional(),
  })

export const untypedMedicinalProductDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicinalProductDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    domain: codeableConceptSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    status: codeableConceptSchema.optional(),
    statusDate: stringSchema.optional(),
    _statusDate: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    combinedPharmaceuticalDoseForm: codeableConceptSchema.optional(),
    route: codeableConceptSchema.array().optional(),
    indication: stringSchema.optional(),
    _indication: elementSchema.optional(),
    legalStatusOfSupply: codeableConceptSchema.optional(),
    additionalMonitoringIndicator: codeableConceptSchema.optional(),
    specialMeasures: codeableConceptSchema.array().optional(),
    pediatricUseIndicator: codeableConceptSchema.optional(),
    classification: codeableConceptSchema.array().optional(),
    packagedMedicinalProduct: codeableConceptSchema.array().optional(),
    ingredient: codeableConceptSchema.array().optional(),
    impurity: codeableReferenceSchema.array().optional(),
    attachedDocument: referenceSchema.array().optional(),
    masterFile: referenceSchema.array().optional(),
    contact: medicinalProductDefinitionContactSchema.array().optional(),
    clinicalTrial: referenceSchema.array().optional(),
    code: codingSchema.array().optional(),
    name: medicinalProductDefinitionNameSchema.array(),
    crossReference: medicinalProductDefinitionCrossReferenceSchema
      .array()
      .optional(),
    operation: medicinalProductDefinitionOperationSchema.array().optional(),
    characteristic: medicinalProductDefinitionCharacteristicSchema
      .array()
      .optional(),
  }),
) satisfies ZodType<MedicinalProductDefinition>

export const medicinalProductDefinitionSchema: ZodType<MedicinalProductDefinition> =
  untypedMedicinalProductDefinitionSchema

export class FhirMedicinalProductDefinition extends FhirDomainResource<MedicinalProductDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirMedicinalProductDefinition {
    return new FhirMedicinalProductDefinition(
      medicinalProductDefinitionSchema.parse(value),
    )
  }
}
