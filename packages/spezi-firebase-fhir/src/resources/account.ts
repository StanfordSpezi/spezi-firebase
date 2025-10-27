//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Account } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
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
        priority: z.number().int().positive().optional(),
      })
      .array()
      .optional(),
    owner: referenceSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    guarantor: backboneElementSchema
      .extend({
        party: referenceSchema,
        onHold: z.boolean().optional(),
        _onHold: elementSchema.optional(),
        period: periodSchema.optional(),
      })
      .array()
      .optional(),
    partOf: referenceSchema.optional(),
  }),
)

export const accountSchema = untypedAccountSchema

export class FhirAccount extends FhirDomainResource<Account> {
  // Static Functions

  public static parse(value: unknown): FhirAccount {
    return new FhirAccount(accountSchema.parse(value))
  }
}
