//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The type of CapabilityStatement
 * http://hl7.org/fhir/valueset-capability-statement-kind.html
 */
export const capabilityStatementKindSchema = z.enum([
  'instance',
  'capability',
  'requirements',
])

/**
 * The type of CapabilityStatement
 * http://hl7.org/fhir/valueset-capability-statement-kind.html
 */
export type CapabilityStatementKind = z.infer<
  typeof capabilityStatementKindSchema
>

/**
 * The mode of a RESTful capability statement
 * http://hl7.org/fhir/valueset-restful-capability-mode.html
 */
export const restfulCapabilityModeSchema = z.enum(['client', 'server'])

/**
 * The mode of a RESTful capability statement
 * http://hl7.org/fhir/valueset-restful-capability-mode.html
 */
export type RestfulCapabilityMode = z.infer<typeof restfulCapabilityModeSchema>

/**
 * Whether the application produces or consumes documents
 * http://hl7.org/fhir/valueset-document-mode.html
 */
export const documentModeSchema = z.enum(['producer', 'consumer'])

/**
 * Whether the application produces or consumes documents
 * http://hl7.org/fhir/valueset-document-mode.html
 */
export type DocumentMode = z.infer<typeof documentModeSchema>

/**
 * The mode of a message capability statement
 * http://hl7.org/fhir/valueset-event-capability-mode.html
 */
export const eventCapabilityModeSchema = z.enum(['sender', 'receiver'])

/**
 * The mode of a message capability statement
 * http://hl7.org/fhir/valueset-event-capability-mode.html
 */
export type EventCapabilityMode = z.infer<typeof eventCapabilityModeSchema>

/**
 * Operations supported by REST at the system level
 * http://hl7.org/fhir/valueset-system-restful-interaction.html
 */
export const systemRestfulInteractionSchema = z.enum([
  'transaction',
  'batch',
  'search-system',
  'history-system',
])

/**
 * Operations supported by REST at the system level
 * http://hl7.org/fhir/valueset-system-restful-interaction.html
 */
export type SystemRestfulInteraction = z.infer<
  typeof systemRestfulInteractionSchema
>

/**
 * How the system supports versioning for a resource
 * http://hl7.org/fhir/valueset-versioning-policy.html
 */
export const resourceVersionPolicySchema = z.enum([
  'no-version',
  'versioned',
  'versioned-update',
])

/**
 * How the system supports versioning for a resource
 * http://hl7.org/fhir/valueset-versioning-policy.html
 */
export type ResourceVersionPolicy = z.infer<typeof resourceVersionPolicySchema>

/**
 * Code that indicates how the server supports conditional read
 * http://hl7.org/fhir/valueset-conditional-read-status.html
 */
export const conditionalReadStatusSchema = z.enum([
  'not-supported',
  'modified-since',
  'not-match',
  'full-support',
])

/**
 * Code that indicates how the server supports conditional read
 * http://hl7.org/fhir/valueset-conditional-read-status.html
 */
export type ConditionalReadStatus = z.infer<typeof conditionalReadStatusSchema>

/**
 * Code that indicates how the server supports conditional delete
 * http://hl7.org/fhir/valueset-conditional-delete-status.html
 */
export const conditionalDeleteStatusSchema = z.enum([
  'not-supported',
  'single',
  'multiple',
])

/**
 * Code that indicates how the server supports conditional delete
 * http://hl7.org/fhir/valueset-conditional-delete-status.html
 */
export type ConditionalDeleteStatus = z.infer<
  typeof conditionalDeleteStatusSchema
>

/**
 * Operations supported by REST at the resource instance level
 * http://hl7.org/fhir/valueset-type-restful-interaction.html
 */
export const typeRestfulInteractionSchema = z.enum([
  'read',
  'vread',
  'update',
  'patch',
  'delete',
  'history-instance',
  'history-type',
  'create',
  'search-type',
])

/**
 * Operations supported by REST at the resource instance level
 * http://hl7.org/fhir/valueset-type-restful-interaction.html
 */
export type TypeRestfulInteraction = z.infer<
  typeof typeRestfulInteractionSchema
>

/**
 * How aggregated references are handled when matching
 * http://hl7.org/fhir/valueset-reference-handling-policy.html
 */
export const referencePolicySchema = z.enum([
  'literal',
  'logical',
  'resolves',
  'enforced',
  'local',
])

/**
 * How aggregated references are handled when matching
 * http://hl7.org/fhir/valueset-reference-handling-policy.html
 */
export type ReferencePolicy = z.infer<typeof referencePolicySchema>
