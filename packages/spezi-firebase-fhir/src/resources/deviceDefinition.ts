//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  DeviceDefinitionCapability,
  DeviceDefinitionDeviceName,
  DeviceDefinitionMaterial,
  DeviceDefinitionProperty,
  DeviceDefinitionSpecialization,
  DeviceDefinitionUdiDeviceIdentifier,
  ProdCharacteristic,
  ProductShelfLife,
  type DeviceDefinition,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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

export const deviceDefinitionSchema: ZodType<DeviceDefinition> =
  untypedDeviceDefinitionSchema

export class FhirDeviceDefinition extends FhirDomainResource<DeviceDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirDeviceDefinition {
    return new FhirDeviceDefinition(deviceDefinitionSchema.parse(value))
  }
}
