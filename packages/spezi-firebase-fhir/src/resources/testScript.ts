//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type TestScript } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  idSchema,
  intSchema,
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
  codeSchema,
} from '../elements/index.js'

const testScriptStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

export const untypedTestScriptSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('TestScript').readonly(),
    url: urlSchema,
    _url: elementSchema.optional(),
    identifier: z.any().optional(), // Identifier
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: testScriptStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    origin: backboneElementSchema
      .extend({
        index: intSchema,
        _index: elementSchema.optional(),
        profile: codingSchema,
      })
      .array()
      .optional(),
    destination: backboneElementSchema
      .extend({
        index: intSchema,
        _index: elementSchema.optional(),
        profile: codingSchema,
      })
      .array()
      .optional(),
    metadata: backboneElementSchema
      .extend({
        link: backboneElementSchema
          .extend({
            url: urlSchema,
            _url: elementSchema.optional(),
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
          })
          .array()
          .optional(),
        capability: backboneElementSchema
          .extend({
            required: booleanSchema,
            _required: elementSchema.optional(),
            validated: booleanSchema,
            _validated: elementSchema.optional(),
            description: stringSchema.optional(),
            _description: elementSchema.optional(),
            origin: intSchema.array().optional(),
            _origin: elementSchema.array().optional(),
            destination: intSchema.optional(),
            _destination: elementSchema.optional(),
            link: urlSchema.array().optional(),
            _link: elementSchema.array().optional(),
            capabilities: z.any(), // Canonical to CapabilityStatement
          })
          .array(),
      })
      .optional(),
    fixture: backboneElementSchema
      .extend({
        autocreate: booleanSchema,
        _autocreate: elementSchema.optional(),
        autodelete: booleanSchema,
        _autodelete: elementSchema.optional(),
        resource: z.any().optional(), // Reference to any resource
      })
      .array()
      .optional(),
    profile: z.any().array().optional(), // Reference array
    variable: backboneElementSchema
      .extend({
        name: stringSchema,
        _name: elementSchema.optional(),
        defaultValue: stringSchema.optional(),
        _defaultValue: elementSchema.optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        expression: stringSchema.optional(),
        _expression: elementSchema.optional(),
        headerField: stringSchema.optional(),
        _headerField: elementSchema.optional(),
        hint: stringSchema.optional(),
        _hint: elementSchema.optional(),
        path: stringSchema.optional(),
        _path: elementSchema.optional(),
        sourceId: idSchema.optional(),
        _sourceId: elementSchema.optional(),
      })
      .array()
      .optional(),
    setup: backboneElementSchema
      .extend({
        action: backboneElementSchema
          .extend({
            operation: z.any().optional(), // Complex nested structure
            assert: z.any().optional(), // Complex nested structure
          })
          .array(),
      })
      .optional(),
    test: backboneElementSchema
      .extend({
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        action: backboneElementSchema
          .extend({
            operation: z.any().optional(), // Complex nested structure
            assert: z.any().optional(), // Complex nested structure
          })
          .array(),
      })
      .array()
      .optional(),
    teardown: backboneElementSchema
      .extend({
        action: backboneElementSchema
          .extend({
            operation: z.any(), // Complex nested structure
          })
          .array(),
      })
      .optional(),
  }),
) satisfies ZodType<TestScript>

export const testScriptSchema: ZodType<TestScript> =
  untypedTestScriptSchema

export class FhirTestScript extends FhirDomainResource<TestScript> {
  public static parse(value: unknown): FhirTestScript {
    return new FhirTestScript(testScriptSchema.parse(value))
  }
}
