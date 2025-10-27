//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Immunization } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  positiveIntSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import { immunizationStatusSchema } from '../valueSets/index.js'

export const untypedImmunizationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Immunization').readonly(),
    identifier: identifierSchema.array().optional(),
    status: immunizationStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    vaccineCode: codeableConceptSchema,
    patient: referenceSchema,
    encounter: referenceSchema.optional(),
    occurrenceDateTime: dateTimeSchema.optional(),
    _occurrenceDateTime: elementSchema.optional(),
    occurrenceString: stringSchema.optional(),
    _occurrenceString: elementSchema.optional(),
    recorded: dateTimeSchema.optional(),
    _recorded: elementSchema.optional(),
    primarySource: booleanSchema.optional(),
    _primarySource: elementSchema.optional(),
    reportOrigin: codeableConceptSchema.optional(),
    location: referenceSchema.optional(),
    manufacturer: referenceSchema.optional(),
    lotNumber: stringSchema.optional(),
    _lotNumber: elementSchema.optional(),
    expirationDate: dateTimeSchema.optional(),
    _expirationDate: elementSchema.optional(),
    site: codeableConceptSchema.optional(),
    route: codeableConceptSchema.optional(),
    doseQuantity: quantitySchema.optional(),
    performer: backboneElementSchema
      .extend({
        function: codeableConceptSchema.optional(),
        actor: referenceSchema,
      })
      .array()
      .optional(),
    note: annotationSchema.array().optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    isSubpotent: booleanSchema.optional(),
    _isSubpotent: elementSchema.optional(),
    subpotentReason: codeableConceptSchema.array().optional(),
    education: backboneElementSchema
      .extend({
        documentType: stringSchema.optional(),
        _documentType: elementSchema.optional(),
        reference: uriSchema.optional(),
        _reference: elementSchema.optional(),
        publicationDate: dateTimeSchema.optional(),
        _publicationDate: elementSchema.optional(),
        presentationDate: dateTimeSchema.optional(),
        _presentationDate: elementSchema.optional(),
      })
      .array()
      .optional(),
    programEligibility: codeableConceptSchema.array().optional(),
    fundingSource: codeableConceptSchema.optional(),
    reaction: backboneElementSchema
      .extend({
        date: dateTimeSchema.optional(),
        _date: elementSchema.optional(),
        detail: referenceSchema.optional(),
        reported: booleanSchema.optional(),
        _reported: elementSchema.optional(),
      })
      .array()
      .optional(),
    protocolApplied: backboneElementSchema
      .extend({
        series: stringSchema.optional(),
        _series: elementSchema.optional(),
        authority: referenceSchema.optional(),
        targetDisease: codeableConceptSchema.array().optional(),
        doseNumberPositiveInt: positiveIntSchema.optional(),
        doseNumberString: stringSchema.optional(),
        _doseNumberString: elementSchema.optional(),
        seriesDosesPositiveInt: positiveIntSchema.optional(),
        seriesDosesString: stringSchema.optional(),
        _seriesDosesString: elementSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Immunization>

export const immunizationSchema: ZodType<Immunization> =
  untypedImmunizationSchema

export class FhirImmunization extends FhirDomainResource<Immunization> {
  // Static Functions

  public static parse(value: unknown): FhirImmunization {
    return new FhirImmunization(immunizationSchema.parse(value))
  }
}
