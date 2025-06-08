//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z, ZodString, ZodType, ZodTypeDef } from 'zod'
import {
  base64BinarySchema,
  codeSchema,
  idSchema,
  markdownSchema,
  oidSchema,
  positiveIntSchema,
  timeSchema,
  unsignedIntSchema,
  uriSchema,
  urlSchema,
} from '../primitiveTypes/primitiveTypes.js'
import {
  Input,
  optionalish,
  Output,
  Schema,
} from '@stanfordspezi/spezi-firebase-utils'
import { addressSchema } from '../dataTypes/address.js'
import { quantitySchema } from '../dataTypes/quantity.js'
import { dosageSchema } from './dosage.js'
import { usageContextSchema } from '../metaDataTypes/usageContext.js'
import { contributorSchema } from '../metaDataTypes/contributor.js'
import { contactDetailSchema } from '../metaDataTypes/contactDetail.js'
import { timingSchema } from '../dataTypes/timing.js'
import { signatureSchema } from '../dataTypes/signature.js'
import { sampledDataSchema } from '../dataTypes/sampledData.js'
import { referenceSchema } from '../dataTypes/reference.js'
import { ratioRangeSchema } from '../dataTypes/ratioRange.js'
import { ratioSchema } from '../dataTypes/ratio.js'
import { rangeSchema } from '../dataTypes/range.js'
import { periodSchema } from '../dataTypes/period.js'
import { moneySchema } from '../dataTypes/money.js'
import { identifierSchema } from '../dataTypes/identifier.js'
import { humanNameSchema } from '../dataTypes/humanName.js'
import { contactPointSchema } from '../dataTypes/contactPoint.js'
import { codingSchema } from '../dataTypes/coding.js'
import { codeableConceptSchema } from '../dataTypes/codeableConcept.js'
import { attachmentSchema } from '../dataTypes/attachment.js'
import { annotationSchema } from '../dataTypes/annotation.js'
import { dateSchema } from '../primitiveTypes/date.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { instantSchema } from '../primitiveTypes/instant.js'

export interface ExtensionInput {
  url: string
  valueBase64Binary?: Input<typeof base64BinarySchema> | null
  valueBoolean?: boolean | null
  valueCanonical?: string | null
  valueCode?: Input<typeof codeSchema> | null
  valueDate?: Input<typeof dateSchema> | null
  valueDateTime?: Input<typeof dateTimeSchema> | null
  valueDecimal?: number | null
  valueId?: Input<typeof idSchema> | null
  valueInstant?: Input<typeof instantSchema> | null
  valueInteger?: number | null
  valueMarkdown?: Input<typeof markdownSchema> | null
  valueOid?: Input<typeof oidSchema> | null
  valuePositiveInt?: Input<typeof positiveIntSchema> | null
  valueString?: string | null
  valueTime?: Input<typeof timeSchema> | null
  valueUnsignedInt?: Input<typeof unsignedIntSchema> | null
  valueAddress?: Input<typeof addressSchema> | null
  valueAge?: Input<typeof quantitySchema> | null
  valueUri?: Input<typeof uriSchema> | null
  valueUrl?: Input<typeof urlSchema> | null
  valueAnnotation?: Input<typeof annotationSchema> | null
  valueAttachment?: Input<typeof attachmentSchema> | null
  valueCodeableConcept?: Input<typeof codeableConceptSchema> | null
  // valueCodeableReference?: Input<typeof codeableReferenceSchema> | null,
  valueCoding?: Input<typeof codingSchema> | null
  valueContactPoint?: Input<typeof contactPointSchema> | null
  // valueCount?: Input<typeof countSchema | null,
  // valueDistance?: Input<typeof distanceSchema | null,
  // valueDuration?: Input<typeof durationSchema | null,
  valueHumanName?: Input<typeof humanNameSchema> | null
  valueIdentifier?: Input<typeof identifierSchema> | null
  valueMoney?: Input<typeof moneySchema> | null
  valuePeriod?: Input<typeof periodSchema> | null
  valueQuantity?: Input<typeof quantitySchema> | null
  valueRange?: Input<typeof rangeSchema> | null
  valueRatio?: Input<typeof ratioSchema> | null
  valueRatioRange?: Input<typeof ratioRangeSchema> | null
  valueReference?: Input<typeof referenceSchema> | null
  valueSampledData?: Input<typeof sampledDataSchema> | null
  valueSignature?: Input<typeof signatureSchema> | null
  valueTiming?: Input<typeof timingSchema> | null
  valueContactDetail?: Input<typeof contactDetailSchema> | null
  valueContributor?: Input<typeof contributorSchema> | null
  // valueDataRequirement?: Input<typeof dataRequirementSchema> | null,
  // valueExpression?: Input<typeof expressionSchema> | null,
  // valueParameterDefinition?: Input<typeof parameterDefinitionSchema> | null,
  // valueRelatedArtifact?: Input<typeof relatedArtifactSchema> | null,
  // valueTriggerDefinition?: Input<typeof triggerDefinitionSchema> | null,
  valueUsageContext?: Input<typeof usageContextSchema> | null
  valueDosage?: Input<typeof dosageSchema> | null
}

