//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ObservationDefinitionQualifiedInterval,
  type ObservationDefinitionQuantitativeDetails,
  type ObservationDefinition,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  rangeSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  administrativeGenderSchema,
  observationDefinitionPermittedDataTypeSchema,
  observationDefinitionRangeCategorySchema,
} from '../valueSets/index.js'

const observationDefinitionQuantitativeDetailsSchema: ZodType<ObservationDefinitionQuantitativeDetails> =
  backboneElementSchema.extend({
    conversionFactor: decimalSchema.optional(),
    decimalPrecision: intSchema.optional(),
    unit: codeableConceptSchema.optional(),
    customaryUnit: codeableConceptSchema.optional(),
  })

const observationDefinitionQualifiedIntervalSchema: ZodType<ObservationDefinitionQualifiedInterval> =
  backboneElementSchema.extend({
    category: observationDefinitionRangeCategorySchema.optional(),
    _category: elementSchema.optional(),
    range: rangeSchema.optional(),
    context: codeableConceptSchema.optional(),
    appliesTo: codeableConceptSchema.array().optional(),
    gender: administrativeGenderSchema.optional(),
    _gender: elementSchema.optional(),
    age: rangeSchema.optional(),
    gestationalAge: rangeSchema.optional(),
    condition: stringSchema.optional(),
    _condition: elementSchema.optional(),
  })

export const untypedObservationDefinitionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ObservationDefinition').readonly(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema,
    identifier: identifierSchema.array().optional(),
    permittedDataType: observationDefinitionPermittedDataTypeSchema
      .array()
      .optional(),
    _permittedDataType: elementSchema.array().optional(),
    multipleResultsAllowed: booleanSchema.optional(),
    _multipleResultsAllowed: elementSchema.optional(),
    method: codeableConceptSchema.optional(),
    preferredReportName: stringSchema.optional(),
    _preferredReportName: elementSchema.optional(),
    quantitativeDetails:
      observationDefinitionQuantitativeDetailsSchema.optional(),
    qualifiedInterval: observationDefinitionQualifiedIntervalSchema
      .array()
      .optional(),
    validCodedValueSet: referenceSchema.optional(),
    normalCodedValueSet: referenceSchema.optional(),
    abnormalCodedValueSet: referenceSchema.optional(),
    criticalCodedValueSet: referenceSchema.optional(),
  }),
) satisfies ZodType<ObservationDefinition>

export const observationDefinitionSchema: ZodType<ObservationDefinition> =
  untypedObservationDefinitionSchema

export class FhirObservationDefinition extends FhirDomainResource<ObservationDefinition> {
  // Static Functions

  public static parse(value: unknown): FhirObservationDefinition {
    return new FhirObservationDefinition(
      observationDefinitionSchema.parse(value),
    )
  }
}
