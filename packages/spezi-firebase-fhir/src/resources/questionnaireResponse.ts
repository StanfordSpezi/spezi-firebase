//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  QuestionnaireResponseItemAnswer,
  type QuestionnaireResponse,
  type QuestionnaireResponseItem,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codingSchema,
  dateSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
  timeSchema,
  uriSchema,
} from '../elements/index.js'
import { questionnaireResponseStatusSchema } from '../valueSets/index.js'

const questionnaireResponseItemAnswerSchema: ZodType<QuestionnaireResponseItemAnswer> =
  backboneElementSchema.extend({
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

const questionnaireResponseItemSchema: ZodType<QuestionnaireResponseItem> =
  backboneElementSchema.extend({
    linkId: stringSchema,
    _linkId: elementSchema.optional(),
    definition: uriSchema.optional(),
    _definition: elementSchema.optional(),
    text: stringSchema.optional(),
    _text: elementSchema.optional(),
    answer: questionnaireResponseItemAnswerSchema.array().optional(),
    get item() {
      return questionnaireResponseItemSchema.array().optional()
    },
  })

export const untypedQuestionnaireResponseSchema = z.lazy(() =>
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

export const questionnaireResponseSchema: ZodType<QuestionnaireResponse> =
  untypedQuestionnaireResponseSchema

export class FhirQuestionnaireResponse extends FhirDomainResource<QuestionnaireResponse> {
  // Static Functions

  public static parse(value: unknown): FhirQuestionnaireResponse {
    return new FhirQuestionnaireResponse(
      questionnaireResponseSchema.parse(value),
    )
  }

  // Properties

  public get authoredDate(): Date | undefined {
    return this.value.authored !== undefined ?
        new Date(this.value.authored)
      : undefined
  }

  public set authoredDate(date: Date | undefined) {
    if (date !== undefined) {
      this.value.authored = date.toISOString()
    } else {
      delete this.value.authored
    }
  }

  // Methods

  uniqueResponseItem(
    linkIdPath: string[],
  ): QuestionnaireResponseItem | undefined {
    const items = this.responseItems(linkIdPath)
    switch (items.length) {
      case 0:
        return undefined
      case 1:
        return items[0]
      default:
        throw new Error(`Unexpected number of response items found.`)
    }
  }

  responseItems(linkIdPath: string[]): QuestionnaireResponseItem[] {
    const resultValue: QuestionnaireResponseItem[] = []
    for (const child of this.value.item ?? []) {
      resultValue.push(...this.responseItemsRecursive(linkIdPath, child))
    }
    return resultValue
  }

  private responseItemsRecursive(
    linkIdPath: string[],
    item: QuestionnaireResponseItem,
  ): QuestionnaireResponseItem[] {
    switch (linkIdPath.length) {
      case 0:
        break
      case 1:
        if (item.linkId === linkIdPath[0]) {
          return [item]
        }
        break
      default:
        if (item.linkId === linkIdPath[0]) {
          const childLinkIds = linkIdPath.slice(1)
          const resultValue: QuestionnaireResponseItem[] = []
          for (const child of item.item ?? []) {
            resultValue.push(
              ...this.responseItemsRecursive(childLinkIds, child),
            )
          }
          return resultValue
        }
        break
    }
    return []
  }

  // Methods - Response items from leaf link id

  uniqueLeafResponseItem(
    linkId: string,
  ): QuestionnaireResponseItem | undefined {
    const items = this.leafResponseItems(linkId)
    switch (items.length) {
      case 0:
        return undefined
      case 1:
        return items[0]
      default:
        throw new Error('Unexpected number of leaf response items found.')
    }
  }

  leafResponseItems(linkId: string): QuestionnaireResponseItem[] {
    const items: QuestionnaireResponseItem[] = []
    for (const item of this.value.item ?? []) {
      items.push(...this.leafResponseItemsRecursive(linkId, item))
    }
    return items
  }

  private leafResponseItemsRecursive(
    linkId: string,
    item: QuestionnaireResponseItem,
  ): QuestionnaireResponseItem[] {
    const children = item.item ?? []
    if (children.length === 0 && item.linkId === linkId) {
      return [item]
    }
    const items: QuestionnaireResponseItem[] = []
    for (const child of item.item ?? []) {
      items.push(...this.leafResponseItemsRecursive(linkId, child))
    }
    return items
  }
}
