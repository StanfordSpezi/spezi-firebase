//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ImmunizationRecommendation } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  positiveIntSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const immunizationRecommendationRecommendationSchema = z.lazy(() =>
  backboneElementSchema.extend({
    vaccineCode: codeableConceptSchema.array().optional(),
    targetDisease: codeableConceptSchema.optional(),
    contraindicatedVaccineCode: codeableConceptSchema.array().optional(),
    forecastStatus: codeableConceptSchema,
    forecastReason: codeableConceptSchema.array().optional(),
    dateCriterion: backboneElementSchema
      .extend({
        code: codeableConceptSchema,
        value: dateTimeSchema,
        _value: elementSchema.optional(),
      })
      .array()
      .optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    series: stringSchema.optional(),
    _series: elementSchema.optional(),
    doseNumberPositiveInt: positiveIntSchema.optional(),
    doseNumberString: stringSchema.optional(),
    _doseNumberString: elementSchema.optional(),
    seriesDosesPositiveInt: positiveIntSchema.optional(),
    seriesDosesString: stringSchema.optional(),
    _seriesDosesString: elementSchema.optional(),
    supportingImmunization: referenceSchema.array().optional(),
    supportingPatientInformation: referenceSchema.array().optional(),
  }),
)

export const untypedImmunizationRecommendationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ImmunizationRecommendation').readonly(),
    identifier: identifierSchema.array().optional(),
    patient: referenceSchema,
    date: dateTimeSchema,
    _date: elementSchema.optional(),
    authority: referenceSchema.optional(),
    recommendation: immunizationRecommendationRecommendationSchema.array(),
  }),
)

export const immunizationRecommendationSchema: ZodType<ImmunizationRecommendation> =
  untypedImmunizationRecommendationSchema

export class FhirImmunizationRecommendation extends FhirDomainResource<ImmunizationRecommendation> {
  // Static Functions

  public static parse(value: unknown): FhirImmunizationRecommendation {
    return new FhirImmunizationRecommendation(
      immunizationRecommendationSchema.parse(value),
    )
  }
}
