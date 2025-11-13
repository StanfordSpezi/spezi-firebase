//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The status of the request group.
 * http://hl7.org/fhir/valueset-request-status.html
 */
export const requestGroupStatusSchema = z.enum([
  'draft',
  'active',
  'on-hold',
  'revoked',
  'completed',
  'entered-in-error',
  'unknown',
])

/**
 * The status of the request group.
 * http://hl7.org/fhir/valueset-request-status.html
 */
export type RequestGroupStatus = z.infer<typeof requestGroupStatusSchema>

/**
 * Codes indicating the intent of the request group.
 * http://hl7.org/fhir/valueset-request-intent.html
 */
export const requestGroupIntentSchema = z.enum([
  'proposal',
  'plan',
  'directive',
  'order',
  'original-order',
  'reflex-order',
  'filler-order',
  'instance-order',
  'option',
])

/**
 * Codes indicating the intent of the request group.
 * http://hl7.org/fhir/valueset-request-intent.html
 */
export type RequestGroupIntent = z.infer<typeof requestGroupIntentSchema>

/**
 * Defines the kinds of conditions that can appear on actions.
 * http://hl7.org/fhir/valueset-action-condition-kind.html
 */
export const requestGroupActionConditionKindSchema = z.enum([
  'applicability',
  'start',
  'stop',
])

/**
 * Defines the kinds of conditions that can appear on actions.
 * http://hl7.org/fhir/valueset-action-condition-kind.html
 */
export type RequestGroupActionConditionKind = z.infer<
  typeof requestGroupActionConditionKindSchema
>

/**
 * Defines the types of relationships between actions.
 * http://hl7.org/fhir/valueset-action-relationship-type.html
 */
export const requestGroupActionRelationshipTypeSchema = z.enum([
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
export type RequestGroupActionRelationshipType = z.infer<
  typeof requestGroupActionRelationshipTypeSchema
>

/**
 * Defines organization behavior of a group.
 * http://hl7.org/fhir/valueset-action-grouping-behavior.html
 */
export const requestGroupActionGroupingBehaviorSchema = z.enum([
  'visual-group',
  'logical-group',
  'sentence-group',
])

/**
 * Defines organization behavior of a group.
 * http://hl7.org/fhir/valueset-action-grouping-behavior.html
 */
export type RequestGroupActionGroupingBehavior = z.infer<
  typeof requestGroupActionGroupingBehaviorSchema
>

/**
 * Defines selection behavior of a group.
 * http://hl7.org/fhir/valueset-action-selection-behavior.html
 */
export const requestGroupActionSelectionBehaviorSchema = z.enum([
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
export type RequestGroupActionSelectionBehavior = z.infer<
  typeof requestGroupActionSelectionBehaviorSchema
>

/**
 * Defines expectations around whether an action or action group is required.
 * http://hl7.org/fhir/valueset-action-required-behavior.html
 */
export const requestGroupActionRequiredBehaviorSchema = z.enum([
  'must',
  'could',
  'must-unless-documented',
])

/**
 * Defines expectations around whether an action or action group is required.
 * http://hl7.org/fhir/valueset-action-required-behavior.html
 */
export type RequestGroupActionRequiredBehavior = z.infer<
  typeof requestGroupActionRequiredBehaviorSchema
>

/**
 * Defines selection frequency behavior for an action or group.
 * http://hl7.org/fhir/valueset-action-precheck-behavior.html
 */
export const requestGroupActionPrecheckBehaviorSchema = z.enum(['yes', 'no'])

/**
 * Defines selection frequency behavior for an action or group.
 * http://hl7.org/fhir/valueset-action-precheck-behavior.html
 */
export type RequestGroupActionPrecheckBehavior = z.infer<
  typeof requestGroupActionPrecheckBehaviorSchema
>

/**
 * Defines behavior for an action or a group for how many times that item may be repeated.
 * http://hl7.org/fhir/valueset-action-cardinality-behavior.html
 */
export const requestGroupActionCardinalityBehaviorSchema = z.enum([
  'single',
  'multiple',
])

/**
 * Defines behavior for an action or a group for how many times that item may be repeated.
 * http://hl7.org/fhir/valueset-action-cardinality-behavior.html
 */
export type RequestGroupActionCardinalityBehavior = z.infer<
  typeof requestGroupActionCardinalityBehaviorSchema
>
