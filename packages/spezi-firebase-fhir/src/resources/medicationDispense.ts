//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MedicationDispense } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  dosageSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  referenceSchema,
} from '../elements/index.js'

export const untypedMedicationDispenseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationDispense').readonly(),
    identifier: identifierSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: z.enum([
      'preparation',
      'in-progress',
      'cancelled',
      'on-hold',
      'completed',
      'entered-in-error',
      'stopped',
      'declined',
      'unknown',
    ]),
    _status: elementSchema.optional(),
    statusReasonCodeableConcept: codeableConceptSchema.optional(),
    statusReasonReference: referenceSchema.optional(),
    category: codeableConceptSchema.optional(),
    medicationCodeableConcept: codeableConceptSchema.optional(),
    medicationReference: referenceSchema.optional(),
    subject: referenceSchema.optional(),
    context: referenceSchema.optional(),
    supportingInformation: referenceSchema.array().optional(),
    performer: backboneElementSchema
      .extend({
        function: codeableConceptSchema.optional(),
        actor: referenceSchema,
      })
      .array()
      .optional(),
    location: referenceSchema.optional(),
    authorizingPrescription: referenceSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    quantity: quantitySchema.optional(),
    daysSupply: quantitySchema.optional(),
    whenPrepared: dateTimeSchema.optional(),
    _whenPrepared: elementSchema.optional(),
    whenHandedOver: dateTimeSchema.optional(),
    _whenHandedOver: elementSchema.optional(),
    destination: referenceSchema.optional(),
    receiver: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    dosageInstruction: dosageSchema.array().optional(),
    substitution: backboneElementSchema
      .extend({
        wasSubstituted: booleanSchema,
        _wasSubstituted: elementSchema.optional(),
        type: codeableConceptSchema.optional(),
        reason: codeableConceptSchema.array().optional(),
        responsibleParty: referenceSchema.array().optional(),
      })
      .optional(),
    detectedIssue: referenceSchema.array().optional(),
    eventHistory: referenceSchema.array().optional(),
  }),
) satisfies ZodType<MedicationDispense>

export const medicationDispenseSchema: ZodType<MedicationDispense> =
  untypedMedicationDispenseSchema

export class FhirMedicationDispense extends FhirDomainResource<MedicationDispense> {
  // Static Functions

  public static parse(value: unknown): FhirMedicationDispense {
    return new FhirMedicationDispense(medicationDispenseSchema.parse(value))
  }
}
