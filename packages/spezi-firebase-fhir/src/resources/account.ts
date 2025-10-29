//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Account } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  identifierSchema,
  backboneElementSchema,
  elementSchema,
  codeableConceptSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
  booleanSchema,
  positiveIntSchema,
} from '../elements/index.js'
import { accountStatusSchema } from '../valueSets/index.js'

export const untypedAccountSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Account').readonly(),
    identifier: identifierSchema.array().optional(),
    status: accountStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    subject: referenceSchema.array().optional(),
    servicePeriod: periodSchema.optional(),
    coverage: backboneElementSchema
      .extend({
        coverage: referenceSchema,
        priority: positiveIntSchema.optional(),
      })
      .array()
      .optional(),
    owner: referenceSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    guarantor: backboneElementSchema
      .extend({
        party: referenceSchema,
        onHold: booleanSchema.optional(),
        _onHold: elementSchema.optional(),
        period: periodSchema.optional(),
      })
      .array()
      .optional(),
    partOf: referenceSchema.optional(),
  }),
) satisfies ZodType<Account>

export const accountSchema: ZodType<Account> = untypedAccountSchema

export class FhirAccount extends FhirDomainResource<Account> {
  public static parse(value: unknown): FhirAccount {
    return new FhirAccount(accountSchema.parse(value))
  }
}
