//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type DeviceMetricCalibration,
  type DeviceMetric,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  instantSchema,
  referenceSchema,
  timingSchema,
} from '../elements/index.js'
import {
  deviceMetricCalibrationStateSchema,
  deviceMetricCalibrationTypeSchema,
  deviceMetricCategorySchema,
  deviceMetricColorSchema,
  deviceMetricOperationalStatusSchema,
} from '../valueSets/index.js'

const deviceMetricCalibrationSchema: ZodType<DeviceMetricCalibration> =
  backboneElementSchema.extend({
    type: deviceMetricCalibrationTypeSchema.optional(),
    _type: elementSchema.optional(),
    state: deviceMetricCalibrationStateSchema.optional(),
    _state: elementSchema.optional(),
    time: instantSchema.optional(),
    _time: elementSchema.optional(),
  })

/**
 * Zod schema for FHIR DeviceMetric resource (untyped version).
 */
export const untypedDeviceMetricSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DeviceMetric').readonly(),
    identifier: identifierSchema.array().optional(),
    type: codeableConceptSchema,
    unit: codeableConceptSchema.optional(),
    source: referenceSchema.optional(),
    parent: referenceSchema.optional(),
    operationalStatus: deviceMetricOperationalStatusSchema.optional(),
    _operationalStatus: elementSchema.optional(),
    color: deviceMetricColorSchema.optional(),
    _color: elementSchema.optional(),
    category: deviceMetricCategorySchema,
    _category: elementSchema.optional(),
    measurementPeriod: timingSchema.optional(),
    calibration: deviceMetricCalibrationSchema.array().optional(),
  }),
) satisfies ZodType<DeviceMetric>

/**
 * Zod schema for FHIR DeviceMetric resource.
 */
export const deviceMetricSchema: ZodType<DeviceMetric> =
  untypedDeviceMetricSchema

/**
 * Wrapper class for FHIR DeviceMetric resources.
 * Provides utility methods for working with device metrics and measurements.
 */
export class FhirDeviceMetric extends FhirDomainResource<DeviceMetric> {
  // Static Functions

  /**
   * Parses a DeviceMetric resource from unknown data.
   *
   * @param value - The data to parse and validate against the DeviceMetric schema
   * @returns A FhirDeviceMetric instance containing the validated resource
   */
  public static parse(value: unknown): FhirDeviceMetric {
    return new FhirDeviceMetric(deviceMetricSchema.parse(value))
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
