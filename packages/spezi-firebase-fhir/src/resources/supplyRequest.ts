//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type SupplyRequest, type SupplyRequestParameter } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  rangeSchema,
  referenceSchema,
  timingSchema,
} from '../elements/index.js'
import {
  requestPrioritySchema,
  supplyRequestStatusSchema,
} from '../valueSets/index.js'

const supplyRequestParameterSchema: ZodType<SupplyRequestParameter> = z.lazy(
  () =>
    backboneElementSchema.extend({
      code: codeableConceptSchema.optional(),
      valueCodeableConcept: codeableConceptSchema.optional(),
      valueQuantity: quantitySchema.optional(),
      valueRange: rangeSchema.optional(),
      valueBoolean: booleanSchema.optional(),
      _valueBoolean: elementSchema.optional(),
    }),
)

export const untypedSupplyRequestSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('SupplyRequest').readonly(),
    identifier: identifierSchema.array().optional(),
    status: supplyRequestStatusSchema.optional(),
    _status: elementSchema.optional(),
    category: codeableConceptSchema.optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    itemCodeableConcept: codeableConceptSchema.optional(),
    itemReference: referenceSchema.optional(),
    quantity: quantitySchema,
    parameter: supplyRequestParameterSchema.array().optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrencePeriod: periodSchema.optional(),
    occurrenceTiming: timingSchema.optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    requester: referenceSchema.optional(),
    supplier: referenceSchema.array().optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    deliverFrom: referenceSchema.optional(),
    deliverTo: referenceSchema.optional(),
  }),
) satisfies ZodType<SupplyRequest>

export const supplyRequestSchema: ZodType<SupplyRequest> =
  untypedSupplyRequestSchema

export class FhirSupplyRequest extends FhirDomainResource<SupplyRequest> {
  // Static Functions

  public static parse(value: unknown): FhirSupplyRequest {
    return new FhirSupplyRequest(supplyRequestSchema.parse(value))
  }
}
