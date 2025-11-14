//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  type QuestionnaireItemAnswerOption,
  type QuestionnaireItemEnableWhen,
  type QuestionnaireItemInitial,
  type Questionnaire,
  type QuestionnaireItem,
  type Coding,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './fhirDomainResource.js'
import {
  attachmentSchema,
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  contactDetailSchema,
  dateSchema,
  dateTimeSchema,
  decimalSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  markdownSchema,
  periodSchema,
  quantitySchema,
  referenceSchema,
  stringSchema,
  timeSchema,
  urlSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  questionnaireItemEnableBehaviorSchema,
  questionnaireItemEnableWhenOperatorSchema,
  questionnaireItemTypeSchema,
  questionnaireStatusSchema,
} from '../valueSets/index.js'

const questionnaireItemEnableWhenSchema: ZodType<QuestionnaireItemEnableWhen> =
  backboneElementSchema.extend({
    question: stringSchema,
    _question: elementSchema.optional(),
    operator: questionnaireItemEnableWhenOperatorSchema,
    _operator: elementSchema.optional(),
    answerBoolean: booleanSchema.optional(),
    _answerBoolean: elementSchema.optional(),
    answerDecimal: decimalSchema.optional(),
    answerInteger: intSchema.optional(),
    _answerInteger: elementSchema.optional(),
    answerDate: dateSchema.optional(),
    _answerDate: elementSchema.optional(),
    answerDateTime: dateTimeSchema.optional(),
    _answerDateTime: elementSchema.optional(),
    answerTime: timeSchema.optional(),
    _answerTime: elementSchema.optional(),
    answerString: stringSchema.optional(),
    _answerString: elementSchema.optional(),
    answerUri: urlSchema.optional(),
    _answerUri: elementSchema.optional(),
    answerAttachment: attachmentSchema.optional(),
    answerCoding: codingSchema.optional(),
    answerQuantity: quantitySchema.optional(),
    answerReference: referenceSchema.optional(),
  })

const questionnaireItemAnswerOptionSchema: ZodType<QuestionnaireItemAnswerOption> =
  backboneElementSchema.extend({
    valueInteger: intSchema.optional(),
    valueDecimal: decimalSchema.optional(),
    valueDate: dateSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueDateTime: dateTimeSchema.optional(),
    _valueDateTime: elementSchema.optional(),
    valueTime: timeSchema.optional(),
    _valueTime: elementSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueUri: urlSchema.optional(),
    _valueUri: elementSchema.optional(),
    valueAttachment: attachmentSchema.optional(),
    valueCoding: codingSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueReference: referenceSchema.optional(),
    initialSelected: booleanSchema.optional(),
    _initialSelected: elementSchema.optional(),
  })

const questionnaireItemInitialSchema: ZodType<QuestionnaireItemInitial> =
  backboneElementSchema.extend({
    valueBoolean: booleanSchema.optional(),
    _valueBoolean: elementSchema.optional(),
    valueDecimal: decimalSchema.optional(),
    valueInteger: intSchema.optional(),
    valueDate: dateSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueDateTime: dateTimeSchema.optional(),
    _valueDateTime: elementSchema.optional(),
    valueTime: timeSchema.optional(),
    _valueTime: elementSchema.optional(),
    valueString: stringSchema.optional(),
    _valueString: elementSchema.optional(),
    valueUri: urlSchema.optional(),
    _valueUri: elementSchema.optional(),
    valueAttachment: attachmentSchema.optional(),
    valueCoding: codingSchema.optional(),
    valueQuantity: quantitySchema.optional(),
    valueReference: referenceSchema.optional(),
  })

const questionnaireItemSchema: ZodType<QuestionnaireItem> =
  backboneElementSchema.extend({
    linkId: stringSchema,
    _linkId: elementSchema.optional(),
    definition: urlSchema.optional(),
    _definition: elementSchema.optional(),
    code: codingSchema.array().optional(),
    prefix: stringSchema.optional(),
    _prefix: elementSchema.optional(),
    text: stringSchema.optional(),
    _text: elementSchema.optional(),
    type: questionnaireItemTypeSchema,
    enableWhen: questionnaireItemEnableWhenSchema.array().optional(),
    enableBehavior: questionnaireItemEnableBehaviorSchema.optional(),
    required: booleanSchema.optional(),
    _required: elementSchema.optional(),
    repeats: booleanSchema.optional(),
    _repeats: elementSchema.optional(),
    readOnly: booleanSchema.optional(),
    _readOnly: elementSchema.optional(),
    maxLength: intSchema.optional(),
    _maxLength: elementSchema.optional(),
    answerOption: questionnaireItemAnswerOptionSchema.array().optional(),
    initial: questionnaireItemInitialSchema.array().optional(),
    get item() {
      return questionnaireItemSchema.array().optional()
    },
  })

/**
 * Zod schema for FHIR Questionnaire resource (untyped version).
 */
export const untypedQuestionnaireSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Questionnaire').readonly(),
    url: urlSchema.optional(),
    _url: elementSchema.optional(),
    identifier: identifierSchema.array().optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema.optional(),
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: questionnaireStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    subjectType: stringSchema.array().optional(),
    _subjectType: elementSchema.array().optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: stringSchema.optional(),
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

/**
 * Zod schema for FHIR Questionnaire resource.
 */
export const questionnaireSchema: ZodType<Questionnaire> =
  untypedQuestionnaireSchema

/**
 * Wrapper class for FHIR Questionnaire resources.
 * Provides utility methods for working with questionnaires and structured data capture forms.
 */
export class FhirQuestionnaire extends FhirDomainResource<Questionnaire> {
  /**
   * Parses a Questionnaire resource from unknown data.
   *
   * @param value - The data to parse and validate against the Questionnaire schema
   * @returns A FhirQuestionnaire instance containing the validated resource
   */
  public static parse(value: unknown): FhirQuestionnaire {
    return new FhirQuestionnaire(questionnaireSchema.parse(value))
  }

  /**
   * Get the publication date of the questionnaire.
   *
   * @returns The publication date, or undefined if not set
   */
  public get date(): Date | undefined {
    return FhirDomainResource.parseDateTime(this.value.date)
  }

  /**
   * Gets all identifier values whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns Array of identifier values matching any provided system
   */
  public identifiersBySystem(...system: string[]): string[] {
    return FhirDomainResource.identifiersBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets the first identifier value whose system matches any of the provided system URLs.
   *
   * @param system - One or more identifier system URLs to match
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierBySystem(...system: string[]): string | undefined {
    return FhirDomainResource.identifierBySystem(
      this.value.identifier,
      ...system,
    )
  }

  /**
   * Gets all identifier values whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns Array of identifier values matching any provided type
   */
  public identifiersByType(...type: Coding[]): string[] {
    return FhirDomainResource.identifiersByType(this.value.identifier, ...type)
  }

  /**
   * Gets the first identifier value whose type matches any of the provided Coding filters.
   *
   * @param type - One or more Coding filters to match against Identifier.type
   * @returns The first matching identifier value, or undefined if none match
   */
  public identifierByType(...type: Coding[]): string | undefined {
    return FhirDomainResource.identifierByType(this.value.identifier, ...type)
  }
}
