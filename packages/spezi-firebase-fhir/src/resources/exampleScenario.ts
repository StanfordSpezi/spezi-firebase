//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  ExampleScenarioActor,
  ExampleScenarioInstance,
  ExampleScenarioInstanceContainedInstance,
  ExampleScenarioInstanceVersion,
  ExampleScenarioProcessStepAlternative,
  ExampleScenarioProcessStepOperation,
  type ExampleScenario,
  type ExampleScenarioProcess,
  type ExampleScenarioProcessStep,
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
  markdownSchema,
  stringSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  exampleScenarioActorTypeSchema,
  publicationStatusSchema,
} from '../valueSets/index.js'

const exampleScenarioInstanceContainedInstanceSchema: ZodType<ExampleScenarioInstanceContainedInstance> =
  backboneElementSchema.extend({
    resourceId: stringSchema,
    _resourceId: elementSchema.optional(),
    versionId: stringSchema.optional(),
    _versionId: elementSchema.optional(),
  })

const exampleScenarioProcessStepAlternativeSchema: ZodType<ExampleScenarioProcessStepAlternative> =
  backboneElementSchema.extend({
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    get step() {
      return exampleScenarioProcessStepSchema.array().optional()
    },
    title: stringSchema,
    _title: elementSchema.optional(),
  })

const exampleScenarioProcessStepOperationSchema: ZodType<ExampleScenarioProcessStepOperation> =
  backboneElementSchema.extend({
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    initiator: stringSchema.optional(),
    _initiator: elementSchema.optional(),
    initiatorActive: booleanSchema.optional(),
    _initiatorActive: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    number: stringSchema,
    _number: elementSchema.optional(),
    receiver: stringSchema.optional(),
    _receiver: elementSchema.optional(),
    receiverActive: booleanSchema.optional(),
    _receiverActive: elementSchema.optional(),
    request: exampleScenarioInstanceContainedInstanceSchema.optional(),
    response: exampleScenarioInstanceContainedInstanceSchema.optional(),
    type: stringSchema.optional(),
    _type: elementSchema.optional(),
  })

const exampleScenarioProcessStepSchema: ZodType<ExampleScenarioProcessStep> =
  backboneElementSchema.extend({
    alternative: exampleScenarioProcessStepAlternativeSchema.array().optional(),
    operation: exampleScenarioProcessStepOperationSchema.optional(),
    pause: booleanSchema.optional(),
    _pause: elementSchema.optional(),
    get process() {
      return exampleScenarioProcessSchema.array().optional()
    },
  })

const exampleScenarioProcessSchema: ZodType<ExampleScenarioProcess> =
  backboneElementSchema.extend({
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    postConditions: markdownSchema.optional(),
    _postConditions: elementSchema.optional(),
    preConditions: markdownSchema.optional(),
    _preConditions: elementSchema.optional(),
    step: exampleScenarioProcessStepSchema.array().optional(),
    title: stringSchema,
    _title: elementSchema.optional(),
  })

const exampleScenarioActorSchema: ZodType<ExampleScenarioActor> =
  backboneElementSchema.extend({
    actorId: stringSchema,
    _actorId: elementSchema.optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    type: exampleScenarioActorTypeSchema,
    _type: elementSchema.optional(),
  })

const exampleScenarioInstanceVersionSchema: ZodType<ExampleScenarioInstanceVersion> =
  backboneElementSchema.extend({
    description: markdownSchema,
    _description: elementSchema.optional(),
    versionId: stringSchema,
    _versionId: elementSchema.optional(),
  })

const exampleScenarioInstanceSchema: ZodType<ExampleScenarioInstance> =
  backboneElementSchema.extend({
    containedInstance: exampleScenarioInstanceContainedInstanceSchema
      .array()
      .optional(),
    description: markdownSchema.optional(),
    _description: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    resourceId: stringSchema,
    _resourceId: elementSchema.optional(),
    resourceType: stringSchema,
    _resourceType: elementSchema.optional(),
    version: exampleScenarioInstanceVersionSchema.array().optional(),
  })

export const untypedExampleScenarioSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('ExampleScenario').readonly(),
    actor: exampleScenarioActorSchema.array().optional(),
    contact: contactDetailSchema.array().optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    instance: exampleScenarioInstanceSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    process: exampleScenarioProcessSchema.array().optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    workflow: urlSchema.array().optional(),
    _workflow: elementSchema.array().optional(),
  }),
) satisfies ZodType<ExampleScenario>

export const exampleScenarioSchema: ZodType<ExampleScenario> =
  untypedExampleScenarioSchema

export class FhirExampleScenario extends FhirDomainResource<ExampleScenario> {
  // Static Functions

  public static parse(value: unknown): FhirExampleScenario {
    return new FhirExampleScenario(exampleScenarioSchema.parse(value))
  }
}