export interface ExtensionOutput {
  url: string
  valueBase64Binary?: Output<typeof base64BinarySchema>
  valueBoolean?: boolean
  valueCanonical?: string
  valueCode?: Output<typeof codeSchema>
  valueDate?: Output<typeof dateSchema>
  valueDateTime?: Output<typeof dateTimeSchema>
  valueDecimal?: number
  valueId?: Output<typeof idSchema>
  valueInstant?: Output<typeof instantSchema>
  valueInteger?: number
  valueMarkdown?: Output<typeof markdownSchema>
  valueOid?: Output<typeof oidSchema>
  valuePositiveInt?: Output<typeof positiveIntSchema>
  valueString?: string
  valueTime?: Output<typeof timeSchema>
  valueUnsignedInt?: Output<typeof unsignedIntSchema>
  valueAddress?: Output<typeof addressSchema>
  valueAge?: Output<typeof quantitySchema>
  valueUri?: Output<typeof uriSchema>
  valueUrl?: Output<typeof urlSchema>
  valueAnnotation?: Output<typeof annotationSchema>
  valueAttachment?: Output<typeof attachmentSchema>
  valueCodeableConcept?: Output<typeof codeableConceptSchema>
  // valueCodeableReference?: Output<typeof codeableReferenceSchema>
  valueCoding?: Output<typeof codingSchema>
  valueContactPoint?: Output<typeof contactPointSchema>
  // valueCount?: Output<typeof countSchema
  // valueDistance?: Output<typeof distanceSchema
  // valueDuration?: Output<typeof durationSchema
  valueHumanName?: Output<typeof humanNameSchema>
  valueIdentifier?: Output<typeof identifierSchema>
  valueMoney?: Output<typeof moneySchema>
  valuePeriod?: Output<typeof periodSchema>
  valueQuantity?: Output<typeof quantitySchema>
  valueRange?: Output<typeof rangeSchema>
  valueRatio?: Output<typeof ratioSchema>
  valueRatioRange?: Output<typeof ratioRangeSchema>
  valueReference?: Output<typeof referenceSchema>
  valueSampledData?: Output<typeof sampledDataSchema>
  valueSignature?: Output<typeof signatureSchema>
  valueTiming?: Output<typeof timingSchema>
  valueContactDetail?: Output<typeof contactDetailSchema>
  valueContributor?: Output<typeof contributorSchema>
  // valueDataRequirement?: Output<typeof dataRequirementSchema>
  // valueExpression?: Output<typeof expressionSchema>
  // valueParameterDefinition?: Output<typeof parameterDefinitionSchema>
  // valueRelatedArtifact?: Output<typeof relatedArtifactSchema>
  // valueTriggerDefinition?: Output<typeof triggerDefinitionSchema>
  valueUsageContext?: Output<typeof usageContextSchema>
  valueDosage?: Output<typeof dosageSchema>
}

