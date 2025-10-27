//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MedicationStatement } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  codeableConceptSchema,
  dateTimeSchema,
  dosageSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'
import { medicationStatementStatusSchema } from '../valueSets/index.js'

export const untypedMedicationStatementSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationStatement').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: medicationStatementStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.array().optional(),
    category: codeableConceptSchema.optional(),
    medicationCodeableConcept: codeableConceptSchema.optional(),
    medicationReference: referenceSchema.optional(),
    subject: referenceSchema,
    context: referenceSchema.optional(),
    effectiveDateTime: dateTimeSchema.optional(),
    _effectiveDateTime: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    dateAsserted: dateTimeSchema.optional(),
    _dateAsserted: elementSchema.optional(),
    informationSource: referenceSchema.optional(),
    derivedFrom: referenceSchema.array().optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    dosage: dosageSchema.array().optional(),
  }),
)

export const medicationStatementSchema =
  untypedMedicationStatementSchema

export class FhirMedicationStatement extends FhirDomainResource<MedicationStatement> {
  // Static Functions

  public static parse(value: unknown): FhirMedicationStatement {
    return new FhirMedicationStatement(medicationStatementSchema.parse(value))
  }
}
