//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ManufacturedItemDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const manufacturedItemDefinitionStatusSchema = z.enum(['draft', 'active', 'retired', 'unknown'])

const manufacturedItemDefinitionPropertySchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueDate: stringSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueBoolean: z.boolean().optional(),
    _valueBoolean: elementSchema.optional(),
    valueAttachment: elementSchema.optional(),
  }),
)

const manufacturedItemDefinitionComponentSchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    function: codeableConceptSchema.array().optional(),
    amount: quantitySchema.array().optional(),
    constituent: backboneElementSchema
      .extend({
        amount: quantitySchema.array().optional(),
        location: codeableConceptSchema.array().optional(),
        function: codeableConceptSchema.array().optional(),
        hasIngredient: codeableConceptSchema.array().optional(),
      })
      .array()
      .optional(),
    property: manufacturedItemDefinitionPropertySchema.array().optional(),
    component: z.lazy(() => manufacturedItemDefinitionComponentSchema.array().optional()),
  }),
)

export const untypedManufacturedItemDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ManufacturedItemDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    status: manufacturedItemDefinitionStatusSchema,
    _status: elementSchema.optional(),
    manufacturedDoseForm: codeableConceptSchema,
    unitOfPresentation: codeableConceptSchema.optional(),
    manufacturer: referenceSchema.array().optional(),
    ingredient: codeableConceptSchema.array().optional(),
    property: manufacturedItemDefinitionPropertySchema.array().optional(),
    component: manufacturedItemDefinitionComponentSchema.array().optional(),
  }),
) satisfies ZodType<ManufacturedItemDefinition>

export const manufacturedItemDefinitionSchema: ZodType<ManufacturedItemDefinition> =
  untypedManufacturedItemDefinitionSchema

export class FhirManufacturedItemDefinition extends FhirDomainResource<ManufacturedItemDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirManufacturedItemDefinition {
    return new FhirManufacturedItemDefinition(
      manufacturedItemDefinitionSchema.parse(value),
    )
  }
}
