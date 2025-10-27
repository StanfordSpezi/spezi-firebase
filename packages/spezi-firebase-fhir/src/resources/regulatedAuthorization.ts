//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type RegulatedAuthorization } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'

const regulatedAuthorizationStatusSchema = z.enum(['draft', 'active', 'retired', 'unknown'])

const regulatedAuthorizationCaseSchema: z.ZodType<any> = z.lazy(() =>
  backboneElementSchema.extend({
    identifier: identifierSchema.optional(),
    type: codeableConceptSchema.optional(),
    status: codeableConceptSchema.optional(),
    datePeriod: periodSchema.optional(),
    dateDateTime: dateTimeSchema.optional(),
    _dateDateTime: elementSchema.optional(),
    application: z.lazy(() => regulatedAuthorizationCaseSchema.array().optional()),
  }),
)

export const untypedRegulatedAuthorizationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('RegulatedAuthorization').readonly(),
    identifier: identifierSchema.array().optional(),
    subject: referenceSchema.array().optional(),
    type: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    region: codeableConceptSchema.array().optional(),
    status: regulatedAuthorizationStatusSchema.optional(),
    _status: elementSchema.optional(),
    statusDate: dateTimeSchema.optional(),
    _statusDate: elementSchema.optional(),
    validityPeriod: periodSchema.optional(),
    indication: codeableConceptSchema.optional(),
    intendedUse: codeableConceptSchema.optional(),
    basis: codeableConceptSchema.array().optional(),
    holder: referenceSchema.optional(),
    regulator: referenceSchema.optional(),
    case: regulatedAuthorizationCaseSchema.optional(),
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
