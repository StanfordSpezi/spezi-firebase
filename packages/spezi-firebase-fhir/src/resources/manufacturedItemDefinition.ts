//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ManufacturedItemDefinition,
  type ManufacturedItemDefinitionProperty,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  referenceSchema,
} from '../elements/index.js'
import { manufacturedItemDefinitionStatusSchema } from '../valueSets/index.js'

const manufacturedItemDefinitionPropertySchema: ZodType<ManufacturedItemDefinitionProperty> =
  z.lazy(() =>
    backboneElementSchema.extend({
      type: codeableConceptSchema,
      valueCodeableConcept: codeableConceptSchema.optional(),
      valueQuantity: quantitySchema.optional(),
      valueDate: dateSchema.optional(),
      _valueDate: elementSchema.optional(),
      valueBoolean: booleanSchema.optional(),
      _valueBoolean: elementSchema.optional(),
      valueAttachment: attachmentSchema.optional(),
    }),
  )

export const untypedManufacturedItemDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ManufacturedItemDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    ingredient: codeableConceptSchema.array().optional(),
    manufacturedDoseForm: codeableConceptSchema,
    manufacturer: referenceSchema.array().optional(),
    property: manufacturedItemDefinitionPropertySchema.array().optional(),
    status: manufacturedItemDefinitionStatusSchema,
    _status: elementSchema.optional(),
    unitOfPresentation: codeableConceptSchema.optional(),
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
