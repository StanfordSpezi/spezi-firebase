//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type DeviceDefinitionCapability,
  type DeviceDefinitionDeviceName,
  type DeviceDefinitionMaterial,
  type DeviceDefinitionProperty,
  type DeviceDefinitionSpecialization,
  type DeviceDefinitionUdiDeviceIdentifier,
  type ProdCharacteristic,
  type ProductShelfLife,
  type DeviceDefinition,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { deviceDefinitionNameTypeSchema } from '../valueSets/index.js'

const prodCharacteristicSchema: ZodType<ProdCharacteristic> =
  backboneElementSchema.extend({
    height: quantitySchema.optional(),
    width: quantitySchema.optional(),
    depth: quantitySchema.optional(),
    weight: quantitySchema.optional(),
    nominalVolume: quantitySchema.optional(),
    externalDiameter: quantitySchema.optional(),
    shape: stringSchema.optional(),
    _shape: elementSchema.optional(),
    color: stringSchema.array().optional(),
    _color: elementSchema.array().optional(),
    imprint: stringSchema.array().optional(),
    _imprint: elementSchema.array().optional(),
    image: attachmentSchema.array().optional(),
    scoring: codeableConceptSchema.optional(),
  })

const productShelfLifeSchema: ZodType<ProductShelfLife> =
  backboneElementSchema.extend({
    identifier: identifierSchema.optional(),
    type: codeableConceptSchema,
    period: quantitySchema,
    specialPrecautionsForStorage: codeableConceptSchema.array().optional(),
  })

const deviceDefinitionUdiDeviceIdentifierSchema: ZodType<DeviceDefinitionUdiDeviceIdentifier> =
  backboneElementSchema.extend({
    deviceIdentifier: stringSchema,
    _deviceIdentifier: elementSchema.optional(),
    issuer: stringSchema,
    _issuer: elementSchema.optional(),
    jurisdiction: stringSchema,
    _jurisdiction: elementSchema.optional(),
  })

const deviceDefinitionDeviceNameSchema: ZodType<DeviceDefinitionDeviceName> =
  backboneElementSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    type: deviceDefinitionNameTypeSchema,
    _type: elementSchema.optional(),
  })

const deviceDefinitionSpecializationSchema: ZodType<DeviceDefinitionSpecialization> =
  backboneElementSchema.extend({
    systemType: stringSchema,
    _systemType: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
  })

const deviceDefinitionCapabilitySchema: ZodType<DeviceDefinitionCapability> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    description: codeableConceptSchema.array().optional(),
  })

const deviceDefinitionPropertySchema: ZodType<DeviceDefinitionProperty> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCode: codeableConceptSchema.array().optional(),
    valueQuantity: quantitySchema.array().optional(),
  })

const deviceDefinitionMaterialSchema: ZodType<DeviceDefinitionMaterial> =
  backboneElementSchema.extend({
    substance: codeableConceptSchema,
    alternate: booleanSchema.optional(),
    _alternate: elementSchema.optional(),
    allergenicIndicator: booleanSchema.optional(),
    _allergenicIndicator: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR DeviceDefinition resource (untyped version).
 */
export const untypedDeviceDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DeviceDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    udiDeviceIdentifier: deviceDefinitionUdiDeviceIdentifierSchema
      .array()
      .optional(),
    manufacturerString: stringSchema.optional(),
    _manufacturerString: elementSchema.optional(),
    manufacturerReference: referenceSchema.optional(),
    deviceName: deviceDefinitionDeviceNameSchema.array().optional(),
    modelNumber: stringSchema.optional(),
    _modelNumber: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    specialization: deviceDefinitionSpecializationSchema.array().optional(),
    version: stringSchema.array().optional(),
    _version: elementSchema.array().optional(),
    safety: codeableConceptSchema.array().optional(),
    shelfLifeStorage: productShelfLifeSchema.array().optional(),
    physicalCharacteristics: prodCharacteristicSchema.optional(),
    languageCode: codeableConceptSchema.array().optional(),
    capability: deviceDefinitionCapabilitySchema.array().optional(),
    property: deviceDefinitionPropertySchema.array().optional(),
    owner: referenceSchema.optional(),
    contact: contactPointSchema.array().optional(),
    url: stringSchema.optional(),
    _url: elementSchema.optional(),
    onlineInformation: stringSchema.optional(),
    _onlineInformation: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    quantity: quantitySchema.optional(),
    parentDevice: referenceSchema.optional(),
    material: deviceDefinitionMaterialSchema.array().optional(),
  }),
) satisfies ZodType<DeviceDefinition>

/**
 * Zod schema for FHIR DeviceDefinition resource.
 */
export const deviceDefinitionSchema: ZodType<DeviceDefinition> =
  untypedDeviceDefinitionSchema

/**
 * Wrapper class for FHIR DeviceDefinition resources.
 * Provides utility methods for working with device definitions and specifications.
 */
export class FhirDeviceDefinition extends FhirDomainResource<DeviceDefinition> {
  // Static Functions

  /**
   * Parses a DeviceDefinition resource from unknown data.
   *
   * @param value - The data to parse and validate against the DeviceDefinition schema
   * @returns A FhirDeviceDefinition instance containing the validated resource
   */
  public static parse(value: unknown): FhirDeviceDefinition {
    return new FhirDeviceDefinition(deviceDefinitionSchema.parse(value))
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
