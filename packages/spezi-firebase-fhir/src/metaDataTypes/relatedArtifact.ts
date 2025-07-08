//
// This source file is part of the ENGAGE-HF project based on the Stanford Spezi Template Application project
//
// SPDX-FileCopyrightText: 2023 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { elementForwardSchema, elementBackwardSchema } from '../elements/element.js'
import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { codeSchema, urlSchema } from '../primitiveTypes/primitiveTypes.js'
import { attachmentForwardSchema, attachmentBackwardSchema } from '../dataTypes/attachment.js'

export const relatedArtifactForwardSchema = elementForwardSchema.extend({
  type: codeSchema.forward,
  label: optionalish(z.string()),
  display: optionalish(z.string()),
  citation: optionalish(z.string()),
  url: optionalish(urlSchema.forward),
  document: optionalish(attachmentForwardSchema),
  resource: optionalish(z.string()),
})

export const relatedArtifactBackwardSchema = elementBackwardSchema.extend({
  type: codeSchema.backward,
  label: optionalish(z.string()),
  display: optionalish(z.string()),
  citation: optionalish(z.string()),
  url: optionalish(urlSchema.backward),
  document: optionalish(attachmentBackwardSchema),
  resource: optionalish(z.string()),
})
