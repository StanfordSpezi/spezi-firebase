//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type SupplyDelivery,
  type SupplyDeliverySuppliedItem,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  timingSchema,
} from '../elements/index.js'
import { supplyDeliveryStatusSchema } from '../valueSets/index.js'

const supplyDeliverySuppliedItemSchema: ZodType<SupplyDeliverySuppliedItem> =
  z.lazy(() =>
    backboneElementSchema.extend({
      quantity: quantitySchema.optional(),
      itemCodeableConcept: codeableConceptSchema.optional(),
      itemReference: referenceSchema.optional(),
    }),
  )

export const untypedSupplyDeliverySchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SupplyDelivery').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: supplyDeliveryStatusSchema.optional(),
    _status: elementSchema.optional(),
    patient: referenceSchema.optional(),
    type: codeableConceptSchema.optional(),
    suppliedItem: supplyDeliverySuppliedItemSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    supplier: referenceSchema.optional(),
    destination: referenceSchema.optional(),
    receiver: referenceSchema.array().optional(),
  }),
) satisfies ZodType<SupplyDelivery>

export const supplyDeliverySchema: ZodType<SupplyDelivery> =
  untypedSupplyDeliverySchema

export class FhirSupplyDelivery extends FhirDomainResource<SupplyDelivery> {
  // Static Functions

  public static parse(value: unknown): FhirSupplyDelivery {
    return new FhirSupplyDelivery(supplyDeliverySchema.parse(value))
  }
}
