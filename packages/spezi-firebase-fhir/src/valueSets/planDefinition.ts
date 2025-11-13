//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The kind of condition for the action.
 * http://hl7.org/fhir/valueset-action-condition-kind.html
 */
export const planDefinitionActionConditionKindSchema = z.enum([
  'applicability',
  'start',
  'stop',
])

/**
 * The kind of condition for the action.
 * http://hl7.org/fhir/valueset-action-condition-kind.html
 */
export type PlanDefinitionActionConditionKind = z.infer<
  typeof planDefinitionActionConditionKindSchema
>

/**
 * Defines organization behavior of a group.
 * http://hl7.org/fhir/valueset-action-grouping-behavior.html
 */
export const planDefinitionActionGroupingBehaviorSchema = z.enum([
  'visual-group',
  'logical-group',
  'sentence-group',
])

/**
 * Defines organization behavior of a group.
 * http://hl7.org/fhir/valueset-action-grouping-behavior.html
 */
export type PlanDefinitionActionGroupingBehavior = z.infer<
  typeof planDefinitionActionGroupingBehaviorSchema
>

/**
 * Defines selection behavior of a group.
 * http://hl7.org/fhir/valueset-action-selection-behavior.html
 */
export const planDefinitionActionSelectionBehaviorSchema = z.enum([
  'any',
  'all',
  'all-or-none',
  'exactly-one',
  'at-most-one',
  'one-or-more',
])

/**
 * Defines selection behavior of a group.
 * http://hl7.org/fhir/valueset-action-selection-behavior.html
 */
export type PlanDefinitionActionSelectionBehavior = z.infer<
  typeof planDefinitionActionSelectionBehaviorSchema
>

/**
 * Defines expectations around whether an action or action group is required.
 * http://hl7.org/fhir/valueset-action-required-behavior.html
 */
export const planDefinitionActionRequiredBehaviorSchema = z.enum([
  'must',
  'could',
  'must-unless-documented',
])

/**
 * Defines expectations around whether an action or action group is required.
 * http://hl7.org/fhir/valueset-action-required-behavior.html
 */
export type PlanDefinitionActionRequiredBehavior = z.infer<
  typeof planDefinitionActionRequiredBehaviorSchema
>

/**
 * Defines selection frequency behavior for an action or group.
 * http://hl7.org/fhir/valueset-action-precheck-behavior.html
 */
export const planDefinitionActionPrecheckBehaviorSchema = z.enum(['yes', 'no'])

/**
 * Defines selection frequency behavior for an action or group.
 * http://hl7.org/fhir/valueset-action-precheck-behavior.html
 */
export type PlanDefinitionActionPrecheckBehavior = z.infer<
  typeof planDefinitionActionPrecheckBehaviorSchema
>

/**
 * Defines behavior for an action or a group for how many times that item may be repeated.
 * http://hl7.org/fhir/valueset-action-cardinality-behavior.html
 */
export const planDefinitionActionCardinalityBehaviorSchema = z.enum([
  'single',
  'multiple',
])

/**
 * Defines behavior for an action or a group for how many times that item may be repeated.
 * http://hl7.org/fhir/valueset-action-cardinality-behavior.html
 */
export type PlanDefinitionActionCardinalityBehavior = z.infer<
  typeof planDefinitionActionCardinalityBehaviorSchema
>

/**
 * Defines the types of relationships between actions.
 * http://hl7.org/fhir/valueset-action-relationship-type.html
 */
export const planDefinitionActionRelationshipTypeSchema = z.enum([
  'before-start',
  'before',
  'before-end',
  'concurrent-with-start',
  'concurrent',
  'concurrent-with-end',
  'after-start',
  'after',
  'after-end',
])

/**
 * Defines the types of relationships between actions.
 * http://hl7.org/fhir/valueset-action-relationship-type.html
 */
export type PlanDefinitionActionRelationshipType = z.infer<
  typeof planDefinitionActionRelationshipTypeSchema
>

/**
 * The type of participant in the action.
 * http://hl7.org/fhir/valueset-action-participant-type.html
 */
export const planDefinitionActionParticipantTypeSchema = z.enum([
  'patient',
  'practitioner',
  'related-person',
  'device',
])

/**
 * The type of participant in the action.
 * http://hl7.org/fhir/valueset-action-participant-type.html
 */
export type PlanDefinitionActionParticipantType = z.infer<
  typeof planDefinitionActionParticipantTypeSchema
>
