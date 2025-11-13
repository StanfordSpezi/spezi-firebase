//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type DeviceDeviceName,
  type DeviceProperty,
  type DeviceSpecialization,
  type DeviceUdiCarrier,
  type DeviceVersion,
  type Device,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  contactPointSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { deviceNameTypeSchema, deviceStatusSchema } from '../valueSets/index.js'

const deviceDeviceNameSchema: ZodType<DeviceDeviceName> =
  backboneElementSchema.extend({
    name: stringSchema,
    type: deviceNameTypeSchema,
    _type: elementSchema.optional(),
  })

const devicePropertySchema: ZodType<DeviceProperty> =
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCode: codeableConceptSchema.array().optional(),
    valueQuantity: quantitySchema.array().optional(),
  })

const deviceDefinitionSpecializationSchema: ZodType<DeviceSpecialization> =
  backboneElementSchema.extend({
    systemType: codeableConceptSchema,
    _systemType: elementSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
  })

const deviceUdiCarrierSchema: ZodType<DeviceUdiCarrier> =
  backboneElementSchema.extend({
    deviceIdentifier: stringSchema,
    _deviceIdentifier: elementSchema.optional(),
    issuer: stringSchema.optional(),
    _issuer: elementSchema.optional(),
    jurisdiction: stringSchema.optional(),
    _jurisdiction: elementSchema.optional(),
    carrierHRF: stringSchema.optional(),
    _carrierHRF: elementSchema.optional(),
    carrierAIDC: stringSchema.optional(),
    _carrierAIDC: elementSchema.optional(),
  })

const deviceVersionSchema: ZodType<DeviceVersion> =
  backboneElementSchema.extend({
    type: codeableConceptSchema.optional(),
    component: codeableConceptSchema.optional(),
    value: stringSchema,
    _value: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR Device resource (untyped version).
 */
export const untypedDeviceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Device').readonly(),
    contact: contactPointSchema.array().optional(),
    definition: referenceSchema.optional(),
    deviceName: deviceDeviceNameSchema.array().optional(),
    distinctIdentifier: stringSchema.optional(),
    _distinctIdentifier: elementSchema.optional(),
    expirationDate: stringSchema.optional(),
    _expirationDate: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    location: referenceSchema.optional(),
    lotNumber: stringSchema.optional(),
    _lotNumber: elementSchema.optional(),
    manufactureDate: stringSchema.optional(),
    _manufactureDate: elementSchema.optional(),
    manufacturer: stringSchema.optional(),
    _manufacturer: elementSchema.optional(),
    modelNumber: stringSchema.optional(),
    _modelNumber: elementSchema.optional(),
    note: annotationSchema.array().optional(),
    owner: referenceSchema.optional(),
    parent: referenceSchema.optional(),
    partNumber: stringSchema.optional(),
    _partNumber: elementSchema.optional(),
    patient: referenceSchema.optional(),
    property: devicePropertySchema.array().optional(),
    safety: codeableConceptSchema.array().optional(),
    serialNumber: stringSchema.optional(),
    _serialNumber: elementSchema.optional(),
    specialization: deviceDefinitionSpecializationSchema.array().optional(),
    status: deviceStatusSchema.optional(),
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    udiCarrier: deviceUdiCarrierSchema.array().optional(),
    url: stringSchema.optional(),
    _url: elementSchema.optional(),
    version: deviceVersionSchema.array().optional(),
  }),
) satisfies ZodType<Device>

/**
 * Zod schema for FHIR Device resource.
 */
export const deviceSchema: ZodType<Device> = untypedDeviceSchema

/**
 * Wrapper class for FHIR Device resources.
 * Provides utility methods for working with device information.
 */
export class FhirDevice extends FhirDomainResource<Device> {
  /**
   * Parses a Device resource from unknown data.
   *
   * @param value - The data to parse and validate against the Device schema
   * @returns A FhirDevice instance containing the validated resource
   */
  public static parse(value: unknown): FhirDevice {
    return new FhirDevice(deviceSchema.parse(value))
  }

  /**
   * Gets the device type as display text.
   *
   * @returns The type display text, if available
   */
  public get typeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.type)
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns Array of identifier values matching any provided system
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns Array of identifier values matching any provided Coding
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
