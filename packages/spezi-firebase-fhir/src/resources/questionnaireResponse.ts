//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type QuestionnaireResponse,
  type QuestionnaireResponseItem,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codingSchema,
  dateSchema,
  dateTimeSchema,
  decimalSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
  timeSchema,
  uriSchema,
} from '../elements/index.js'

const questionnaireResponseItemSchema: ZodType<QuestionnaireResponseItem> =
  z.lazy(() =>
    backboneElementSchema.extend({
      linkId: stringSchema,
      _linkId: elementSchema.optional(),
      definition: uriSchema.optional(),
      _definition: elementSchema.optional(),
      text: stringSchema.optional(),
      _text: elementSchema.optional(),
      answer: backboneElementSchema
        .extend({
          valueBoolean: booleanSchema.optional(),
          _valueBoolean: elementSchema.optional(),
          valueDecimal: decimalSchema.optional(),
          _valueDecimal: elementSchema.optional(),
          valueInteger: intSchema.optional(),
          _valueInteger: elementSchema.optional(),
          valueDate: dateSchema.optional(),
          _valueDate: elementSchema.optional(),
          valueDateTime: dateTimeSchema.optional(),
          _valueDateTime: elementSchema.optional(),
          valueTime: timeSchema.optional(),
          _valueTime: elementSchema.optional(),
          valueString: stringSchema.optional(),
          _valueString: elementSchema.optional(),
          valueUri: uriSchema.optional(),
          _valueUri: elementSchema.optional(),
          valueAttachment: attachmentSchema.optional(),
          valueCoding: codingSchema.optional(),
          valueQuantity: quantitySchema.optional(),
          valueReference: referenceSchema.optional(),
          get item() {
            return questionnaireResponseItemSchema.array().optional()
          },
        })
        .array()
        .optional(),
      get item() {
        return questionnaireResponseItemSchema.array().optional()
      },
    }),
  )

const questionnaireResponseStatusSchema = z.enum([
  'in-progress',
  'completed',
  'amended',
  'entered-in-error',
])
export type QuestionnaireResponseStatus = z.infer<
  typeof questionnaireResponseStatusSchema
>

export const questionnaireResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('QuestionnaireResponse').readonly(),
    identifier: identifierSchema.optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    questionnaire: uriSchema.optional(),
    _questionnaire: elementSchema.optional(),
    status: questionnaireResponseStatusSchema,
    _status: elementSchema.optional(),
    subject: referenceSchema.optional(),
    encounter: referenceSchema.optional(),
    authored: dateTimeSchema.optional(),
    _authored: elementSchema.optional(),
    author: referenceSchema.optional(),
    source: referenceSchema.optional(),
    item: questionnaireResponseItemSchema.array().optional(),
  }),
) satisfies ZodType<QuestionnaireResponse>
