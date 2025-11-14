//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type CompositionAttester,
  type CompositionEvent,
  type CompositionRelatesTo,
  type CompositionSection,
  type Composition,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  backboneElementSchema,
  codeableConceptSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  narrativeSchema,
  periodSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  compositionAttestationModeSchema,
  compositionRelatestoCodeSchema,
  compositionStatusSchema,
  listModeSchema,
} from '../valueSets/index.js'

const attesterSchema: ZodType<CompositionAttester> =
  backboneElementSchema.extend({
    mode: compositionAttestationModeSchema,
    time: stringSchema.optional(),
    _time: elementSchema.optional(),
    party: referenceSchema.optional(),
  })

const relatesToSchema: ZodType<CompositionRelatesTo> =
  backboneElementSchema.extend({
    code: compositionRelatestoCodeSchema,
    targetIdentifier: identifierSchema.optional(),
    targetReference: referenceSchema.optional(),
  })

const eventSchema: ZodType<CompositionEvent> = backboneElementSchema.extend({
  code: codeableConceptSchema.array().optional(),
  period: periodSchema.optional(),
  detail: referenceSchema.array().optional(),
})

const sectionSchema: ZodType<CompositionSection> = backboneElementSchema.extend(
  {
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    text: narrativeSchema.optional(),
    mode: listModeSchema.optional(),
    orderedBy: codeableConceptSchema.optional(),
    entry: referenceSchema.array().optional(),
    emptyReason: codeableConceptSchema.optional(),
    get section() {
      return sectionSchema.array().optional()
    },
  },
)

/**
 * Zod schema for FHIR Composition resource (untyped version).
 */
export const untypedCompositionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Composition').readonly(),
    identifier: identifierSchema.optional(),
    status: compositionStatusSchema,
    _status: elementSchema.optional(),
    type: codeableConceptSchema,
    category: codeableConceptSchema.array().optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    date: stringSchema,
    _date: elementSchema.optional(),
    author: referenceSchema.array(),
    title: stringSchema,
    _title: elementSchema.optional(),
    confidentiality: stringSchema.optional(),
    _confidentiality: elementSchema.optional(),
    attester: attesterSchema.array().optional(),
    custodian: referenceSchema.optional(),
    relatesTo: relatesToSchema.array().optional(),
    event: eventSchema.array().optional(),
    section: sectionSchema.array().optional(),
  }),
) satisfies ZodType<Composition>

/**
 * Zod schema for FHIR Composition resource.
 */
export const compositionSchema: ZodType<Composition> = untypedCompositionSchema

/**
 * Wrapper class for FHIR Composition resources.
 * Provides utility methods for working with clinical document compositions.
 */
export class FhirComposition extends FhirDomainResource<Composition> {
  /**
   * Parses a Composition resource from unknown data.
   *
   * @param value - The data to parse and validate against the Composition schema
   * @returns A FhirComposition instance containing the validated resource
   */
  public static parse(value: unknown): FhirComposition {
    return new FhirComposition(compositionSchema.parse(value))
  }

  /**
   * Gets the composition date as a JavaScript Date object.
   *
   * @returns The composition date, if available
   */
  public get date(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Gets the type of composition as display text.
   *
   * @returns The type display text, if available
   */
  public get typeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.type)
  }
}
