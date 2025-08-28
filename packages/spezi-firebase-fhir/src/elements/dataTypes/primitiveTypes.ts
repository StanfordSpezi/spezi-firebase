//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'

// This file contains the primitive types used in FHIR resources, as defined in https://hl7.org/fhir/R4B/datatypes.html.

export const dateTimeSchema = z
  .string()
  .regex(
    /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/,
  )

export const dateSchema = z
  .string()
  .regex(
    /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/,
  )

export const urlSchema = z.url()

// TODO: Restrict to https://datatracker.ietf.org/doc/html/rfc3986
export const uriSchema = z.string().regex(/\S*/)

export const timeSchema = z
  .string()
  .regex(/([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/)

export const codeSchema = z.string().regex(/[^\s]+(\s[^\s]+)*/)

export const positiveDecimalSchema = z.number().positive()

export const decimalSchema = z.number()

export const oidSchema = z.string().regex(/urn:oid:[0-2](\.(0|[1-9][0-9]*))+/)

export const idSchema = z.string().regex(/[A-Za-z0-9\-\.]{1,64}/)

export const instantSchema = z
  .string()
  .regex(
    /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00))/,
  )

export const markdownSchema = z.string().regex(/\s*(\S|\s)*/)

export const intSchema = z.number().int()

export const unsignedIntSchema = z.number().int().nonnegative()

export const positiveIntSchema = z.number().int().positive()

export const stringSchema = z.string()

export const booleanSchema = z.boolean()

export const uuidSchema = z.uuid()

export const xhtmlSchema = z.string()

export const canonicalSchema = z.url()

export const base64BinarySchema = z
  .string()
  .regex(/(\s*([0-9a-zA-Z\+\=]){4}\s*)+/)
