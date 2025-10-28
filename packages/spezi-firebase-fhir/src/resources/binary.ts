//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Binary } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { referenceSchema } from '../elements/dataTypes/reference.js'
import { codeSchema, elementSchema, stringSchema } from '../elements/index.js'
import { resourceSchema } from '../elements/resource.js'

export const untypedBinarySchema = z.lazy(() =>
  resourceSchema.extend({
    resourceType: z.literal('Binary').readonly(),
    contentType: codeSchema,
    _contentType: elementSchema.optional(),
    securityContext: referenceSchema.optional(),
    data: stringSchema.optional(),
    _data: elementSchema.optional(),
  }),
) satisfies ZodType<Binary>

export const binarySchema: ZodType<Binary> = untypedBinarySchema

export class FhirBinary extends FhirDomainResource<Binary> {
  // Static Functions

  public static parse(value: unknown): FhirBinary {
    return new FhirBinary(binarySchema.parse(value))
  }
}
