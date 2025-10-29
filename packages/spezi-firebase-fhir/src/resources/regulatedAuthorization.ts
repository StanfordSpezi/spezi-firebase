//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type RegulatedAuthorization,
  type RegulatedAuthorizationCase,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  codeableReferenceSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const regulatedAuthorizationCaseSchema: ZodType<RegulatedAuthorizationCase> =
  z.lazy(() =>
    backboneElementSchema.extend({
      application: z
        .array(z.lazy(() => regulatedAuthorizationCaseSchema))
        .optional(),
      datePeriod: periodSchema.optional(),
      dateDateTime: dateTimeSchema.optional(),
      _dateDateTime: elementSchema.optional(),
      identifier: identifierSchema.optional(),
      status: codeableConceptSchema.optional(),
      type: codeableConceptSchema.optional(),
    }),
  )

export const untypedRegulatedAuthorizationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('RegulatedAuthorization').readonly(),
    basis: codeableConceptSchema.array().optional(),
    case: regulatedAuthorizationCaseSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    holder: referenceSchema.optional(),
    identifier: identifierSchema.array().optional(),
    indication: codeableReferenceSchema.optional(),
    intendedUse: codeableConceptSchema.optional(),
    region: codeableConceptSchema.array().optional(),
    regulator: referenceSchema.optional(),
    status: codeableConceptSchema.optional(),
    statusDate: dateTimeSchema.optional(),
    _statusDate: elementSchema.optional(),
    subject: referenceSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    validityPeriod: periodSchema.optional(),
  }),
) satisfies ZodType<RegulatedAuthorization>

export const regulatedAuthorizationSchema: ZodType<RegulatedAuthorization> =
  untypedRegulatedAuthorizationSchema

export class FhirRegulatedAuthorization extends FhirDomainResource<RegulatedAuthorization> {
  // Static Functions

  public static parse(value: unknown): FhirRegulatedAuthorization {
    return new FhirRegulatedAuthorization(
      regulatedAuthorizationSchema.parse(value),
    )
  }
}
