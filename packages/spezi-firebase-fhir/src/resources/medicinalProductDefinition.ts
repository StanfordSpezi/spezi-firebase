//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
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
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codeableReferenceSchema,
  codingSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
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
    valueInteger: intSchema.optional(),
    valueDate: stringSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueBoolean: booleanSchema.optional(),
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

/**
 * Zod schema for FHIR MedicinalProductDefinition resource (untyped version).
 */
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

/**
 * Zod schema for FHIR MedicinalProductDefinition resource.
 */
export const medicinalProductDefinitionSchema: ZodType<MedicinalProductDefinition> =
  untypedMedicinalProductDefinitionSchema

/**
 * Wrapper class for FHIR MedicinalProductDefinition resources.
 * Provides utility methods for working with medicinal product definitions and regulatory information.
 */
export class FhirMedicinalProductDefinition extends FhirDomainResource<MedicinalProductDefinition> {
  // Static Functions

  /**
   * Parses a MedicinalProductDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the MedicinalProductDefinition schema
   * @returns A FhirMedicinalProductDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirMedicinalProductDefinition {
    return new FhirMedicinalProductDefinition(
      medicinalProductDefinitionSchema.parse(value),
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
