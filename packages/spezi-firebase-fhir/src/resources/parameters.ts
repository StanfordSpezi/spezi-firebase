//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Parameters, type ParametersParameter } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { fhirResourceSchema } from './fhirResource.js'
import { anyValueSchema } from '../elements/anyValueSchema.js'
import {
  domainResourceSchema,
  elementSchema,
  stringSchema,
} from '../elements/index.js'

const parametersParameterSchema: any = z.lazy(() =>
  anyValueSchema.extend({
    name: stringSchema,
    _name: elementSchema.optional(),
    resource: fhirResourceSchema.optional(),
    part: z
      .lazy(() => parametersParameterSchema)
      .array()
      .optional(),
  }),
)

export const untypedParametersSchema: any = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Parameters').readonly(),
    parameter: parametersParameterSchema.array().optional(),
  }),
)

export const parametersSchema= untypedParametersSchema

export class FhirParameters extends FhirDomainResource<Parameters> {
  // Static Functions

  public static parse(value: unknown): FhirParameters {
    return new FhirParameters(parametersSchema.parse(value))
  }
}
