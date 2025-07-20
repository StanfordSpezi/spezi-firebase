//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Organization } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  addressSchema,
  backboneElementSchema,
  codeableConceptSchema,
  contactPointSchema,
  elementSchema,
  humanNameSchema,
  identifierSchema,
  referenceSchema,
} from '../elements/index.js'

export const organizationSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Organization').readonly(),
    identifier: identifierSchema.array().optional(),
    active: z.boolean().optional(),
    _active: elementSchema.optional(),
    type: codeableConceptSchema.array().optional(),
    name: z.string().optional(),
    _name: elementSchema.optional(),
    alias: z.string().array().optional(),
    _alias: elementSchema.array().optional(),
    telecom: contactPointSchema.array().optional(),
    address: addressSchema.array().optional(),
    partOf: referenceSchema.optional(),
    contact: backboneElementSchema
      .extend({
        purpose: codeableConceptSchema.optional(),
        name: humanNameSchema.optional(),
        telecom: contactPointSchema.array().optional(),
        address: addressSchema.optional(),
      })
      .array()
      .optional(),
    endpoint: referenceSchema.array().optional(),
  }),
) satisfies ZodType<Organization>
