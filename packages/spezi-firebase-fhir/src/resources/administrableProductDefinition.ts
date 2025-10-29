//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type AdministrableProductDefinition,
  type AdministrableProductDefinitionProperty,
  type AdministrableProductDefinitionRouteOfAdministration,
  type AdministrableProductDefinitionRouteOfAdministrationTargetSpecies,
  type AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriod,
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
  ratioSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { administrableProductDefinitionStatusSchema } from '../valueSets/index.js'

const administrableProductDefinitionPropertySchema: ZodType<AdministrableProductDefinitionProperty> =
  z.lazy(() =>
    backboneElementSchema.extend({
      status: codeableConceptSchema.optional(),
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

const administrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriodSchema: ZodType<AdministrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriod> =
  z.lazy(() =>
    backboneElementSchema.extend({
      supportingInformation: stringSchema.optional(),
      _supportingInformation: elementSchema.optional(),
      tissue: codeableConceptSchema,
      value: quantitySchema,
    }),
  )

const administrableProductDefinitionRouteOfAdministrationTargetSpeciesSchema: ZodType<AdministrableProductDefinitionRouteOfAdministrationTargetSpecies> =
  z.lazy(() =>
    backboneElementSchema.extend({
      code: codeableConceptSchema,
      withdrawalPeriod:
        administrableProductDefinitionRouteOfAdministrationTargetSpeciesWithdrawalPeriodSchema
          .array()
          .optional(),
    }),
  )

const administrableProductDefinitionRouteOfAdministrationSchema: ZodType<AdministrableProductDefinitionRouteOfAdministration> =
  z.lazy(() =>
    backboneElementSchema.extend({
      code: codeableConceptSchema,
      firstDose: quantitySchema.optional(),
      maxDosePerDay: quantitySchema.optional(),
      maxDosePerTreatmentPeriod: ratioSchema.optional(),
      maxSingleDose: quantitySchema.optional(),
      maxTreatmentPeriod: quantitySchema.optional(),
      targetSpecies:
        administrableProductDefinitionRouteOfAdministrationTargetSpeciesSchema
          .array()
          .optional(),
    }),
  )

export const untypedAdministrableProductDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('AdministrableProductDefinition').readonly(),
    administrableDoseForm: codeableConceptSchema.optional(),
    device: referenceSchema.optional(),
    formOf: referenceSchema.array().optional(),
    identifier: identifierSchema.array().optional(),
    ingredient: codeableConceptSchema.array().optional(),
    producedFrom: referenceSchema.array().optional(),
    property: administrableProductDefinitionPropertySchema.array().optional(),
    routeOfAdministration:
      administrableProductDefinitionRouteOfAdministrationSchema.array(),
    status: administrableProductDefinitionStatusSchema,
    _status: elementSchema.optional(),
    unitOfPresentation: codeableConceptSchema.optional(),
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
