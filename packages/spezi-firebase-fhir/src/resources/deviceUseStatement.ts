//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coding, type DeviceUseStatement } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  timingSchema,
} from '../elements/index.js'
import { deviceUseStatementStatusSchema } from '../valueSets/index.js'

/**
 * Zod schema for FHIR DeviceUseStatement resource (untyped version).
 */
export const untypedDeviceUseStatementSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DeviceUseStatement').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    status: deviceUseStatementStatusSchema,
    _status: elementSchema.optional(),
    subject: referenceSchema,
    derivedFrom: referenceSchema.array().optional(),
    timingTiming: timingSchema.optional(),
    timingPeriod: periodSchema.optional(),
    timingDateTime: dateTimeSchema.optional(),
    _timingDateTime: elementSchema.optional(),
    recordedOn: dateTimeSchema.optional(),
    _recordedOn: elementSchema.optional(),
    source: referenceSchema.optional(),
    device: referenceSchema,
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    bodySite: codeableConceptSchema.optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<DeviceUseStatement>

/**
 * Zod schema for FHIR DeviceUseStatement resource.
 */
export const deviceUseStatementSchema: ZodType<DeviceUseStatement> =
  untypedDeviceUseStatementSchema

/**
 * Wrapper class for FHIR DeviceUseStatement resources.
 * Provides utility methods for working with device usage records.
 */
export class FhirDeviceUseStatement extends FhirDomainResource<DeviceUseStatement> {
  // Static Functions

  /**
   * Parses a DeviceUseStatement resource from unknown data.
   *
   * @param value - The data to parse and validate against the DeviceUseStatement schema
   * @returns A FhirDeviceUseStatement instance containing the validated resource
   */
  public static parse(value: unknown): FhirDeviceUseStatement {
    return new FhirDeviceUseStatement(deviceUseStatementSchema.parse(value))
  }

  /**
   * Get the recorded date as a Date object.
   * @returns The recorded date, or undefined if not set
   */
  public get recordedDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.recordedOn)
  }

  /**
   * Get the timing date/time if specified as a dateTime.
   * @returns The timing date, or undefined if not set or not a dateTime
   */
  public get timingDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.timingDateTime)
  }

  /**
   * Get the timing period start date.
   * @returns The start date, or undefined if not set
   */
  public get timingPeriodStart(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.timingPeriod?.start)
  }

  /**
   * Get the timing period end date.
   * @returns The end date, or undefined if not set
   */
  public get timingPeriodEnd(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.timingPeriod?.end)
  }

  /**
   * Get body site display text.
   * @returns Body site display text
   */
  public get bodySiteDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.bodySite)
  }

  /**
   * Get reason displays from reason codes.
   * @returns Array of reason display texts
   */
  public get reasonDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(this.value.reasonCode)
  }

  /**
   * Get note texts from the device use statement.
   * @returns Array of note texts
   */
  public get noteTexts(): string[] {
    return FhirDomainResource.annotationTexts(this.value.note)
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
