//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type CodeableConcept,
  type Coding,
  type Extension,
  type DomainResource,
} from 'fhir/r4b.js'
import { type ZodType } from 'zod'
import { narrativeSchema } from './dataTypes/narrative.js'
import { extensionSchema } from './extension.js'
import { resourceSchema } from './resource.js'
import { fhirResourceSchema } from '../resources/fhirResource.js'

export const domainResourceSchema = resourceSchema.extend({
  text: narrativeSchema.optional(),
  get contained() {
    return fhirResourceSchema.array().optional()
  },
  extension: extensionSchema.array().optional(),
  modifierExtension: extensionSchema.array().optional(),
}) satisfies ZodType<DomainResource>

export abstract class FhirDomainResource<ResourceType extends DomainResource> {
  // Constructor

  public constructor(public value: ResourceType) {}

  // Methods

  public codes(concept: CodeableConcept | undefined, filter: Coding): string[] {
    return (
      concept?.coding?.flatMap((coding) => {
        if (filter.system && coding.system !== filter.system) return []
        if (filter.version && coding.version !== filter.version) return []
        return coding.code ? [coding.code] : []
      }) ?? []
    )
  }

  public containsCoding(
    concept: CodeableConcept | undefined,
    filter: Coding[],
  ): boolean {
    return filter.some(
      (filterCoding) =>
        concept?.coding?.some((coding) => {
          if (filterCoding.code && coding.code !== filterCoding.code)
            return false
          if (filterCoding.system && coding.system !== filterCoding.system)
            return false
          if (filterCoding.version && coding.version !== filterCoding.version)
            return false
          return true
        }) ?? false,
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  public containedResource<T extends DomainResource>(
    id: string,
  ): T | undefined {
    return this.value.contained?.find((resource) => resource.id === id) as T
  }

  public extensionsWithUrl(url: string): Extension[] {
    return (this.value.extension ?? []).filter(
      (extension) => extension.url === url,
    )
  }
}
