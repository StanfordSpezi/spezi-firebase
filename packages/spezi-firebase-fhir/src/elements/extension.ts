//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { urlSchema } from '../primitiveTypes/primitiveTypes.js'
import { optionalish } from '@stanfordspezi/spezi-firebase-utils'
import {
  addressBackwardSchema,
  addressForwardSchema,
} from '../dataTypes/address.js'

export const extensionForwardSchema = z.object({
  url: urlSchema.forward,
  /*
  get valueBase64Binary() {
    return optionalish(base64BinarySchema).forward
  },
  get valueBoolean() {
    return optionalish(Schema.simple(z.boolean())).forward
  },
  get valueCanonical() {
    return optionalish(Schema.simple(z.string())).forward
  },
  get valueCode() {
    return optionalish(codeSchema).forward
  },
  get valueDate() {
    return optionalish(dateSchema).forward
  },
  get valueDateTime() {
    return optionalish(dateTimeSchema).forward
  },
  get valueDecimal() {
    return optionalish(Schema.simple(z.number())).forward
  },
  get valueId() {
    return optionalish(idSchema).forward
  },
  get valueInstant() {
    return optionalish(instantSchema).forward
  },
  get valueInteger() {
    return optionalish(Schema.simple(z.number().int())).forward
  },
  get valueMarkdown() {
    return optionalish(markdownSchema).forward
  },
  get valueOid() {
    return optionalish(oidSchema).forward
  },
  get valuePositiveInt() {
    return optionalish(positiveIntSchema).forward
  },
  get valueString() {
    return optionalish(Schema.simple(z.string())).forward
  },
  get valueTime() {
    return optionalish(timeSchema).forward
  },
  get valueUnsignedInt() {
    return optionalish(unsignedIntSchema).forward
  },
  */
  get valueAddress() {
    return addressForwardSchema.optional()
  },
  /*
  get valueAge() {
    return optionalish(quantitySchema).forward
  },
  get valueUri() {
    return optionalish(uriSchema).forward
  },
  get valueUrl() {
    return optionalish(urlSchema).forward
  },
  get valueAnnotation() {
    return optionalish(annotationSchema).forward
  },
  get valueAttachment() {
    return optionalish(attachmentSchema).forward
  },
  get valueCodeableConcept() {
    return optionalish(codeableConceptSchema).forward
  },
  // valueCodeableReference: optionalish(codeableReferenceSchema),
  get valueCoding() {
    return optionalish(codingSchema).forward
  },
  get valueContactPoint() {
    return optionalish(contactPointSchema).forward
  },
  // valueCount: optionalish(countSchema),
  // valueDistance: optionalish(distanceSchema),
  // valueDuration: optionalish(durationSchema),
  get valueHumanName() {
    return optionalish(humanNameSchema).forward
  },
  get valueIdentifier() {
    return optionalish(identifierSchema).forward
  },
  get valueMoney() {
    return optionalish(moneySchema).forward
  },
  get valuePeriod() {
    return optionalish(periodSchema).forward
  },
  get valueQuantity() {
    return optionalish(quantitySchema).forward
  },
  get valueRange() {
    return optionalish(rangeSchema).forward
  },
  get valueRatio() {
    return optionalish(ratioSchema).forward
  },
  get valueRatioRange() {
    return optionalish(ratioRangeSchema).forward
  },
  get valueReference() {
    return optionalish(referenceSchema).forward
  },
  get valueSampledData() {
    return optionalish(sampledDataSchema).forward
  },
  get valueSignature() {
    return optionalish(signatureSchema).forward
  },
  get valueTiming() {
    return optionalish(timingSchema).forward
  },
  get valueContactDetail() {
    return optionalish(contactDetailSchema).forward
  },
  get valueContributor() {
    return optionalish(contributorSchema).forward
  },
  // valueDataRequirement: optionalish(dataRequirementSchema),
  // valueExpression: optionalish(expressionSchema),
  // valueParameterDefinition: optionalish(parameterDefinitionSchema),
  // valueRelatedArtifact: optionalish(relatedArtifactSchema),
  // valueTriggerDefinition: optionalish(triggerDefinitionSchema),
  get valueUsageContext() {
    return optionalish(usageContextSchema).forward
  },
  get valueDosage() {
    return optionalish(dosageSchema).forward
  },
  */
})

