//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type ExampleScenario } from 'fhir/r4b.js'
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
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
  canonicalSchema,
} from '../elements/index.js'

const exampleScenarioStatusSchema = z.enum([
  'draft',
  'active',
  'retired',
  'unknown',
])

export const untypedExampleScenarioSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ExampleScenario').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    identifier: z.any().array().optional(), // Identifier
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    status: exampleScenarioStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    actor: backboneElementSchema
      .extend({
        actorId: stringSchema,
        _actorId: elementSchema.optional(),
        type: z.enum(['person', 'entity']),
        _type: elementSchema.optional(),
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
        description: markdownSchema.optional(),
        _description: elementSchema.optional(),
      })
      .array()
      .optional(),
    instance: backboneElementSchema
      .extend({
        resourceId: stringSchema,
        _resourceId: elementSchema.optional(),
        resourceType: z.any(), // Code
        _resourceType: elementSchema.optional(),
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
        description: markdownSchema.optional(),
        _description: elementSchema.optional(),
        version: backboneElementSchema
          .extend({
            versionId: stringSchema,
            _versionId: elementSchema.optional(),
            description: markdownSchema,
            _description: elementSchema.optional(),
          })
          .array()
          .optional(),
        containedInstance: backboneElementSchema
          .extend({
            resourceId: stringSchema,
            _resourceId: elementSchema.optional(),
            versionId: stringSchema.optional(),
            _versionId: elementSchema.optional(),
          })
          .array()
          .optional(),
      })
      .array()
      .optional(),
    process: z
      .lazy(() =>
        backboneElementSchema.extend({
          title: stringSchema,
          _title: elementSchema.optional(),
          description: markdownSchema.optional(),
          _description: elementSchema.optional(),
          preConditions: markdownSchema.optional(),
          _preConditions: elementSchema.optional(),
          postConditions: markdownSchema.optional(),
          _postConditions: elementSchema.optional(),
          step: backboneElementSchema
            .extend({
              process: z.array(z.any()).optional(), // Recursive reference
              pause: booleanSchema.optional(),
              _pause: elementSchema.optional(),
              operation: backboneElementSchema
                .extend({
                  number: stringSchema,
                  _number: elementSchema.optional(),
                  type: stringSchema.optional(),
                  _type: elementSchema.optional(),
                  name: stringSchema.optional(),
                  _name: elementSchema.optional(),
                  initiator: stringSchema.optional(),
                  _initiator: elementSchema.optional(),
                  receiver: stringSchema.optional(),
                  _receiver: elementSchema.optional(),
                  description: markdownSchema.optional(),
                  _description: elementSchema.optional(),
                  initiatorActive: booleanSchema.optional(),
                  _initiatorActive: elementSchema.optional(),
                  receiverActive: booleanSchema.optional(),
                  _receiverActive: elementSchema.optional(),
                  request: backboneElementSchema
                    .extend({
                      resourceId: stringSchema,
                      _resourceId: elementSchema.optional(),
                      versionId: stringSchema.optional(),
                      _versionId: elementSchema.optional(),
                    })
                    .optional(),
                  response: backboneElementSchema
                    .extend({
                      resourceId: stringSchema,
                      _resourceId: elementSchema.optional(),
                      versionId: stringSchema.optional(),
                      _versionId: elementSchema.optional(),
                    })
                    .optional(),
                })
                .optional(),
              alternative: backboneElementSchema
                .extend({
                  title: stringSchema,
                  _title: elementSchema.optional(),
                  description: markdownSchema.optional(),
                  _description: elementSchema.optional(),
                  step: z.array(z.any()).optional(), // Recursive reference
                })
                .array()
                .optional(),
            })
            .array()
            .optional(),
        }),
      )
      .array()
      .optional(),
    workflow: canonicalSchema.array().optional(),
    _workflow: elementSchema.array().optional(),
  }),
) satisfies ZodType<ExampleScenario>

export const exampleScenarioSchema: ZodType<ExampleScenario> =
  untypedExampleScenarioSchema

export class FhirExampleScenario extends FhirDomainResource<ExampleScenario> {
  public static parse(value: unknown): FhirExampleScenario {
    return new FhirExampleScenario(exampleScenarioSchema.parse(value))
  }
}
