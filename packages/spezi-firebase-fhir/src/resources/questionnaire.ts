//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  codeSchema,
  markdownSchema,
  timeSchema,
  uriSchema,
} from '../primitiveTypes/primitiveTypes.js'
import { identifierForwardSchema } from '../dataTypes/identifier.js'
import { z } from 'zod/v4'
import { backBoneElementForwardSchema } from '../elements/backBoneElement.js'
import { dateSchema } from '../primitiveTypes/date.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { referenceForwardSchema } from '../dataTypes/reference.js'
import { codingForwardSchema } from '../dataTypes/coding.js'
import { quantityForwardSchema } from '../dataTypes/quantity.js'
import { domainResourceForwardSchema } from '../elements/domainResource.js'
import { contactDetailForwardSchema } from '../metaDataTypes/contactDetail.js'
import { usageContextForwardSchema } from '../metaDataTypes/usageContext.js'
import { periodForwardSchema } from '../dataTypes/period.js'

export enum PublicationStatus {
  draft = 'draft',
  active = 'active',
  final = 'final',
  retired = 'retired',
  unknown = 'unknown',
}

export const questionnaireEnableWhenForwardSchema =
  backBoneElementForwardSchema.extend({
    get question() {
      return z.string()
    },
    get operator() {
      return codeSchema.forward
    },
    get answerBoolean() {
      return z.boolean().optional()
    },
    get answerDecimal() {
      return z.number().optional()
    },
    get answerInteger() {
      return z.number().int().optional()
    },
    get answerDate() {
      return dateSchema.forward.optional()
    },
    get answerDateTime() {
      return dateTimeSchema.forward.optional()
    },
    get answerTime() {
      return timeSchema.forward.optional()
    },
    get answerString() {
      return z.string().optional()
    },
    get answerCoding() {
      return codingForwardSchema.optional()
    },
    get answerQuantity() {
      return quantityForwardSchema.optional()
    },
    get answerReference() {
      return referenceForwardSchema.optional()
    },
  })

/*
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
    */

export const questionaireSchema = domainResourceForwardSchema.extend({
  get resourceType() {
    return z.literal('Questionnaire')
  },
  get url() {
    return uriSchema.forward.optional()
  },
  get identifier() {
    return identifierForwardSchema.array().optional()
  },
  get version() {
    return z.string().optional()
  },
  get name() {
    return z.string().optional()
  },
  get title() {
    return z.string().optional()
  },
  get derivedFrom() {
    return z.string().array().optional()
  },
  get status() {
    return z.nativeEnum(PublicationStatus)
  },
  get experimental() {
    return z.boolean().optional()
  },
  get subjectType() {
    return codeSchema.forward.array().optional()
  },
  get date() {
    return dateTimeSchema.forward.optional()
  },
  get publisher() {
    return z.string().optional()
  },
  get contact() {
    return contactDetailForwardSchema.array().optional()
  },
  get description() {
    return markdownSchema.forward.optional()
  },
  get useContext() {
    return usageContextForwardSchema.optional()
  },
  get jurisdiction() {
    return codeSchema.forward.array().optional()
  },
  get purpose() {
    return markdownSchema.forward.optional()
  },
  get copyright() {
    return markdownSchema.forward.optional()
  },
  get approvalDate() {
    return dateTimeSchema.forward.optional()
  },
  get lastReviewDate() {
    return dateTimeSchema.forward.optional()
  },
  get effectivePeriod() {
    return periodForwardSchema.optional()
  },
  get code() {
    return codingForwardSchema.optional()
  },
})
