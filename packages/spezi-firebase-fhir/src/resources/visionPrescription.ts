//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type VisionPrescription,
  type VisionPrescriptionLensSpecification,
  type VisionPrescriptionLensSpecificationPrism,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  visionBaseSchema,
  visionEyesSchema,
  visionPrescriptionStatusSchema,
} from '../valueSets/index.js'

const visionPrescriptionLensSpecificationPrismSchema: ZodType<VisionPrescriptionLensSpecificationPrism> =
  backboneElementSchema.extend({
    amount: decimalSchema,
    _amount: elementSchema.optional(),
    base: visionBaseSchema,
    _base: elementSchema.optional(),
  })

const visionPrescriptionLensSpecificationSchema: ZodType<VisionPrescriptionLensSpecification> =
  backboneElementSchema.extend({
    product: codeableConceptSchema,
    eye: visionEyesSchema,
    _eye: elementSchema.optional(),
    sphere: decimalSchema.optional(),
    _sphere: elementSchema.optional(),
    cylinder: decimalSchema.optional(),
    _cylinder: elementSchema.optional(),
    axis: intSchema.optional(),
    _axis: elementSchema.optional(),
    prism: visionPrescriptionLensSpecificationPrismSchema.array().optional(),
    add: decimalSchema.optional(),
    _add: elementSchema.optional(),
    power: decimalSchema.optional(),
    _power: elementSchema.optional(),
    backCurve: decimalSchema.optional(),
    _backCurve: elementSchema.optional(),
    diameter: decimalSchema.optional(),
    _diameter: elementSchema.optional(),
    duration: quantitySchema.optional(),
    color: stringSchema.optional(),
    _color: elementSchema.optional(),
    brand: stringSchema.optional(),
    _brand: elementSchema.optional(),
    note: annotationSchema.array().optional(),
  })

/**
 * Zod schema for FHIR VisionPrescription resource (untyped version).
 */
export const untypedVisionPrescriptionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('VisionPrescription').readonly(),
    identifier: identifierSchema.array().optional(),
    status: visionPrescriptionStatusSchema,
    _status: elementSchema.optional(),
    created: dateTimeSchema,
    _created: elementSchema.optional(),
    patient: referenceSchema,
    encounter: referenceSchema.optional(),
    dateWritten: dateTimeSchema,
    _dateWritten: elementSchema.optional(),
    prescriber: referenceSchema,
    lensSpecification: visionPrescriptionLensSpecificationSchema.array().min(1),
  }),
) satisfies ZodType<VisionPrescription>

/**
 * Zod schema for FHIR VisionPrescription resource.
 */
export const visionPrescriptionSchema: ZodType<VisionPrescription> =
  untypedVisionPrescriptionSchema

/**
 * Wrapper class for FHIR VisionPrescription resources.
 * Provides utility methods for working with vision prescriptions for corrective lenses.
 */
export class FhirVisionPrescription extends FhirDomainResource<VisionPrescription> {
  // Static Functions

  /**
   * Parses a VisionPrescription resource from unknown data.
   *
   * @param value - The data to parse and validate against the VisionPrescription schema
   * @returns A FhirVisionPrescription instance containing the validated resource
   */
  public static parse(value: unknown): FhirVisionPrescription {
    return new FhirVisionPrescription(visionPrescriptionSchema.parse(value))
  }

  /**
   * Get the created date as a Date object.
   * @returns The created date
   */
  public get createdDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.created)
  }

  /**
   * Get the date written as a Date object.
   * @returns The date written
   */
  public get dateWritten(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.dateWritten)
  }

  /**
   * Get all product displays from lens specifications.
   * @returns Array of product display texts
   */
  public get productDisplays(): string[] {
    return FhirDomainResource.codeableConceptDisplays(
      this.value.lensSpecification.map((spec) => spec.product),
    )
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
   * @returns Array of identifier values matching any provided type
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
