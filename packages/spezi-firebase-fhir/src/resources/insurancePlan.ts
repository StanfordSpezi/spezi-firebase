//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type InsurancePlan } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  referenceSchema,
  stringSchema,
  periodSchema,
  humanNameSchema,
  addressSchema,
  contactPointSchema,
  quantitySchema,
  moneySchema,
  positiveIntSchema,
} from '../elements/index.js'
import { insurancePlanStatusSchema } from '../valueSets/index.js'

export const untypedInsurancePlanSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('InsurancePlan').readonly(),
    identifier: identifierSchema.array().optional(),
    status: insurancePlanStatusSchema.optional(),
    _status: elementSchema.optional(),
    type: codeableConceptSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    alias: stringSchema.array().optional(),
    _alias: elementSchema.array().optional(),
    period: periodSchema.optional(),
    ownedBy: referenceSchema.optional(),
    administeredBy: referenceSchema.optional(),
    coverageArea: referenceSchema.array().optional(),
    contact: backboneElementSchema
      .extend({
        purpose: codeableConceptSchema.optional(),
        name: humanNameSchema.optional(),
        telecom: contactPointSchema.array().optional(),
        address: addressSchema.optional(),
      })
      .array()
      .optional(),
    endpoint: referenceSchema.array().optional(),
    network: referenceSchema.array().optional(),
    coverage: backboneElementSchema
      .extend({
        type: codeableConceptSchema,
        network: referenceSchema.array().optional(),
        benefit: backboneElementSchema
          .extend({
            type: codeableConceptSchema,
            requirement: stringSchema.optional(),
            _requirement: elementSchema.optional(),
            limit: backboneElementSchema
              .extend({
                value: quantitySchema.optional(),
                code: codeableConceptSchema.optional(),
              })
              .array()
              .optional(),
          })
          .array(),
      })
      .array()
      .optional(),
    plan: backboneElementSchema
      .extend({
        identifier: identifierSchema.array().optional(),
        type: codeableConceptSchema.optional(),
        coverageArea: referenceSchema.array().optional(),
        network: referenceSchema.array().optional(),
        generalCost: backboneElementSchema
          .extend({
            type: codeableConceptSchema.optional(),
            groupSize: positiveIntSchema.optional(),
            cost: moneySchema.optional(),
            comment: stringSchema.optional(),
            _comment: elementSchema.optional(),
          })
          .array()
          .optional(),
        specificCost: backboneElementSchema
          .extend({
            category: codeableConceptSchema,
            benefit: backboneElementSchema
              .extend({
                type: codeableConceptSchema,
                cost: backboneElementSchema
                  .extend({
                    type: codeableConceptSchema,
                    applicability: codeableConceptSchema.optional(),
                    qualifiers: codeableConceptSchema.array().optional(),
                    value: quantitySchema.optional(),
                  })
                  .array()
                  .optional(),
              })
              .array()
              .optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<InsurancePlan>

export const insurancePlanSchema: ZodType<InsurancePlan> =
  untypedInsurancePlanSchema

export class FhirInsurancePlan extends FhirDomainResource<InsurancePlan> {
  public static parse(value: unknown): FhirInsurancePlan {
    return new FhirInsurancePlan(insurancePlanSchema.parse(value))
  }
}
