//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  BidirectionalSchema,
  optionalish,
} from '@stanfordspezi/spezi-firebase-utils'
import {
  elementBackwardSchema,
  elementForwardSchema,
} from '../elements/element.js'
import {
  base64BinarySchema,
  codeSchema,
  unsignedIntSchema,
  urlSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { z } from 'zod/v4'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

export const attachmentForwardSchema = elementForwardSchema.extend({
  contentType: optionalish(codeSchema.forward),
  language: optionalish(codeSchema.forward),
  data: optionalish(base64BinarySchema.forward),
  url: optionalish(urlSchema.forward),
  size: optionalish(unsignedIntSchema.forward),
  hash: optionalish(base64BinarySchema.forward),
  title: optionalish(z.string()),
  creation: optionalish(dateTimeSchema.forward),
})

export const attachmentBackwardSchema = elementBackwardSchema.extend({
  ontentType: optionalish(codeSchema.backward),
  language: optionalish(codeSchema.backward),
  data: optionalish(base64BinarySchema.backward),
  url: optionalish(urlSchema.backward),
  size: optionalish(unsignedIntSchema.backward),
  hash: optionalish(base64BinarySchema.backward),
  title: optionalish(z.string()),
  creation: optionalish(dateTimeSchema.backward),
})

export const attachmentSchema = BidirectionalSchema.separate(
  attachmentForwardSchema,
  attachmentBackwardSchema,
)
