//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Coverage } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  periodSchema,
  referenceSchema,
  quantitySchema,
  moneySchema,
  positiveIntSchema,
  stringSchema,
  booleanSchema,
} from '../elements/index.js'
import { coverageStatusSchema } from '../valueSets/index.js'

export const untypedCoverageSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Coverage').readonly(),
    identifier: identifierSchema.array().optional(),
    status: coverageStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    policyHolder: referenceSchema.optional(),
    subscriber: referenceSchema.optional(),
    subscriberId: stringSchema.optional(),
    _subscriberId: elementSchema.optional(),
    beneficiary: referenceSchema,
    dependent: stringSchema.optional(),
    _dependent: elementSchema.optional(),
    relationship: codeableConceptSchema.optional(),
    period: periodSchema.optional(),
    payor: referenceSchema.array(),
    class: backboneElementSchema
      .extend({
        type: codeableConceptSchema,
        value: stringSchema,
        _value: elementSchema.optional(),
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
      })
      .array()
      .optional(),
    order: positiveIntSchema.optional(),
    network: stringSchema.optional(),
    _network: elementSchema.optional(),
    costToBeneficiary: backboneElementSchema
      .extend({
        type: codeableConceptSchema.optional(),
        valueQuantity: quantitySchema.optional(),
        valueMoney: moneySchema.optional(),
        exception: backboneElementSchema
          .extend({
            type: codeableConceptSchema,
            period: periodSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    subrogation: booleanSchema.optional(),
    _subrogation: elementSchema.optional(),
    contract: referenceSchema.array().optional(),
  }),
)

export const coverageSchema = untypedCoverageSchema

export class FhirCoverage extends FhirDomainResource<Coverage> {
  public static parse(value: unknown): FhirCoverage {
    return new FhirCoverage(coverageSchema.parse(value))
  }
}
