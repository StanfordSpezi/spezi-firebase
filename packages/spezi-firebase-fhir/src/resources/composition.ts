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
import { FhirDomainResource } from './domainResourceClass.js'
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

const attesterSchema: ZodType<CompositionAttester> = z.lazy(() =>
  backboneElementSchema.extend({
    mode: z.enum(['personal', 'professional', 'legal', 'official']),
    time: stringSchema.optional(),
    _time: elementSchema.optional(),
    party: referenceSchema.optional(),
  }),
)

const relatesToSchema: ZodType<CompositionRelatesTo> = z.lazy(() =>
  backboneElementSchema.extend({
    code: z.enum(['replaces', 'transforms', 'signs', 'appends']),
    targetIdentifier: identifierSchema.optional(),
    targetReference: referenceSchema.optional(),
  }),
)

const eventSchema: ZodType<CompositionEvent> = z.lazy(() =>
  backboneElementSchema.extend({
    code: codeableConceptSchema.array().optional(),
    period: periodSchema.optional(),
    detail: referenceSchema.array().optional(),
  }),
)

const sectionSchema: ZodType<CompositionSection> = z.lazy(() =>
  backboneElementSchema.extend({
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    text: narrativeSchema.optional(),
    mode: z.enum(['working', 'snapshot', 'changes']).optional(),
    orderedBy: codeableConceptSchema.optional(),
    entry: referenceSchema.array().optional(),
    emptyReason: codeableConceptSchema.optional(),
    get section() {
      return sectionSchema.array().optional()
    },
  }),
)

export const untypedCompositionSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Composition').readonly(),
    identifier: identifierSchema.optional(),
    status: z
      .enum(['preliminary', 'final', 'amended', 'entered-in-error']),
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

export const compositionSchema: ZodType<Composition> = untypedCompositionSchema

export class FhirComposition extends FhirDomainResource<Composition> {
  // Static Functions

  public static parse(value: unknown): FhirComposition {
    return new FhirComposition(compositionSchema.parse(value))
  }
}
