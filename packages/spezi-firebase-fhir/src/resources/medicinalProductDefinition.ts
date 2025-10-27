//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MedicinalProductDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  codingSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  marketingStatusSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const medicinalProductDefinitionStatusSchema = z.enum(['draft', 'active', 'retired', 'unknown'])

const medicinalProductDefinitionContactSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    contact: referenceSchema,
  }),
)

const medicinalProductDefinitionNameSchema = z.lazy(() =>
  backboneElementSchema.extend({
    productName: stringSchema,
    _productName: elementSchema.optional(),
    namePart: backboneElementSchema
      .extend({
        part: stringSchema,
        _part: elementSchema.optional(),
        type: codingSchema,
      })
      .array()
      .optional(),
    countryLanguage: backboneElementSchema
      .extend({
        country: codeableConceptSchema,
        jurisdiction: codeableConceptSchema.optional(),
        language: codeableConceptSchema,
      })
      .array()
      .optional(),
  }),
)

const medicinalProductDefinitionCrossReferenceSchema = z.lazy(() =>
  backboneElementSchema.extend({
    product: codeableConceptSchema,
    type: codeableConceptSchema.optional(),
  }),
)

const medicinalProductDefinitionOperationSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    effectiveDate: periodSchema.optional(),
    organization: referenceSchema.array().optional(),
    confidentialityIndicator: codeableConceptSchema.optional(),
  }),
)

const medicinalProductDefinitionCharacteristicSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: elementSchema.optional(),
    valueDate: stringSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueBoolean: z.boolean().optional(),
    _valueBoolean: elementSchema.optional(),
    valueAttachment: elementSchema.optional(),
  }),
)

export const untypedMedicinalProductDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicinalProductDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    domain: codeableConceptSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    status: medicinalProductDefinitionStatusSchema.optional(),
    _status: elementSchema.optional(),
    statusDate: dateTimeSchema.optional(),
    _statusDate: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    combinedPharmaceuticalDoseForm: codeableConceptSchema.optional(),
    indication: stringSchema.optional(),
    _indication: elementSchema.optional(),
    legalStatusOfSupply: codeableConceptSchema.optional(),
    additionalMonitoringIndicator: codeableConceptSchema.optional(),
    specialMeasures: codeableConceptSchema.array().optional(),
    paediatricUseIndicator: codeableConceptSchema.optional(),
    classification: codeableConceptSchema.array().optional(),
    marketingStatus: marketingStatusSchema.array().optional(),
    packagedMedicinalProduct: codeableConceptSchema.array().optional(),
    ingredient: codeableConceptSchema.array().optional(),
    impurity: codeableConceptSchema.array().optional(),
    attachedDocument: referenceSchema.array().optional(),
    masterFile: referenceSchema.array().optional(),
    contact: medicinalProductDefinitionContactSchema.array().optional(),
    clinicalTrial: referenceSchema.array().optional(),
    name: medicinalProductDefinitionNameSchema.array(),
    crossReference: medicinalProductDefinitionCrossReferenceSchema.array().optional(),
    operation: medicinalProductDefinitionOperationSchema.array().optional(),
    characteristic: medicinalProductDefinitionCharacteristicSchema.array().optional(),
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
