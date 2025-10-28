//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Basic } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  codeableConceptSchema,
  dateSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
} from '../elements/index.js'

export const untypedBasicSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Basic').readonly(),
    identifier: identifierSchema.array().optional(),
    code: codeableConceptSchema,
    subject: referenceSchema.optional(),
    created: dateSchema.optional(),
    _created: elementSchema.optional(),
    author: referenceSchema.optional(),
  }),
) satisfies ZodType<Basic>

export const basicSchema: ZodType<Basic> = untypedBasicSchema

export class FhirBasic extends FhirDomainResource<Basic> {
  // Static Functions

  public static parse(value: unknown): FhirBasic {
    return new FhirBasic(basicSchema.parse(value))
  }
}
