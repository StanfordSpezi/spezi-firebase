//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type Coding,
  type BiologicallyDerivedProduct,
  type BiologicallyDerivedProductCollection,
  type BiologicallyDerivedProductManipulation,
  type BiologicallyDerivedProductProcessing,
  type BiologicallyDerivedProductStorage,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  biologicallyDerivedProductCategorySchema,
  biologicallyDerivedProductStatusSchema,
  biologicallyDerivedProductStorageScaleSchema,
} from '../valueSets/index.js'

const biologicallyDerivedProductCollectionSchema: ZodType<BiologicallyDerivedProductCollection> =
  backboneElementSchema.extend({
    collectedDateTime: dateTimeSchema.optional(),
    _collectedDateTime: elementSchema.optional(),
    collectedPeriod: periodSchema.optional(),
    collector: referenceSchema.optional(),
    source: referenceSchema.optional(),
  })

const biologicallyDerivedProductProcessingSchema: ZodType<BiologicallyDerivedProductProcessing> =
  backboneElementSchema.extend({
    additive: referenceSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    procedure: codeableConceptSchema.optional(),
    timeDateTime: dateTimeSchema.optional(),
    _timeDateTime: elementSchema.optional(),
    timePeriod: periodSchema.optional(),
  })

const biologicallyDerivedProductManipulationSchema: ZodType<BiologicallyDerivedProductManipulation> =
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    timeDateTime: dateTimeSchema.optional(),
    _timeDateTime: elementSchema.optional(),
    timePeriod: periodSchema.optional(),
  })

const biologicallyDerivedProductStorageSchema: ZodType<BiologicallyDerivedProductStorage> =
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    duration: periodSchema.optional(),
    scale: biologicallyDerivedProductStorageScaleSchema.optional(),
    _scale: elementSchema.optional(),
    temperature: decimalSchema.optional(),
  })

/**
 * Zod schema for FHIR BiologicallyDerivedProduct resource (untyped version).
 */
export const untypedBiologicallyDerivedProductSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('BiologicallyDerivedProduct').readonly(),
    collection: biologicallyDerivedProductCollectionSchema.optional(),
    identifier: identifierSchema.array().optional(),
    manipulation: biologicallyDerivedProductManipulationSchema.optional(),
    parent: referenceSchema.array().optional(),
    processing: biologicallyDerivedProductProcessingSchema.array().optional(),
    productCategory: biologicallyDerivedProductCategorySchema.optional(),
    _productCategory: elementSchema.optional(),
    productCode: codeableConceptSchema.optional(),
    quantity: intSchema.optional(),
    request: referenceSchema.array().optional(),
    status: biologicallyDerivedProductStatusSchema.optional(),
    _status: elementSchema.optional(),
    storage: biologicallyDerivedProductStorageSchema.array().optional(),
  }),
) satisfies ZodType<BiologicallyDerivedProduct>

/**
 * Zod schema for FHIR BiologicallyDerivedProduct resource.
 */
export const biologicallyDerivedProductSchema: ZodType<BiologicallyDerivedProduct> =
  untypedBiologicallyDerivedProductSchema

/**
 * Wrapper class for FHIR BiologicallyDerivedProduct resources.
 * Provides utility methods for working with biologically derived products (blood, tissue, etc.).
 */
export class FhirBiologicallyDerivedProduct extends FhirDomainResource<BiologicallyDerivedProduct> {
  // Static Functions

  /**
   * Parses a BiologicallyDerivedProduct resource from unknown data.
   *
   * @param value - The data to parse and validate against the BiologicallyDerivedProduct schema
   * @returns A FhirBiologicallyDerivedProduct instance containing the validated resource
   */
  public static parse(value: unknown): FhirBiologicallyDerivedProduct {
    return new FhirBiologicallyDerivedProduct(
      biologicallyDerivedProductSchema.parse(value),
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
