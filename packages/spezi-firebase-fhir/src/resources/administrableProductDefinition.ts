//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type AdministrableProductDefinition } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const administrableProductDefinitionStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

const administrableProductDefinitionRouteOfAdministrationSchema = z.lazy(() =>
  backboneElementSchema.extend({
    code: codeableConceptSchema,
    firstDose: quantitySchema.optional(),
    maxSingleDose: quantitySchema.optional(),
    maxDosePerDay: quantitySchema.optional(),
    maxDosePerTreatmentPeriod: ratioSchema.optional(),
    maxTreatmentPeriod: stringSchema.optional(),
    _maxTreatmentPeriod: elementSchema.optional(),
    targetSpecies: backboneElementSchema
      .extend({
        code: codeableConceptSchema,
        withdrawalPeriod: backboneElementSchema
          .extend({
            tissue: codeableConceptSchema,
            value: quantitySchema,
            supportingInformation: stringSchema.optional(),
            _supportingInformation: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
  }),
)

const administrableProductDefinitionPropertySchema = z.lazy(() =>
  backboneElementSchema.extend({
    type: codeableConceptSchema,
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueDate: stringSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueBoolean: z.boolean().optional(),
    _valueBoolean: elementSchema.optional(),
    valueAttachment: elementSchema.optional(),
    status: codeableConceptSchema.optional(),
  }),
)

export const untypedAdministrableProductDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('AdministrableProductDefinition').readonly(),
    identifier: identifierSchema.array().optional(),
    status: administrableProductDefinitionStatusSchema,
    _status: elementSchema.optional(),
    formOf: referenceSchema.array().optional(),
    administrableDoseForm: codeableConceptSchema.optional(),
    unitOfPresentation: codeableConceptSchema.optional(),
    producedFrom: referenceSchema.array().optional(),
    ingredient: codeableConceptSchema.array().optional(),
    device: referenceSchema.array().optional(),
    property: administrableProductDefinitionPropertySchema.array().optional(),
    routeOfAdministration: administrableProductDefinitionRouteOfAdministrationSchema.array(),
  }),
) satisfies ZodType<AdministrableProductDefinition>

export const administrableProductDefinitionSchema: ZodType<AdministrableProductDefinition> =
  untypedAdministrableProductDefinitionSchema

export class FhirAdministrableProductDefinition extends FhirDomainResource<AdministrableProductDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirAdministrableProductDefinition {
    return new FhirAdministrableProductDefinition(
      administrableProductDefinitionSchema.parse(value),
    )
  }
}
