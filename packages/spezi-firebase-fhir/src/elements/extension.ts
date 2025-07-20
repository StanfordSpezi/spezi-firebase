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
import { elementSchema } from './element.js'
import { contactDetailSchema } from './metaDataTypes/contactDetail.js'
import { contributorSchema } from './metaDataTypes/contributor.js'
import { dataRequirementSchema } from './metaDataTypes/dataRequirement.js'
import { expressionSchema } from './metaDataTypes/expression.js'
import { parameterDefinitionSchema } from './metaDataTypes/parameterDefinition.js'
import { relatedArtifactSchema } from './metaDataTypes/relatedArtifact.js'
import { triggerDefinitionSchema } from './metaDataTypes/triggerDefinition.js'
import { usageContextSchema } from './metaDataTypes/usageContext.js'
import { dateSchema } from './primitiveTypes/date.js'
import { dateTimeSchema } from './primitiveTypes/dateTime.js'
import { instantSchema } from './primitiveTypes/instant.js'
import {
  codeSchema,
  markdownSchema,
  oidSchema,
  urlSchema,
} from './primitiveTypes/primitiveTypes.js'

export const extensionSchema: ZodType<Extension> = z.lazy(() =>
  elementSchema.extend({
    url: urlSchema,
    _url: elementSchema.optional(),
    valueBase64Binary: z.string().optional(),
    _valueBase64Binary: elementSchema.optional(),
    valueBoolean: z.boolean().optional(),
    _valueBoolean: elementSchema.optional(),
    valueCanonical: z.string().optional(),
    _valueCanonical: elementSchema.optional(),
    valueCodeableConcept: codeableConceptSchema.optional(),
    valueCode: codeSchema.optional(),
    _valueCode: elementSchema.optional(),
    valueDate: dateSchema.optional(),
    _valueDate: elementSchema.optional(),
    valueDateTime: dateTimeSchema.optional(),
    _valueDateTime: elementSchema.optional(),
    valueDecimal: z.number().optional(),
    valueId: z.string().optional(),
    _valueId: elementSchema.optional(),
    valueInstant: instantSchema.optional(),
    _valueInstant: elementSchema.optional(),
    valueInteger: z.number().int().optional(),
    valueMarkdown: markdownSchema.optional(),
    _valueMarkdown: elementSchema.optional(),
    valueOid: oidSchema.optional(),
    _valueOid: elementSchema.optional(),
    valuePositiveInt: z.number().int().positive().optional(),
    valueString: z.string().optional(),
    _valueString: elementSchema.optional(),
    valueTime: z.string().optional(),
    _valueTime: elementSchema.optional(),
    valueUnsignedInt: z.number().int().nonnegative().optional(),
    valueUri: urlSchema.optional(),
    _valueUri: elementSchema.optional(),
    valueUrl: urlSchema.optional(),
    _valueUrl: elementSchema.optional(),
    valueUuid: z.string().uuid().optional(),
    _valueUuid: elementSchema.optional(),
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
  }),
)
