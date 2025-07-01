//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  codeSchema,
  markdownSchema,
  timeSchema,
  uriSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { identifierForwardSchema } from '../dataTypes/identifier.js'
import { z } from 'zod/v4'
import { contactDetailSchema } from '../metaDataTypes/contactDetail.js'
import { usageContextSchema } from '../metaDataTypes/usageContext.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { periodSchema } from '../dataTypes/period.js'
import { codingSchema } from '../dataTypes/coding.js'
import { backBoneElementForwardSchema } from '../elements/backBoneElement.js'
import { quantitySchema } from '../dataTypes/quantity.js'
import { dateSchema } from '../primitiveTypes/date.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { referenceForwardSchema } from '../dataTypes/reference.js'

export enum PublicationStatus {
  draft = 'draft',
  active = 'active',
  final = 'final',
  retired = 'retired',
  unknown = 'unknown',
}

export const questionnaireEnableWhenSchema =
  backBoneElementForwardSchema.extend({
    question: z.string(),
    operator: codeSchema.forward,
    get answerBoolean() {
      return optionalish(z.boolean())
    },
    answerDecimal: optionalish(z.number()),
    answerInteger: optionalish(z.number().int()),
    answerDate: optionalish(dateSchema.forward),
    answerDateTime: optionalish(dateTimeSchema.forward),
    answerTime: optionalish(timeSchema.forward),
    answerString: optionalish(z.string()),
    get answerCoding() {
      return optionalish(codingSchema)
    },
    get answerQuantity() {
      return optionalish(quantitySchema)
    },
    get answerReference() {
      return optionalish(referenceForwardSchema)
    },
  })

export const questionnaireItemForwardSchema =
  backBoneElementForwardSchema.extend({
    linkId: z.string(),
    definition: optionalish(uriSchema.forward),
    get code() {
      return optionalish(codingSchema.array())
    },
    prefix: optionalish(z.string()),
    text: optionalish(z.string()),
    type: codeSchema,
    get enableWhen() {
      return optionalish(questionnaireEnableWhenSchema.array())
    },
    // get item() {
    //   return questionnaireItemForwardSchema.array().optional()
    // },
  })

export const questionaireSchema = domainResourceSchema.extend({
  url: optionalish(uriSchema.forward),
  identifier: optionalish(identifierForwardSchema.array()),
  version: optionalish(z.string()),
  name: optionalish(z.string()),
  title: optionalish(z.string()),
  derivedFrom: optionalish(z.string().array()),
  status: z.enum(PublicationStatus),
  experimental: optionalish(z.boolean()),
  subjectType: optionalish(codeSchema.forward.array()),
  date: optionalish(dateTimeSchema.forward),
  publisher: optionalish(z.string()),
  get contact() {
    return optionalish(contactDetailSchema.array())
  },
  description: optionalish(markdownSchema.forward),
  useContext: optionalish(usageContextSchema.array()),
  get jurisdiction() {
    return optionalish(codeableConceptSchema.array())
  },
  purpose: optionalish(markdownSchema.forward),
  copyright: optionalish(markdownSchema.forward),
  approvalDate: optionalish(dateTimeSchema.forward),
  lastReviewDate: optionalish(dateTimeSchema.forward),
  get effectivePeriod() {
    return optionalish(periodSchema.forward)
  },
  code: optionalish(codingSchema),
})
