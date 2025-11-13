//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

/**
 * The type of direction to use for assertion
 * http://hl7.org/fhir/valueset-assert-direction-codes.html
 */
export const assertDirectionSchema = z.enum(['request', 'response'])

/**
 * The type of direction to use for assertion
 * http://hl7.org/fhir/valueset-assert-direction-codes.html
 */
export type AssertDirection = z.infer<typeof assertDirectionSchema>

/**
 * The operator type defines the conditional operator
 * http://hl7.org/fhir/valueset-assert-operator-codes.html
 */
export const assertOperatorSchema = z.enum([
  'equals',
  'notEquals',
  'in',
  'notIn',
  'greaterThan',
  'lessThan',
  'empty',
  'notEmpty',
  'contains',
  'notContains',
  'eval',
])

/**
 * The operator type defines the conditional operator
 * http://hl7.org/fhir/valueset-assert-operator-codes.html
 */
export type AssertOperator = z.infer<typeof assertOperatorSchema>

/**
 * HTTP request method codes
 * http://hl7.org/fhir/valueset-http-verb.html
 */
export const httpVerbSchema = z.enum([
  'GET',
  'HEAD',
  'POST',
  'PUT',
  'DELETE',
  'PATCH',
])

/**
 * HTTP request method codes
 * http://hl7.org/fhir/valueset-http-verb.html
 */
export type HttpVerb = z.infer<typeof httpVerbSchema>

/**
 * Test script request method codes (lowercase)
 * http://hl7.org/fhir/valueset-http-operations.html
 */
export const testScriptRequestMethodSchema = z.enum([
  'delete',
  'get',
  'options',
  'patch',
  'post',
  'put',
  'head',
])

/**
 * Test script request method codes (lowercase)
 * http://hl7.org/fhir/valueset-http-operations.html
 */
export type TestScriptRequestMethod = z.infer<
  typeof testScriptRequestMethodSchema
>

/**
 * assertion response code(s) for the operation
 * http://hl7.org/fhir/valueset-assert-response-code-types.html
 */
export const assertResponseCodeSchema = z.enum([
  'okay',
  'created',
  'noContent',
  'notModified',
  'bad',
  'forbidden',
  'notFound',
  'methodNotAllowed',
  'conflict',
  'gone',
  'preconditionFailed',
  'unprocessable',
])

/**
 * assertion response code(s) for the operation
 * http://hl7.org/fhir/valueset-assert-response-code-types.html
 */
export type AssertResponseCode = z.infer<typeof assertResponseCodeSchema>

/**
 * MIME content types
 * http://hl7.org/fhir/valueset-mimetypes.html
 */
export const mimeTypeSchema = z.enum([
  'application/json',
  'application/xml',
  'application/fhir+json',
  'application/fhir+xml',
  'text/html',
  'text/plain',
  'text/xml',
])

/**
 * MIME content types
 * http://hl7.org/fhir/valueset-mimetypes.html
 */
export type MimeType = z.infer<typeof mimeTypeSchema>
