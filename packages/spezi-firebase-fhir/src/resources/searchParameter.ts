//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import type { SearchParameter } from 'fhir/r4b.js'
import { z } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import { domainResourceSchema } from '../elements/index.js'

export const untypedSearchParameterSchema = z.lazy(() =>
  domainResourceSchema
    .extend({
      resourceType: z.literal('SearchParameter').readonly(),
    })
    .passthrough(),
)

export const searchParameterSchema = untypedSearchParameterSchema

export class FhirSearchParameter extends FhirDomainResource<SearchParameter> {
  // Static Functions

  public static parse(value: unknown): FhirSearchParameter {
    const parsed = searchParameterSchema.parse(value)
    return new FhirSearchParameter(parsed as unknown as SearchParameter)
  }
}
