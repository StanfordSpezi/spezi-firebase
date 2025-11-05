//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type BiologicallyDerivedProduct,
  type BiologicallyDerivedProductCollection,
  type BiologicallyDerivedProductManipulation,
  type BiologicallyDerivedProductProcessing,
  type BiologicallyDerivedProductStorage,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
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

export const biologicallyDerivedProductSchema: ZodType<BiologicallyDerivedProduct> =
  untypedBiologicallyDerivedProductSchema

export class FhirBiologicallyDerivedProduct extends FhirDomainResource<BiologicallyDerivedProduct> {
  // Static Functions

  public static parse(value: unknown): FhirBiologicallyDerivedProduct {
    return new FhirBiologicallyDerivedProduct(
      biologicallyDerivedProductSchema.parse(value),
    )
  }
}