export const extensionBackwardSchema = z.object({
  url: urlSchema.backward,
  /*
  get valueBase64Binary() {
    return base64BinarySchema.optionalish().backward
  },
  get valueBoolean() {
    return optionalish(Schema.simple(z.boolean())).backward
  },
  get valueCanonical() {
    return optionalish(Schema.simple(z.string())).backward
  },
  get valueCode() {
    return optionalish(codeSchema).backward
  },
  get valueDate() {
    return optionalish(dateSchema).backward
  },
  get valueDateTime() {
    return optionalish(dateTimeSchema).backward
  },
  get valueDecimal() {
    return optionalish(Schema.simple(z.number())).backward
  },
  get valueId() {
    return optionalish(idSchema).backward
  },
  get valueInstant() {
    return optionalish(instantSchema).backward
  },
  get valueInteger() {
    return optionalish(Schema.simple(z.number().int())).backward
  },
  get valueMarkdown() {
    return optionalish(markdownSchema).backward
  },
  get valueOid() {
    return optionalish(oidSchema).backward
  },
  get valuePositiveInt() {
    return optionalish(positiveIntSchema).backward
  },
  get valueString() {
    return optionalish(Schema.simple(z.string())).backward
  },
  get valueTime() {
    return optionalish(timeSchema).backward
  },
  get valueUnsignedInt() {
    return optionalish(unsignedIntSchema).backward
  },
  */
  get valueAddress() {
    return addressBackwardSchema.optional()
  },
  /*
  get valueAge() {
    return optionalish(quantitySchema).backward
  },
  get valueUri() {
    return optionalish(uriSchema).backward
  },
  get valueUrl() {
    return optionalish(urlSchema).backward
  },
  get valueAnnotation() {
    return optionalish(annotationSchema).backward
  },
  get valueAttachment() {
    return optionalish(attachmentSchema).backward
  },
  get valueCodeableConcept() {
    return optionalish(codeableConceptSchema).backward
  },
  // valueCodeableReference: optionalish(codeableReferenceSchema),
  get valueCoding() {
    return optionalish(codingSchema).backward
  },
  get valueContactPoint() {
    return optionalish(contactPointSchema).backward
  },
  // valueCount: optionalish(countSchema),
  // valueDistance: optionalish(distanceSchema),
  // valueDuration: optionalish(durationSchema),
  get valueHumanName() {
    return optionalish(humanNameSchema).backward
  },
  get valueIdentifier() {
    return optionalish(identifierSchema).backward
  },
  get valueMoney() {
    return optionalish(moneySchema).backward
  },
  get valuePeriod() {
    return optionalish(periodBackwardSchema)
  },
  get valueQuantity() {
    return optionalish(quantitySchema).backward
  },
  get valueRange() {
    return optionalish(rangeSchema).backward
  },
  get valueRatio() {
    return optionalish(ratioSchema).backward
  },
  get valueRatioRange() {
    return optionalish(ratioRangeSchema).backward
  },
  get valueReference() {
    return optionalish(referenceSchema).backward
  },
  get valueSampledData() {
    return optionalish(sampledDataSchema).backward
  },
  get valueSignature() {
    return optionalish(signatureSchema).backward
  },
  get valueTiming() {
    return optionalish(timingSchema).backward
  },
  get valueContactDetail() {
    return optionalish(contactDetailSchema).backward
  },
  get valueContributor() {
    return optionalish(contributorSchema).backward
  },
  // valueDataRequirement: optionalish(dataRequirementSchema),
  // valueExpression: optionalish(expressionSchema),
  // valueParameterDefinition: optionalish(parameterDefinitionSchema),
  // valueRelatedArtifact: optionalish(relatedArtifactSchema),
  // valueTriggerDefinition: optionalish(triggerDefinitionSchema),
  get valueUsageContext() {
    return optionalish(usageContextSchema).backward
  },
  get valueDosage() {
    return optionalish(dosageSchema).backward
  },
  */
})
