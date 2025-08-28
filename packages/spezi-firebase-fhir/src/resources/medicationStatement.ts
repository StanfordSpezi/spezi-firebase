//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type MedicationStatement } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import {
  domainResourceSchema,
  FhirDomainResource,
} from '../elements/domainResource.js'
import {
  annotationSchema,
  codeableConceptSchema,
  dateTimeSchema,
  dosageSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'

export const untypedMedicationStatementSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('MedicationStatement').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: z.enum([
      'active',
      'completed',
      'entered-in-error',
      'intended',
      'stopped',
      'on-hold',
      'unknown',
    ]),
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
) satisfies ZodType<MedicationStatement>

export const medicationStatementSchema: ZodType<MedicationStatement> =
  untypedMedicationStatementSchema

export class FhirMedicationStatement extends FhirDomainResource<MedicationStatement> {
  // Static Functions

  public static parse(value: unknown): FhirMedicationStatement {
    return new FhirMedicationStatement(medicationStatementSchema.parse(value))
  }
}
