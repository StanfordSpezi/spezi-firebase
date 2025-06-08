//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { Schema } from '@stanfordspezi/spezi-firebase-utils'
import { elementSchema } from '../elements/element.js'
import {
  base64BinarySchema,
  codeSchema,
  unsignedIntSchema,
  urlSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { z } from 'zod'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

export const attachmentSchema = elementSchema.extend({
  contentType: codeSchema.optionalish(),
  language: codeSchema.optionalish(),
  data: base64BinarySchema.optionalish(),
  url: urlSchema.optionalish(),
  size: unsignedIntSchema.optionalish(),
  hash: base64BinarySchema.optionalish(),
  title: Schema.simple(z.string()).optionalish(),
  creation: dateTimeSchema.optionalish(),
})
