//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type ExampleScenarioActor,
  type ExampleScenarioInstance,
  type ExampleScenarioInstanceContainedInstance,
  type ExampleScenarioInstanceVersion,
  type ExampleScenarioProcessStepAlternative,
  type ExampleScenarioProcessStepOperation,
  type ExampleScenario,
  type ExampleScenarioProcess,
  type ExampleScenarioProcessStep,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

/**
 * Zod schema for FHIR ExampleScenario resource (untyped version).
 */
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

/**
 * Zod schema for FHIR ExampleScenario resource.
 */
export const exampleScenarioSchema: ZodType<ExampleScenario> =
  untypedExampleScenarioSchema

/**
 * Wrapper class for FHIR ExampleScenario resources.
 * Provides utility methods for working with example scenarios that demonstrate workflow patterns.
 */
export class FhirExampleScenario extends FhirDomainResource<ExampleScenario> {
  // Static Functions

  /**
   * Parses an ExampleScenario resource from unknown data.
   *
   * @param value - The data to parse and validate against the ExampleScenario schema
   * @returns A FhirExampleScenario instance containing the validated resource
   */
  public static parse(value: unknown): FhirExampleScenario {
    return new FhirExampleScenario(exampleScenarioSchema.parse(value))
  }

  /**
   * Gets all identifier values that match any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns Array of identifier values matching the specified systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value that matches any of the provided systems.
   *
   * @param system - One or more system URIs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values that match any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns Array of identifier values matching the specified types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value that matches any of the provided types.
   *
   * @param type - One or more type codings to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
