//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type SubstanceIngredient,
  type SubstanceInstance,
  type Substance,
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
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { substanceStatusSchema } from '../valueSets/index.js'

const substanceInstanceSchema: ZodType<SubstanceInstance> =
  backboneElementSchema.extend({
    identifier: identifierSchema.optional(),
    expiry: dateTimeSchema.optional(),
    _expiry: elementSchema.optional(),
    quantity: quantitySchema.optional(),
  })

const substanceIngredientSchema: ZodType<SubstanceIngredient> =
  backboneElementSchema.extend({
    quantity: ratioSchema.optional(),
    substanceCodeableConcept: codeableConceptSchema.optional(),
    substanceReference: referenceSchema.optional(),
  })

export const untypedSubstanceSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Substance').readonly(),
    identifier: identifierSchema.array().optional(),
    status: substanceStatusSchema,
    _status: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema,
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    instance: substanceInstanceSchema.array().optional(),
    ingredient: substanceIngredientSchema.array().optional(),
  }),
) satisfies ZodType<Substance>

export const substanceSchema: ZodType<Substance> = untypedSubstanceSchema

export class FhirSubstance extends FhirDomainResource<Substance> {
  // Static Functions

  public static parse(value: unknown): FhirSubstance {
    return new FhirSubstance(substanceSchema.parse(value))
  }
}
