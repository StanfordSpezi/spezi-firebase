//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Flag } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
} from '../elements/index.js'

const flagStatusSchema = z.enum(['active', 'inactive', 'entered-in-error'])

export const untypedFlagSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Flag').readonly(),
    identifier: identifierSchema.array().optional(),
    status: flagStatusSchema,
    _status: elementSchema.optional(),
    category: codeableConceptSchema.array().optional(),
    code: codeableConceptSchema,
    subject: referenceSchema,
    period: periodSchema.optional(),
    encounter: referenceSchema.optional(),
    author: referenceSchema.optional(),
  }),
) satisfies ZodType<Flag>

export const flagSchema: ZodType<Flag> = untypedFlagSchema

export class FhirFlag extends FhirDomainResource<Flag> {
  // Static Functions

  public static parse(value: unknown): FhirFlag {
    return new FhirFlag(flagSchema.parse(value))
  }
}
