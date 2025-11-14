//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type TaskInput,
  type TaskOutput,
  type TaskRestriction,
  type Task,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import { anyValueSchema } from '../elements/anyValueSchema.js'
import {
  annotationSchema,
  backboneElementSchema,
  canonicalSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  positiveIntSchema,
  referenceSchema,
  stringSchema,
} from '../elements/index.js'
import {
  requestPrioritySchema,
  taskIntentSchema,
  taskStatusSchema,
} from '../valueSets/index.js'

const taskRestrictionSchema: ZodType<TaskRestriction> =
  backboneElementSchema.extend({
    repetitions: positiveIntSchema.optional(),
    period: periodSchema.optional(),
    recipient: referenceSchema.array().optional(),
  })

const taskInputSchema: ZodType<TaskInput> = anyValueSchema.extend({
  type: codeableConceptSchema,
})

const taskOutputSchema: ZodType<TaskOutput> = anyValueSchema.extend({
  type: codeableConceptSchema,
})

/**
 * Zod schema for FHIR Task resource (untyped version).
 */
export const untypedTaskSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Task').readonly(),
    identifier: identifierSchema.array().optional(),
    instantiatesCanonical: canonicalSchema.optional(),
    _instantiatesCanonical: elementSchema.optional(),
    basedOn: referenceSchema.array().optional(),
    groupIdentifier: identifierSchema.optional(),
    partOf: referenceSchema.array().optional(),
    status: taskStatusSchema,
    _status: elementSchema.optional(),
    statusReason: codeableConceptSchema.optional(),
    businessStatus: codeableConceptSchema.optional(),
    intent: taskIntentSchema,
    _intent: elementSchema.optional(),
    priority: requestPrioritySchema.optional(),
    _priority: elementSchema.optional(),
    code: codeableConceptSchema.optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    focus: referenceSchema.optional(),
    for: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    executionPeriod: periodSchema.optional(),
    authoredOn: dateTimeSchema.optional(),
    _authoredOn: elementSchema.optional(),
    lastModified: dateTimeSchema.optional(),
    _lastModified: elementSchema.optional(),
    requester: referenceSchema.optional(),
    performerType: codeableConceptSchema.array().optional(),
    owner: referenceSchema.optional(),
    location: referenceSchema.optional(),
    reasonCode: codeableConceptSchema.optional(),
    reasonReference: referenceSchema.optional(),
    insurance: referenceSchema.array().optional(),
    note: annotationSchema.array().optional(),
    relevantHistory: referenceSchema.array().optional(),
    restriction: taskRestrictionSchema.optional(),
    input: taskInputSchema.array().optional(),
    output: taskOutputSchema.array().optional(),
  }),
) satisfies ZodType<Task>

/**
 * Zod schema for FHIR Task resource.
 */
export const taskSchema: ZodType<Task> = untypedTaskSchema

/**
 * Wrapper class for FHIR Task resources.
 * Provides utility methods for working with tasks that describe activities to be performed.
 */
export class FhirTask extends FhirDomainResource<Task> {
  /**
   * Parses a Task resource from unknown data.
   *
   * @param value - The data to parse and validate against the Task schema
   * @returns A FhirTask instance containing the validated resource
   */
  public static parse(value: unknown): FhirTask {
    return new FhirTask(taskSchema.parse(value))
  }

  /**
   * Gets the authored date as a JavaScript Date object.
   *
   * @returns The parsed authored date, or undefined if not set
   */
  public get authoredDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.authoredOn)
  }

  /**
   * Gets the display text from the code field.
   *
   * @returns The code display text, or undefined if not set
   */
  public get codeDisplay(): string | undefined {
    return FhirDomainResource.codeableConceptDisplay(this.value.code)
  }

  /**
   * Retrieves all identifier values matching any of the specified system URIs.
   *
   * @param system - One or more system URIs to filter identifiers by
   * @returns Array of identifier values from matching systems
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Retrieves the first identifier value matching any of the specified system URIs.
   *
   * @param system - One or more system URIs to filter identifiers by
   * @returns The first matching identifier value, or undefined if none found
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Retrieves all identifier values matching any of the specified type codings.
   *
   * @param type - One or more Coding objects representing identifier types
   * @returns Array of identifier values from matching types
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Retrieves the first identifier value matching any of the specified type codings.
   *
   * @param type - One or more Coding objects representing identifier types
   * @returns The first matching identifier value, or undefined if none found
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
