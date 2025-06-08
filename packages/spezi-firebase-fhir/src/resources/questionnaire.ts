//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { optionalish, Schema } from '@stanfordspezi/spezi-firebase-utils'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  codeSchema,
  markdownSchema,
  timeSchema,
  uriSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { identifierSchema } from '../dataTypes/identifier.js'
import { z } from 'zod'
import { contactDetailSchema } from '../metaDataTypes/contactDetail.js'
import { usageContextSchema } from '../metaDataTypes/usageContext.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { periodSchema } from '../dataTypes/period.js'
import { codingSchema } from '../dataTypes/coding.js'
import { backBoneElementSchema } from '../elements/backBoneElement.js'
import { quantitySchema } from '../dataTypes/quantity.js'
import { referenceSchema } from '../dataTypes/reference.js'
import { dateSchema } from '../primitiveTypes/date.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'

export enum PublicationStatus {
  draft = 'draft',
  active = 'active',
  retired = 'retired',
  unknown = 'unknown',
}

export const questionnaireEnableWhenSchema = backBoneElementSchema.extend({
  question: Schema.simple(z.string()),
  operator: codeSchema,
  answerBoolean: optionalish(Schema.simple(z.boolean())),
  answerDecimal: optionalish(Schema.simple(z.number())),
  answerInteger: optionalish(Schema.simple(z.number().int())),
  answerDate: optionalish(dateSchema),
  answerDateTime: optionalish(dateTimeSchema),
  answerTime: optionalish(timeSchema),
  answerString: optionalish(Schema.simple(z.string())),
  answerCoding: optionalish(codingSchema),
  answerQuantity: optionalish(quantitySchema),
  answerReference: optionalish(referenceSchema),
})

export const questionnaireItemSchema = backBoneElementSchema.extend({
  linkId: Schema.simple(z.string()),
  definition: optionalish(uriSchema),
  code: optionalish(codingSchema.array()),
  prefix: optionalish(Schema.simple(z.string())),
  text: optionalish(Schema.simple(z.string())),
  type: codeSchema,
  enableWhen: optionalish(questionnaireEnableWhenSchema.array()),
  // TODO: item: optionalish(questionnaireItemSchema.array()),
})

export const questionaireSchema = domainResourceSchema.extend({
  url: optionalish(uriSchema),
  identifier: optionalish(identifierSchema.array()),
  version: optionalish(Schema.simple(z.string())),
  name: optionalish(Schema.simple(z.string())),
  title: optionalish(Schema.simple(z.string())),
  derivedFrom: optionalish(Schema.simple(z.string()).array()),
  status: Schema.simple(z.nativeEnum(PublicationStatus)),
  experimental: optionalish(Schema.simple(z.boolean())),
  subjectType: optionalish(codeSchema.array()),
  date: optionalish(dateTimeSchema),
  publisher: optionalish(Schema.simple(z.string())),
  contact: optionalish(contactDetailSchema.array()),
  description: optionalish(markdownSchema),
  useContext: optionalish(usageContextSchema.array()),
  jurisdiction: optionalish(codeableConceptSchema.array()),
  purpose: optionalish(markdownSchema),
  copyright: optionalish(markdownSchema),
  approvalDate: optionalish(dateTimeSchema),
  lastReviewDate: optionalish(dateTimeSchema),
  effectivePeriod: optionalish(periodSchema),
  code: optionalish(codingSchema.array()),
})
