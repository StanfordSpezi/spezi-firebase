//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type List } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import { listStatusSchema, listModeSchema } from '../valueSets/index.js'

export const untypedListSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('List').readonly(),
    identifier: identifierSchema.array().optional(),
    status: listStatusSchema.readonly(),
    _status: elementSchema.optional(),
    mode: listModeSchema.readonly(),
    _mode: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    source: referenceSchema.optional(),
    orderedBy: codeableConceptSchema.optional(),
    note: annotationSchema.array().optional(),
    entry: backboneElementSchema
      .extend({
        flag: codeableConceptSchema.optional(),
        deleted: booleanSchema.optional(),
        _deleted: elementSchema.optional(),
        date: dateTimeSchema.optional(),
        _date: elementSchema.optional(),
        item: referenceSchema,
      })
      .array()
      .optional(),
    emptyReason: codeableConceptSchema.optional(),
  }),
)

export const listSchema= untypedListSchema

export class FhirList extends FhirDomainResource<List> {
  // Static Functions

  public static parse(value: unknown): FhirList {
    return new FhirList(listSchema.parse(value))
  }
}
