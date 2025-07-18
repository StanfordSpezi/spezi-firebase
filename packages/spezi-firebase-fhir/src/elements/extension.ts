//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Extension } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod/v4'
import { addressSchema } from './dataTypes/address.js'
import { annotationSchema } from './dataTypes/annotation.js'
import { attachmentSchema } from './dataTypes/attachment.js'
import { codeableConceptSchema } from './dataTypes/codeableConcept.js'
import { codingSchema } from './dataTypes/coding.js'
import { contactPointSchema } from './dataTypes/contactPoint.js'
import { humanNameSchema } from './dataTypes/humanName.js'
import { identifierSchema } from './dataTypes/identifier.js'
import { moneySchema } from './dataTypes/money.js'
import { periodSchema } from './dataTypes/period.js'
import { quantitySchema } from './dataTypes/quantity.js'
import { rangeSchema } from './dataTypes/range.js'
import { ratioSchema } from './dataTypes/ratio.js'
import { ratioRangeSchema } from './dataTypes/ratioRange.js'
import { referenceSchema } from './dataTypes/reference.js'
import { sampledDataSchema } from './dataTypes/sampledData.js'
import { signatureSchema } from './dataTypes/signature.js'
import { timingSchema } from './dataTypes/timing.js'
import { dosageSchema } from './dosage.js'
import { usageContextSchema } from './metaDataTypes/usageContext.js'
import { parameterDefinitionSchema } from './metaDataTypes/parameterDefinition.js'
import { elementSchema } from './element.js'
import { contactDetailSchema } from './metaDataTypes/contactDetail.js'
import { contributorSchema } from './metaDataTypes/contributor.js'
import { dataRequirementSchema } from './metaDataTypes/dataRequirement.js'
import { expressionSchema } from './metaDataTypes/expression.js'
import { relatedArtifactSchema } from './metaDataTypes/relatedArtifact.js'
import { triggerDefinitionSchema } from './metaDataTypes/triggerDefinition.js'
import { dateSchema } from './primitiveTypes/date.js'
import { dateTimeSchema } from './primitiveTypes/dateTime.js'
import { instantSchema } from './primitiveTypes/instant.js'
import {
  codeSchema,
  markdownSchema,
  oidSchema,
  urlSchema,
} from './primitiveTypes/primitiveTypes.js'

export const extensionSchema: ZodType<Extension> = z.object({
  url: urlSchema,
  get _url() {
    return elementSchema.optional()
  },
  valueBase64Binary: z.string().optional(),
  get _valueBase64Binary() {
    return elementSchema.optional()
  },
  valueBoolean: z.boolean().optional(),
  get _valueBoolean() {
    return elementSchema.optional()
  },
  valueCanonical: z.string().optional(),
  get _valueCanonical() {
    return elementSchema.optional()
  },
  valueCodeableConcept: codeableConceptSchema.optional(),
  valueCode: codeSchema.optional(),
  get _valueCode() {
    return elementSchema.optional()
  },
  valueDate: dateSchema.optional(),
  get _valueDate() {
    return elementSchema.optional()
  },
  valueDateTime: dateTimeSchema.optional(),
  get _valueDateTime() {
    return elementSchema.optional()
  },
  valueDecimal: z.number().optional(),
  valueId: z.string().optional(),
  get _valueId() {
    return elementSchema.optional()
  },
  valueInstant: instantSchema.optional(),
  get _valueInstant() {
    return elementSchema.optional()
  },
  valueInteger: z.number().int().optional(),
  valueMarkdown: markdownSchema.optional(),
  get _valueMarkdown() {
    return elementSchema.optional()
  },
  valueOid: oidSchema.optional(),
  get _valueOid() {
    return elementSchema.optional()
  },
  valuePositiveInt: z.number().int().positive().optional(),
  valueString: z.string().optional(),
  get _valueString() {
    return elementSchema.optional()
  },
  valueTime: z.string().optional(),
  get _valueTime() {
    return elementSchema.optional()
  },
  valueUnsignedInt: z.number().int().nonnegative().optional(),
  get _valueUnsignedInt() {
    return elementSchema.optional()
  },
  valueUri: urlSchema.optional(),
  get _valueUri() {
    return elementSchema.optional()
  },
  valueUrl: urlSchema.optional(),
  get _valueUrl() {
    return elementSchema.optional()
  },
  valueUuid: z.string().uuid().optional(),
  get _valueUuid() {
    return elementSchema.optional()
  },
  valueAddress: addressSchema.optional(),
  valueAge: quantitySchema.optional(),
  valueAnnotation: annotationSchema.optional(),
  valueAttachment: attachmentSchema.optional(),
  valueCodeableReference: codeableConceptSchema.optional(),
  valueCoding: codingSchema.optional(),
  valueContactPoint: contactPointSchema.optional(),
  valueCount: quantitySchema.optional(),
  valueDistance: quantitySchema.optional(),
  valueDuration: quantitySchema.optional(),
  valueHumanName: humanNameSchema.optional(),
  valueIdentifier: identifierSchema.optional(),
  valueMoney: moneySchema.optional(),
  valuePeriod: periodSchema.optional(),
  valueQuantity: quantitySchema.optional(),
  valueRange: rangeSchema.optional(),
  valueRatio: ratioSchema.optional(),
  valueRatioRange: ratioRangeSchema.optional(),
  valueReference: referenceSchema.optional(),
  valueSampledData: sampledDataSchema.optional(),
  valueSignature: signatureSchema.optional(),
  valueTiming: timingSchema.optional(),
  valueContactDetail: contactDetailSchema.optional(),
  valueContributor: contributorSchema.optional(),
  valueDataRequirement: dataRequirementSchema.optional(),
  valueExpression: expressionSchema.optional(),
  valueParameterDefinition: parameterDefinitionSchema.optional(),
  valueRelatedArtifact: relatedArtifactSchema.optional(),
  valueTriggerDefinition: triggerDefinitionSchema.optional(),
  valueUsageContext: usageContextSchema.optional(),
  valueDosage: dosageSchema.optional(),
})
