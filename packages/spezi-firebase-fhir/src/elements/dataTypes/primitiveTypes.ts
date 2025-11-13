//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

// This file contains the primitive types used in FHIR resources, as defined in https://hl7.org/fhir/R4B/datatypes.html.

/**
 * Zod schema for FHIR dateTime primitive type.
 */
export const dateTimeSchema = z
  .string()
  .regex(
    /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?$/,
  )

/**
 * Zod schema for FHIR date primitive type.
 */
export const dateSchema = z
  .string()
  .regex(
    /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?$/,
  )

/**
 * Zod schema for FHIR url primitive type.
 */
export const urlSchema = z.url()

// TODO: Restrict to https://datatracker.ietf.org/doc/html/rfc3986
/**
 * Zod schema for FHIR uri primitive type.
 */
export const uriSchema = z.string().regex(/^\S*$/)

/**
 * Zod schema for FHIR time primitive type.
 */
export const timeSchema = z
  .string()
  .regex(/^([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?$/)

/**
 * Zod schema for FHIR code primitive type.
 */
export const codeSchema = z.string().regex(/^[^\s]+(\s[^\s]+)*$/)

/**
 * Zod schema for FHIR positiveDecimal primitive type (not in FHIR spec).
 */
export const positiveDecimalSchema = z.number().positive()

/**
 * Zod schema for FHIR decimal primitive type.
 */
export const decimalSchema = z.number()

/**
 * Zod schema for FHIR oid primitive type.
 */
export const oidSchema = z.string().regex(/^urn:oid:[0-2](\.(0|[1-9][0-9]*))+$/)

/**
 * Zod schema for FHIR id primitive type.
 */
export const idSchema = z.string().regex(/^[A-Za-z0-9\-\.]{1,64}$/)

/**
 * Zod schema for FHIR instant primitive type.
 */
export const instantSchema = z
  .string()
  .regex(
    /^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))$/,
  )

/**
 * Zod schema for FHIR markdown primitive type.
 */
export const markdownSchema = z.string().regex(/^\s*(\S|\s)*$/)

/**
 * Zod schema for FHIR integer primitive type.
 */
export const intSchema = z.number().int()

/**
 * Zod schema for FHIR unsignedInt primitive type.
 */
export const unsignedIntSchema = z.number().int().nonnegative()

/**
 * Zod schema for FHIR positiveInt primitive type.
 */
export const positiveIntSchema = z.number().int().positive()

/**
 * Zod schema for FHIR string primitive type.
 */
export const stringSchema = z.string()

/**
 * Zod schema for FHIR boolean primitive type.
 */
export const booleanSchema = z.boolean()

/**
 * Zod schema for FHIR uuid primitive type.
 */
export const uuidSchema = z.uuid()

/**
 * Zod schema for FHIR xhtml primitive type.
 */
export const xhtmlSchema = z.string()

/**
 * Zod schema for FHIR canonical primitive type.
 */
export const canonicalSchema = z.url()

/**
 * Zod schema for FHIR base64Binary primitive type.
 */
export const base64BinarySchema = z
  .string()
  .regex(/^(\s*([0-9a-zA-Z\+\/\=]){4}\s*)+$/)
