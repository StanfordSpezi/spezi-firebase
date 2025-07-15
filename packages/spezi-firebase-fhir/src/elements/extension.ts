//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodType } from 'zod/v4'
import {
  codeSchema,
  markdownSchema,
  oidSchema,
  urlSchema,
} from './primitiveTypes/primitiveTypes.js'
import { Extension } from 'fhir/r4b.js'
import {
  AssertOutput,
  AssertOutputFull,
} from '@stanfordspezi/spezi-firebase-utils'
import { attachmentSchema } from './dataTypes/attachment.js'
import { codingSchema } from './dataTypes/coding.js'
import { referenceSchema } from './dataTypes/reference.js'
import { quantitySchema } from './dataTypes/quantity.js'
import { codeableConceptSchema } from './dataTypes/codeableConcept.js'
import { dateSchema } from './primitiveTypes/date.js'
import { dateTimeSchema } from './primitiveTypes/dateTime.js'
import { instantSchema } from './primitiveTypes/instant.js'
import { addressSchema } from './dataTypes/address.js'
import { annotationSchema } from './dataTypes/annotation.js'
import { contactPointSchema } from './dataTypes/contactPoint.js'
import { humanNameSchema } from './dataTypes/humanName.js'
import { identifierSchema } from './dataTypes/identifier.js'
import { periodSchema } from './dataTypes/period.js'
import { moneySchema } from './dataTypes/money.js'
import { rangeSchema } from './dataTypes/range.js'
import { ratioSchema } from './dataTypes/ratio.js'
import { ratioRangeSchema } from './dataTypes/ratioRange.js'
import { sampledDataSchema } from './dataTypes/sampledData.js'
import { signatureSchema } from './dataTypes/signature.js'
import { timingSchema } from './dataTypes/timing.js'
import { contactDetailSchema } from './metaDataTypes/contactDetail.js'
import { contributorSchema } from './metaDataTypes/contributor.js'
import { dataRequirementSchema } from './metaDataTypes/dataRequirement.js'
import { expressionSchema } from './metaDataTypes/expression.js'
import { dosageSchema } from './dosage.js'
import { relatedArtifactSchema } from './metaDataTypes/relatedArtifact.js'
import { triggerDefinitionSchema } from './metaDataTypes/triggerDefinition.js'
import { usageContextSchema } from './metaDataTypes/usageContext.js'
import { parameterDefinitionSchema } from './metaDataTypes/parameterDefinition.js'

export const extensionSchema: ZodType<Extension> = z.object({
  url: urlSchema,
  valueBase64Binary: z.string().optional(),
  valueBoolean: z.boolean().optional(),
  valueCanonical: z.string().optional(),
  valueCodeableConcept: codeableConceptSchema.optional(),
  valueCode: codeSchema.optional(),
  valueDate: dateSchema.optional(),
  valueDateTime: dateTimeSchema.optional(),
  valueDecimal: z.number().optional(),
  valueId: z.string().optional(),
  valueInstant: instantSchema.optional(),
  valueInteger: z.number().int().optional(),
  valueMarkdown: markdownSchema.optional(),
  valueOid: oidSchema.optional(),
  valuePositiveInt: z.number().int().positive().optional(),
  valueString: z.string().optional(),
  valueTime: z.string().optional(),
  valueUnsignedInt: z.number().int().nonnegative().optional(),
  valueUri: urlSchema.optional(),
  valueUrl: urlSchema.optional(),
  valueUuid: z.string().uuid().optional(),
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

type _Assert = AssertOutput<typeof extensionSchema, Extension>
type _AssertFull = AssertOutputFull<typeof extensionSchema, Extension>
