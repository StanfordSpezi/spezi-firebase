//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type PackagedProductDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  marketingStatusSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const packagedProductDefinitionStatusSchema = z.enum(['draft', 'active', 'retired', 'unknown'])

const packagedProductDefinitionLegalStatusOfSupplySchema = z.lazy(() =>
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    jurisdiction: codeableConceptSchema.optional(),
  }),
)

const packagedProductDefinitionPackagePropertySchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueDate: stringSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueAttachment: attachmentSchema.optional(),
  }),
)

const packagedProductDefinitionPackageContainedItemSchema = z.lazy(() =>
  backboneElementSchema.extend({
    item: codeableConceptSchema,
    amount: quantitySchema.optional(),
  }),
)

const packagedProductDefinitionPackageSchema: z.ZodType<any> = z.lazy(() =>
  backboneElementSchema.extend({
    identifier: identifierSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    quantity: intSchema.optional(),
    _quantity: elementSchema.optional(),
    material: codeableConceptSchema.array().optional(),
    alternateMaterial: codeableConceptSchema.array().optional(),
    shelfLifeStorage: backboneElementSchema
      .extend({
        type: codeableConceptSchema.optional(),
        periodDuration: quantitySchema.optional(),
        periodString: stringSchema.optional(),
        _periodString: elementSchema.optional(),
        specialPrecautionsForStorage: codeableConceptSchema.array().optional(),
      })
      .array()
      .optional(),
    manufacturer: referenceSchema.array().optional(),
    property: packagedProductDefinitionPackagePropertySchema.array().optional(),
    containedItem: packagedProductDefinitionPackageContainedItemSchema.array().optional(),
    package: z.lazy(() => packagedProductDefinitionPackageSchema.array().optional()),
  }),
)

export const untypedPackagedProductDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PackagedProductDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    packageFor: referenceSchema.array().optional(),
    status: packagedProductDefinitionStatusSchema.optional(),
    _status: elementSchema.optional(),
    statusDate: dateTimeSchema.optional(),
    _statusDate: elementSchema.optional(),
    containedItemQuantity: quantitySchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    legalStatusOfSupply: packagedProductDefinitionLegalStatusOfSupplySchema.array().optional(),
    marketingStatus: marketingStatusSchema.array().optional(),
    characteristic: codeableConceptSchema.array().optional(),
    copackagedIndicator: booleanSchema.optional(),
    _copackagedIndicator: elementSchema.optional(),
    manufacturer: referenceSchema.array().optional(),
    package: packagedProductDefinitionPackageSchema.optional(),
  }),
) satisfies ZodType<PackagedProductDefinition>

export const packagedProductDefinitionSchema: ZodType<PackagedProductDefinition> =
  untypedPackagedProductDefinitionSchema

export class FhirPackagedProductDefinition extends FhirDomainResource<PackagedProductDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirPackagedProductDefinition {
    return new FhirPackagedProductDefinition(
      packagedProductDefinitionSchema.parse(value),
    )
  }
}
