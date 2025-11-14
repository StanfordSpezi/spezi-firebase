//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type QuestionnaireResponseItemAnswer,
  type QuestionnaireResponse,
  type QuestionnaireResponseItem,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
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

/**
 * Zod schema for FHIR QuestionnaireResponse resource (untyped version).
 */
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

/**
 * Zod schema for FHIR QuestionnaireResponse resource.
 */
export const questionnaireResponseSchema: ZodType<QuestionnaireResponse> =
  untypedQuestionnaireResponseSchema

/**
 * Wrapper class for FHIR QuestionnaireResponse resources.
 * Provides utility methods for retrieving questionnaire response items.
 */
export class FhirQuestionnaireResponse extends FhirDomainResource<QuestionnaireResponse> {
  // Static Functions

  /**
   * Parses a QuestionnaireResponse resource from unknown data.
   *
   * @param value - The data to parse
   * @returns A FhirQuestionnaireResponse instance
   */
  public static parse(value: unknown): FhirQuestionnaireResponse {
    return new FhirQuestionnaireResponse(
      questionnaireResponseSchema.parse(value),
    )
  }

  // Properties

  /**
   * Gets the authored date/time as a JavaScript Date object.
   *
   * @returns The authored date if available, undefined otherwise
   *
   * @example
   * ```typescript
   * const authoredDate = response.authoredDate
   * if (authoredDate) {
   *   console.log(`Response created on: ${authoredDate.toLocaleDateString()}`)
   * }
   * ```
   */
  public get authoredDate(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.authored)
  }

  // Methods

  /**
   * Retrieves a single response item by its linkId path.
   * Throws an error if multiple items are found.
   *
   * @param linkIdPath - Array of linkId strings forming the path to the item
   * @returns The matching item, or undefined if not found
   * @throws {Error} If multiple items match the path
   *
   * @example
   * ```typescript
   * // Get a nested item by path
   * const item = response.uniqueResponseItem(['section1', 'question1'])
   * ```
   */
  public uniqueResponseItem(
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

  /**
   * Retrieves all response items matching a linkId path.
   * Searches recursively through the item hierarchy.
   *
   * @param linkIdPath - Array of linkId strings forming the path to the items
   * @returns Array of matching response items
   *
   * @example
   * ```typescript
   * // Get all items matching a path
   * const items = response.responseItems(['section1', 'question1'])
   * items.forEach(item => console.log(item.answer))
   * ```
   */
  public responseItems(linkIdPath: string[]): QuestionnaireResponseItem[] {
    const resultValue: QuestionnaireResponseItem[] = []
    for (const child of this.value.item ?? []) {
      resultValue.push(...this.responseItemsRecursive(linkIdPath, child))
    }
    return resultValue
  }

  /**
   * Recursively searches for questionnaire response items matching the given linkId path.
   *
   * @param linkIdPath - The path of linkIds to match
   * @param item - The current item to search within
   * @returns Array of matching questionnaire response items
   */
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

  /**
   * Retrieves a single leaf response item by its linkId.
   * A leaf item is one with no nested items.
   * Throws an error if multiple items are found.
   *
   * @param linkId - The linkId of the leaf item
   * @returns The matching leaf item, or undefined if not found
   * @throws {Error} If multiple leaf items match
   *
   * @example
   * ```typescript
   * const leafItem = response.uniqueLeafResponseItem('question1')
   * if (leafItem?.answer) {
   *   console.log(leafItem.answer[0].valueString)
   * }
   * ```
   */
  public uniqueLeafResponseItem(
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

  /**
   * Retrieves all leaf response items with a specific linkId.
   * A leaf item is one with no nested items.
   * Searches recursively through the entire item hierarchy.
   *
   * @param linkId - The linkId to search for
   * @returns Array of matching leaf response items
   *
   * @example
   * ```typescript
   * // Find all leaf items with a specific linkId
   * const items = response.leafResponseItems('question1')
   * ```
   */
  public leafResponseItems(linkId: string): QuestionnaireResponseItem[] {
    const items: QuestionnaireResponseItem[] = []
    for (const item of this.value.item ?? []) {
      items.push(...this.leafResponseItemsRecursive(linkId, item))
    }
    return items
  }

  /**
   * Recursively searches for leaf questionnaire response items matching the given linkId.
   *
   * @param linkId - The linkId to match
   * @param item - The current item to search within
   * @returns Array of matching leaf questionnaire response items
   */
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
