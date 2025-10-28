//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Procedure } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  canonicalSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
  uriSchema,
} from '../elements/index.js'
import { procedureStatusSchema } from '../valueSets/index.js'

export const untypedProcedureSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Procedure').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.array().optional(),
    _instantiatesCanonical: elementSchema.array().optional(),
    instantiatesUri: uriSchema.array().optional(),
    _instantiatesUri: elementSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    status: procedureStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    category: codeableConceptSchema.optional(),
    code: codeableConceptSchema.optional(),
    subject: referenceSchema,
    encounter: referenceSchema.optional(),
    performedDateTime: dateTimeSchema.optional(),
    _performedDateTime: elementSchema.optional(),
    performedPeriod: periodSchema.optional(),
    performedString: stringSchema.optional(),
    _performedString: elementSchema.optional(),
    performedAge: quantitySchema.optional(),
    performedRange: quantitySchema.optional(),
    recorder: referenceSchema.optional(),
    asserter: referenceSchema.optional(),
    performer: backboneElementSchema
      .extend({
        function: codeableConceptSchema.optional(),
        actor: referenceSchema,
        onBehalfOf: referenceSchema.optional(),
      })
      .array()
      .optional(),
    location: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    bodySite: codeableConceptSchema.array().optional(),
    outcome: codeableConceptSchema.optional(),
    report: referenceSchema.array().optional(),
    complication: codeableConceptSchema.array().optional(),
    complicationDetail: referenceSchema.array().optional(),
    followUp: annotationSchema.array().optional(),
    note: annotationSchema.array().optional(),
    focalDevice: backboneElementSchema
      .extend({
        action: codeableConceptSchema.optional(),
        manipulated: referenceSchema,
      })
      .array()
      .optional(),
    usedReference: referenceSchema.array().optional(),
    usedCode: codeableConceptSchema.array().optional(),
  }),
) satisfies ZodType<Procedure>

export const procedureSchema: ZodType<Procedure> = untypedProcedureSchema

export class FhirProcedure extends FhirDomainResource<Procedure> {
  // Static Functions

  public static parse(value: unknown): FhirProcedure {
    return new FhirProcedure(procedureSchema.parse(value))
  }
}
