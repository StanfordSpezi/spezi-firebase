//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type BiologicallyDerivedProduct } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const biologicallyDerivedProductStatusSchema = z.enum(['available', 'unavailable'])

const biologicallyDerivedProductCategorySchema = z.enum([
  'organ',
  'tissue',
  'fluid',
  'cells',
  'biologicalAgent',
])

const biologicallyDerivedProductCollectionSchema = z.lazy(() =>
  backboneElementSchema.extend({
    collector: referenceSchema.optional(),
    source: referenceSchema.optional(),
    collectedDateTime: dateTimeSchema.optional(),
    _collectedDateTime: elementSchema.optional(),
    collectedPeriod: periodSchema.optional(),
  }),
)

const biologicallyDerivedProductProcessingSchema = z.lazy(() =>
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    procedure: codeableConceptSchema.optional(),
    additive: referenceSchema.optional(),
    timeDateTime: dateTimeSchema.optional(),
    _timeDateTime: elementSchema.optional(),
    timePeriod: periodSchema.optional(),
  }),
)

const biologicallyDerivedProductManipulationSchema = z.lazy(() =>
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    timeDateTime: dateTimeSchema.optional(),
    _timeDateTime: elementSchema.optional(),
    timePeriod: periodSchema.optional(),
  }),
)

const biologicallyDerivedProductStorageSchema = z.lazy(() =>
  backboneElementSchema.extend({
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    temperature: z.number().optional(),
    _temperature: elementSchema.optional(),
    scale: z.enum(['farenheit', 'celsius', 'kelvin']).optional(),
    _scale: elementSchema.optional(),
    duration: periodSchema.optional(),
  }),
)

export const untypedBiologicallyDerivedProductSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('BiologicallyDerivedProduct').readonly(),
    identifier: identifierSchema.array().optional(),
    productCategory: biologicallyDerivedProductCategorySchema.optional(),
    _productCategory: elementSchema.optional(),
    productCode: codeableConceptSchema.optional(),
    status: biologicallyDerivedProductStatusSchema.optional(),
    _status: elementSchema.optional(),
    request: referenceSchema.array().optional(),
    quantity: intSchema.optional(),
    _quantity: elementSchema.optional(),
    parent: referenceSchema.array().optional(),
    collection: biologicallyDerivedProductCollectionSchema.optional(),
    processing: biologicallyDerivedProductProcessingSchema.array().optional(),
    manipulation: biologicallyDerivedProductManipulationSchema.optional(),
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
