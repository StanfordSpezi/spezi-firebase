//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Questionnaire, type QuestionnaireItem } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { domainResourceSchema } from '../elements/domainResource.js'
import {
  attachmentSchema,
  codeableConceptSchema,
  codingSchema,
  contactDetailSchema,
  dateSchema,
  dateTimeSchema,
  elementSchema,
  identifierSchema,
  markdownSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  timeSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'

const questionnaireStatus = ['draft', 'active', 'retired', 'unknown'] as const
const questionnaireItemType = [
  'group',
  'display',
  'boolean',
  'decimal',
  'integer',
  'date',
  'dateTime',
  'time',
  'string',
  'text',
  'url',
  'choice',
  'open-choice',
  'attachment',
  'reference',
  'quantity',
] as const
const questionnaireItemEnableBehavior = ['all', 'any'] as const
const questionnaireItemEnableWhenOperator = [
  'exists',
  '=',
  '!=',
  '<',
  '<=',
  '>',
  '>=',
] as const

const questionnaireItemSchema: ZodType<QuestionnaireItem> = z.lazy(() =>
  elementSchema.extend({
    linkId: z.string(),
    _linkId: elementSchema.optional(),
    definition: urlSchema.optional(),
    _definition: elementSchema.optional(),
    code: codingSchema.array().optional(),
    prefix: z.string().optional(),
    _prefix: elementSchema.optional(),
    text: z.string().optional(),
    _text: elementSchema.optional(),
    type: z.enum(questionnaireItemType),
    enableWhen: elementSchema
      .extend({
        question: z.string(),
        _question: elementSchema.optional(),
        operator: z.enum(questionnaireItemEnableWhenOperator),
        _operator: elementSchema.optional(),
        answerBoolean: z.boolean().optional(),
        _answerBoolean: elementSchema.optional(),
        answerDecimal: z.number().optional(),
        answerInteger: z.number().int().optional(),
        _answerInteger: elementSchema.optional(),
        answerDate: dateSchema.optional(),
        _answerDate: elementSchema.optional(),
        answerDateTime: dateTimeSchema.optional(),
        _answerDateTime: elementSchema.optional(),
        answerTime: timeSchema.optional(),
        _answerTime: elementSchema.optional(),
        answerString: z.string().optional(),
        _answerString: elementSchema.optional(),
        answerUri: urlSchema.optional(),
        _answerUri: elementSchema.optional(),
        answerAttachment: attachmentSchema.optional(),
        answerCoding: codingSchema.optional(),
        answerQuantity: quantitySchema.optional(),
        answerReference: referenceSchema.optional(),
      })
      .array()
      .optional(),
    enableBehavior: z.enum(questionnaireItemEnableBehavior).optional(),
    required: z.boolean().optional(),
    _required: elementSchema.optional(),
    repeats: z.boolean().optional(),
    _repeats: elementSchema.optional(),
    readOnly: z.boolean().optional(),
    _readOnly: elementSchema.optional(),
    maxLength: z.number().int().optional(),
    _maxLength: elementSchema.optional(),
    answerOption: elementSchema
      .extend({
        valueInteger: z.number().int().optional(),
        valueDecimal: z.number().optional(),
        valueDate: dateSchema.optional(),
        _valueDate: elementSchema.optional(),
        valueDateTime: dateTimeSchema.optional(),
        _valueDateTime: elementSchema.optional(),
        valueTime: timeSchema.optional(),
        _valueTime: elementSchema.optional(),
        valueString: z.string().optional(),
        _valueString: elementSchema.optional(),
        valueUri: urlSchema.optional(),
        _valueUri: elementSchema.optional(),
        valueAttachment: attachmentSchema.optional(),
        valueCoding: codingSchema.optional(),
        valueQuantity: quantitySchema.optional(),
        valueReference: referenceSchema.optional(),
        initialSelected: z.boolean().optional(),
        _initialSelected: elementSchema.optional(),
      })
      .array()
      .optional(),
    initial: elementSchema
      .extend({
        valueBoolean: z.boolean().optional(),
        _valueBoolean: elementSchema.optional(),
        valueDecimal: z.number().optional(),
        valueInteger: z.number().int().optional(),
        valueDate: dateSchema.optional(),
        _valueDate: elementSchema.optional(),
        valueDateTime: dateTimeSchema.optional(),
        _valueDateTime: elementSchema.optional(),
        valueTime: timeSchema.optional(),
        _valueTime: elementSchema.optional(),
        valueString: z.string().optional(),
        _valueString: elementSchema.optional(),
        valueUri: urlSchema.optional(),
        _valueUri: elementSchema.optional(),
        valueAttachment: attachmentSchema.optional(),
        valueCoding: codingSchema.optional(),
        valueQuantity: quantitySchema.optional(),
        valueReference: referenceSchema.optional(),
      })
      .array()
      .optional(),
    get item() {
      return questionnaireItemSchema.array().optional()
    },
  }),
)

export const questionnaireSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Questionnaire').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: z.string().optional(),
    _version: elementSchema.optional(),
    name: z.string().optional(),
    _name: elementSchema.optional(),
    title: z.string().optional(),
    _title: elementSchema.optional(),
    status: z.enum(questionnaireStatus),
    _status: elementSchema.optional(),
    experimental: z.boolean().optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: z.string().optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: z.string().optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: markdownSchema.optional(),
    _purpose: elementSchema.optional(),
    copyright: markdownSchema.optional(),
    _copyright: elementSchema.optional(),
    approvalDate: dateTimeSchema.optional(),
    _approvalDate: elementSchema.optional(),
    lastReviewDate: dateTimeSchema.optional(),
    _lastReviewDate: elementSchema.optional(),
    effectivePeriod: periodSchema.optional(),
    code: codingSchema.array().optional(),
    item: questionnaireItemSchema.array().optional(),
  }),
) satisfies ZodType<Questionnaire>
