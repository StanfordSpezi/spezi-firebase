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
  codingSchema,
  dateTimeSchema,
  elementSchema,
  identifierSchema,
  quantitySchema,
  referenceSchema,
  uriSchema,
} from '../elements/index.js'

const questionnaireResponseItemSchema: ZodType<QuestionnaireResponseItem> =
  z.lazy(() =>
    backboneElementSchema.extend({
      linkId: z.string(),
      _linkId: elementSchema.optional(),
      definition: uriSchema.optional(),
      _definition: elementSchema.optional(),
      text: z.string().optional(),
      _text: elementSchema.optional(),
      answer: backboneElementSchema
        .extend({
          valueBoolean: z.boolean().optional(),
          _valueBoolean: elementSchema.optional(),
          valueDecimal: z.number().optional(),
          _valueDecimal: elementSchema.optional(),
          valueInteger: z.number().int().optional(),
          _valueInteger: elementSchema.optional(),
          valueDate: z.string().optional(),
          _valueDate: elementSchema.optional(),
          valueDateTime: z.string().optional(),
          _valueDateTime: elementSchema.optional(),
          valueTime: z.string().optional(),
          _valueTime: elementSchema.optional(),
          valueString: z.string().optional(),
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

export const questionnaireResponseSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('QuestionnaireResponse').readonly(),
    identifier: identifierSchema.optional(),
    basedOn: referenceSchema.array().optional(),
    partOf: referenceSchema.array().optional(),
    questionnaire: uriSchema.optional(),
    _questionnaire: elementSchema.optional(),
    status: z.enum(['in-progress', 'completed', 'amended', 'entered-in-error']),
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