export const extensionSchema: Schema<
  ZodType<ExtensionOutput, ZodTypeDef, ExtensionInput>,
  ZodType<ExtensionInput, ZodTypeDef, ExtensionOutput>
> = Schema.composed({
  url: urlSchema,
  get valueBase64Binary() {
    return base64BinarySchema.optionalish()
  },
  get valueBoolean() {
    return optionalish(Schema.simple(z.boolean()))
  },
  get valueCanonical() {
    return optionalish(Schema.simple(z.string()))
  },
  get valueCode() {
    return optionalish(codeSchema)
  },
  get valueDate() {
    return optionalish(dateSchema)
  },
  get valueDateTime() {
    return optionalish(dateTimeSchema)
  },
  get valueDecimal() {
    return optionalish(Schema.simple(z.number()))
  },
  get valueId() {
    return optionalish(idSchema)
  },

  get valueInstant() {
    return optionalish(instantSchema)
  },
  get valueInteger() {
    return optionalish(Schema.simple(z.number().int()))
  },
  get valueMarkdown() {
    return optionalish(markdownSchema)
  },
  get valueOid() {
    return optionalish(oidSchema)
  },
  get valuePositiveInt() {
    return optionalish(positiveIntSchema)
  },
  get valueString() {
    return optionalish(Schema.simple(z.string()))
  },
  get valueTime() {
    return optionalish(timeSchema)
  },
  get valueUnsignedInt() {
    return optionalish(unsignedIntSchema)
  },
  get valueAddress() {
    return optionalish(addressSchema)
  },
  get valueAge() {
    return optionalish(quantitySchema)
  },

  get valueUri() {
    return optionalish(uriSchema)
  },
  get valueUrl() {
    return optionalish(urlSchema)
  },
  get valueAnnotation() {
    return optionalish(annotationSchema)
  },
  get valueAttachment() {
    return optionalish(attachmentSchema)
  },
  get valueCodeableConcept() {
    return optionalish(codeableConceptSchema)
  },
  // valueCodeableReference: optionalish(codeableReferenceSchema),
  get valueCoding() {
    return optionalish(codingSchema)
  },
  get valueContactPoint() {
    return optionalish(contactPointSchema)
  },
  // valueCount: optionalish(countSchema),
  // valueDistance: optionalish(distanceSchema),
  // valueDuration: optionalish(durationSchema),
  get valueHumanName() {
    return optionalish(humanNameSchema)
  },
  get valueIdentifier() {
    return optionalish(identifierSchema)
  },
  get valueMoney() {
    return optionalish(moneySchema)
  },
  get valuePeriod() {
    return optionalish(periodSchema)
  },
  get valueQuantity() {
    return optionalish(quantitySchema)
  },
  get valueRange() {
    return optionalish(rangeSchema)
  },
  get valueRatio() {
    return optionalish(ratioSchema)
  },
  get valueRatioRange() {
    return optionalish(ratioRangeSchema)
  },
  get valueReference() {
    return optionalish(referenceSchema)
  },
  get valueSampledData() {
    return optionalish(sampledDataSchema)
  },
  get valueSignature() {
    return optionalish(signatureSchema)
  },
  get valueTiming() {
    return optionalish(timingSchema)
  },
  get valueContactDetail() {
    return optionalish(contactDetailSchema)
  },
  get valueContributor() {
    return optionalish(contributorSchema)
  },
  // valueDataRequirement: optionalish(dataRequirementSchema),
  // valueExpression: optionalish(expressionSchema),
  // valueParameterDefinition: optionalish(parameterDefinitionSchema),
  // valueRelatedArtifact: optionalish(relatedArtifactSchema),
  // valueTriggerDefinition: optionalish(triggerDefinitionSchema),
  get valueUsageContext() {
    return optionalish(usageContextSchema)
  },
  get valueDosage() {
    return optionalish(dosageSchema)
  },
})
