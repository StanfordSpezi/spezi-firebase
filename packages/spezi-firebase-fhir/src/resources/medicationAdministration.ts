//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MedicationAdministration } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  ratioSchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import { medicationAdministrationStatusSchema } from '../valueSets/index.js'

export const untypedMedicationAdministrationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationAdministration').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiates: uriSchema.array().optional(),
    _instantiates: elementSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: medicationAdministrationStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.array().optional(),
    category: codeableConceptSchema.optional(),
    medicationCodeableConcept: codeableConceptSchema.optional(),
    medicationReference: referenceSchema.optional(),
    subject: referenceSchema,
    context: referenceSchema.optional(),
    supportingInformation: referenceSchema.array().optional(),
    effectiveDateTime: dateTimeSchema.optional(),
    _effectiveDateTime: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    performer: backboneElementSchema
      .extend({
        function: codeableConceptSchema.optional(),
        actor: referenceSchema,
      })
      .array()
      .optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    request: referenceSchema.optional(),
    device: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    dosage: backboneElementSchema
      .extend({
        text: stringSchema.optional(),
        _text: elementSchema.optional(),
        site: codeableConceptSchema.optional(),
        route: codeableConceptSchema.optional(),
        method: codeableConceptSchema.optional(),
        dose: quantitySchema.optional(),
        rateRatio: ratioSchema.optional(),
        rateQuantity: quantitySchema.optional(),
      })
      .optional(),
    eventHistory: referenceSchema.array().optional(),
  }),
)

export const medicationAdministrationSchema =
  untypedMedicationAdministrationSchema

export class FhirMedicationAdministration extends FhirDomainResource<MedicationAdministration> {
  // Static Functions

  public static parse(value: unknown): FhirMedicationAdministration {
    return new FhirMedicationAdministration(
      medicationAdministrationSchema.parse(value),
    )
  }
}
