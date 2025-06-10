//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Schema } from '@stanfordspezi/spezi-firebase-utils'
import { z } from 'zod/v4'

// This file contains the primitive types used in FHIR resources, as defined in https://hl7.org/fhir/R4B/datatypes.html.

// TODO: Check if `.url()` is as specified in https://datatracker.ietf.org/doc/html/rfc1738
export const urlSchema = Schema.simple(z.string().url())

// TODO: Restrict to https://datatracker.ietf.org/doc/html/rfc3986
export const uriSchema = Schema.simple(z.string())

export const timeSchema = Schema.simple(
  z.string().regex(/([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/),
)

export const codeSchema = Schema.simple(z.string().regex(/[^\s]+(\s[^\s]+)*/))

export const oidSchema = Schema.simple(
  z.string().regex(/urn:oid:[0-2](\.(0|[1-9][0-9]*))+/),
)

export const idSchema = Schema.simple(z.string().regex(/[A-Za-z0-9\-\.]{1,64}/))

export const markdownSchema = Schema.simple(z.string().regex(/\s*(\S|\s)*/))

export const unsignedIntSchema = Schema.simple(z.number().int().nonnegative())
export const positiveIntSchema = Schema.simple(z.number().int().positive())

export const base64BinarySchema = Schema.simple(
  z.string().regex(/(\s*([0-9a-zA-Z\+\=]){4}\s*)+/),
)
