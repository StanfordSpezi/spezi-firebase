//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type PackagedProductDefinition,
  type PackagedProductDefinitionLegalStatusOfSupply,
  type PackagedProductDefinitionPackage,
  type PackagedProductDefinitionPackageContainedItem,
  type PackagedProductDefinitionPackageProperty,
  type PackagedProductDefinitionPackageShelfLifeStorage,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codeableReferenceSchema,
  dateSchema,
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

const packagedProductDefinitionLegalStatusOfSupplySchema: ZodType<PackagedProductDefinitionLegalStatusOfSupply> =
  backboneElementSchema.extend({
    code: codeableConceptSchema.optional(),
    jurisdiction: codeableConceptSchema.optional(),
  })

const packagedProductDefinitionPackageShelfLifeStorageSchema: ZodType<PackagedProductDefinitionPackageShelfLifeStorage> =
  backboneElementSchema.extend({
    periodDuration: quantitySchema.optional(),
    periodString: stringSchema.optional(),
    _periodString: elementSchema.optional(),
    specialPrecautionsForStorage: codeableConceptSchema.array().optional(),
    type: codeableConceptSchema.optional(),
  })

const packagedProductDefinitionPackagePropertySchema: ZodType<PackagedProductDefinitionPackageProperty> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueDate: dateSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueAttachment: attachmentSchema.optional(),
  })

const packagedProductDefinitionPackageContainedItemSchema: ZodType<PackagedProductDefinitionPackageContainedItem> =
  backboneElementSchema.extend({
    amount: quantitySchema.optional(),
    item: codeableReferenceSchema,
  })

const packagedProductDefinitionPackageSchema: ZodType<PackagedProductDefinitionPackage> =
  backboneElementSchema.extend({
    alternateMaterial: codeableConceptSchema.array().optional(),
    containedItem: packagedProductDefinitionPackageContainedItemSchema
      .array()
      .optional(),
    identifier: identifierSchema.array().optional(),
    manufacturer: referenceSchema.array().optional(),
    material: codeableConceptSchema.array().optional(),
    get package() {
      return packagedProductDefinitionPackageSchema.array().optional()
    },
    property: packagedProductDefinitionPackagePropertySchema.array().optional(),
    quantity: intSchema.optional(),
    shelfLifeStorage: packagedProductDefinitionPackageShelfLifeStorageSchema
      .array()
      .optional(),
    type: codeableConceptSchema.optional(),
  })

/**
 * Zod schema for FHIR PackagedProductDefinition resource (untyped version).
 */
export const untypedPackagedProductDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('PackagedProductDefinition').readonly(),
    characteristic: codeableConceptSchema.array().optional(),
    containedItemQuantity: quantitySchema.array().optional(),
    copackagedIndicator: booleanSchema.optional(),
    _copackagedIndicator: elementSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    legalStatusOfSupply: packagedProductDefinitionLegalStatusOfSupplySchema
      .array()
      .optional(),
    manufacturer: referenceSchema.array().optional(),
    marketingStatus: marketingStatusSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    package: packagedProductDefinitionPackageSchema.optional(),
    packageFor: referenceSchema.array().optional(),
    status: codeableConceptSchema.optional(),
    statusDate: dateTimeSchema.optional(),
    _statusDate: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
  }),
) satisfies ZodType<PackagedProductDefinition>

/**
 * Zod schema for FHIR PackagedProductDefinition resource.
 */
export const packagedProductDefinitionSchema: ZodType<PackagedProductDefinition> =
  untypedPackagedProductDefinitionSchema

/**
 * Wrapper class for FHIR PackagedProductDefinition resources.
 * Provides utility methods for working with packaged product definitions and pharmaceutical packaging.
 */
export class FhirPackagedProductDefinition extends FhirDomainResource<PackagedProductDefinition> {
  // Static Functions

  /**
   * Parses a PackagedProductDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the PackagedProductDefinition schema
   * @returns A FhirPackagedProductDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirPackagedProductDefinition {
    return new FhirPackagedProductDefinition(
      packagedProductDefinitionSchema.parse(value),
    )
  }
}
