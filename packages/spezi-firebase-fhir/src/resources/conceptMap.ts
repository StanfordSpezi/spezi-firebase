//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  ConceptMapGroup,
  ConceptMapGroupElement,
  ConceptMapGroupElementTarget,
  ConceptMapGroupElementTargetDependsOn,
  ConceptMapGroupUnmapped,
  type ConceptMap,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  conceptMapEquivalenceSchema,
  conceptMapUnmappedModeSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const conceptMapGroupElementTargetDependsOnSchema: ZodType<ConceptMapGroupElementTargetDependsOn> =
  backboneElementSchema.extend({
    property: urlSchema,
    _property: elementSchema.optional(),
    system: urlSchema.optional(),
    _system: elementSchema.optional(),
    value: stringSchema,
    _value: elementSchema.optional(),
    display: stringSchema.optional(),
    _display: elementSchema.optional(),
  })

const conceptMapGroupElementTargetSchema: ZodType<ConceptMapGroupElementTarget> =
  backboneElementSchema.extend({
    code: stringSchema.optional(),
    _code: elementSchema.optional(),
    display: stringSchema.optional(),
    _display: elementSchema.optional(),
    equivalence: conceptMapEquivalenceSchema,
    _equivalence: elementSchema.optional(),
    comment: stringSchema.optional(),
    _comment: elementSchema.optional(),
    dependsOn: conceptMapGroupElementTargetDependsOnSchema.array().optional(),
    product: conceptMapGroupElementTargetDependsOnSchema.array().optional(),
  })

const conceptMapGroupElementSchema: ZodType<ConceptMapGroupElement> =
  backboneElementSchema.extend({
    code: stringSchema.optional(),
    _code: elementSchema.optional(),
    display: stringSchema.optional(),
    _display: elementSchema.optional(),
    target: conceptMapGroupElementTargetSchema.array().optional(),
  })

const conceptMapGroupUnmappedSchema: ZodType<ConceptMapGroupUnmapped> =
  backboneElementSchema.extend({
    mode: conceptMapUnmappedModeSchema,
    _mode: elementSchema.optional(),
    code: stringSchema.optional(),
    _code: elementSchema.optional(),
    display: stringSchema.optional(),
    _display: elementSchema.optional(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
  })

const conceptMapGroupSchema: ZodType<ConceptMapGroup> =
  backboneElementSchema.extend({
    source: urlSchema.optional(),
    _source: elementSchema.optional(),
    sourceVersion: stringSchema.optional(),
    _sourceVersion: elementSchema.optional(),
    target: urlSchema.optional(),
    _target: elementSchema.optional(),
    targetVersion: stringSchema.optional(),
    _targetVersion: elementSchema.optional(),
    element: conceptMapGroupElementSchema.array(),
    unmapped: conceptMapGroupUnmappedSchema.optional(),
  })

export const untypedConceptMapSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ConceptMap').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: stringSchema.optional(),
    _purpose: elementSchema.optional(),
    copyright: stringSchema.optional(),
    _copyright: elementSchema.optional(),
    sourceUri: urlSchema.optional(),
    _sourceUri: elementSchema.optional(),
    sourceCanonical: urlSchema.optional(),
    _sourceCanonical: elementSchema.optional(),
    targetUri: urlSchema.optional(),
    _targetUri: elementSchema.optional(),
    targetCanonical: urlSchema.optional(),
    _targetCanonical: elementSchema.optional(),
    group: conceptMapGroupSchema.array().optional(),
  }),
) satisfies ZodType<ConceptMap>

export const conceptMapSchema: ZodType<ConceptMap> = untypedConceptMapSchema

export class FhirConceptMap extends FhirDomainResource<ConceptMap> {
  // Static Functions

  public static parse(value: unknown): FhirConceptMap {
    return new FhirConceptMap(conceptMapSchema.parse(value))
  }
}
