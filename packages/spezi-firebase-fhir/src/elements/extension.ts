//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
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
  addressBackwardSchema,
  addressForwardSchema,
} from '../dataTypes/address.js'
import { dateSchema } from '../primitiveTypes/date.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { instantSchema } from '../primitiveTypes/instant.js'
import {
  quantityBackwardSchema,
  quantityForwardSchema,
} from '../dataTypes/quantity.js'
import {
  annotationBackwardSchema,
  annotationForwardSchema,
} from '../dataTypes/annotation.js'
import {
  attachmentBackwardSchema,
  attachmentForwardSchema,
} from '../dataTypes/attachment.js'
import {
  codeableConceptBackwardSchema,
  codeableConceptForwardSchema,
} from '../dataTypes/codeableConcept.js'
import {
  codingBackwardSchema,
  codingForwardSchema,
} from '../dataTypes/coding.js'
import {
  contactPointBackwardSchema,
  contactPointForwardSchema,
} from '../dataTypes/contactPoint.js'
import {
  humanNameBackwardSchema,
  humanNameForwardSchema,
} from '../dataTypes/humanName.js'
import {
  identifierBackwardSchema,
  identifierForwardSchema,
} from '../dataTypes/identifier.js'
import { moneyBackwardSchema, moneyForwardSchema } from '../dataTypes/money.js'
import {
  periodBackwardSchema,
  periodForwardSchema,
} from '../dataTypes/period.js'
import { rangeBackwardSchema, rangeForwardSchema } from '../dataTypes/range.js'
import { ratioBackwardSchema, ratioForwardSchema } from '../dataTypes/ratio.js'
import {
  ratioRangeBackwardSchema,
  ratioRangeForwardSchema,
} from '../dataTypes/ratioRange.js'
import {
  referenceBackwardSchema,
  referenceForwardSchema,
} from '../dataTypes/reference.js'
import {
  sampledDataBackwardSchema,
  sampledDataForwardSchema,
} from '../dataTypes/sampledData.js'
import {
  timingBackwardSchema,
  timingForwardSchema,
} from '../dataTypes/timing.js'
import {
  signatureBackwardSchema,
  signatureForwardSchema,
} from '../dataTypes/signature.js'
import {
  contactDetailBackwardSchema,
  contactDetailForwardSchema,
} from '../metaDataTypes/contactDetail.js'
import {
  contributorBackwardSchema,
  contributorForwardSchema,
} from '../metaDataTypes/contributor.js'
import { dosageBackwardSchema, dosageForwardSchema } from './dosage.js'
import {
  usageContextBackwardSchema,
  usageContextForwardSchema,
} from '../metaDataTypes/usageContext.js'

export const extensionForwardSchema = z.object({
  url: urlSchema.forward,
  get valueBase64Binary() {
    return base64BinarySchema.forward.optional()
  },
  get valueBoolean() {
    return z.boolean().optional()
  },
  get valueCanonical() {
    return z.string().optional()
  },
  get valueCode() {
    return codeSchema.forward.optional()
  },
  get valueDate() {
    return dateSchema.forward.optional()
  },
  get valueDateTime() {
    return dateTimeSchema.forward.optional()
  },
  get valueDecimal() {
    return z.number().optional()
  },
  get valueId() {
    return idSchema.forward.optional()
  },
  get valueInstant() {
    return instantSchema.forward.optional()
  },
  get valueInteger() {
    return z.number().int().optional()
  },
  get valueMarkdown() {
    return markdownSchema.forward.optional()
  },
  get valueOid() {
    return oidSchema.forward.optional()
  },
  get valuePositiveInt() {
    return positiveIntSchema.forward.optional()
  },
  get valueString() {
    return z.string().optional()
  },
  get valueTime() {
    return timeSchema.forward.optional()
  },
  get valueUnsignedInt() {
    return unsignedIntSchema.forward.optional()
  },
  get valueAddress() {
    return addressForwardSchema.optional()
  },
  get valueAge() {
    return quantityForwardSchema.optional()
  },
  get valueUri() {
    return uriSchema.forward.optional()
  },
  get valueUrl() {
    return urlSchema.forward.optional()
  },
  get valueAnnotation() {
    return annotationForwardSchema.optional()
  },
  get valueAttachment() {
    return attachmentForwardSchema.optional()
  },
  get valueCodeableConcept() {
    return codeableConceptForwardSchema.optional()
  },
  // valueCodeableReference: optionalish(codeableReferenceSchema),
  get valueCoding() {
    return codingForwardSchema.optional()
  },
  get valueContactPoint() {
    return contactPointForwardSchema.optional()
  },
  // valueCount: optionalish(countSchema),
  // valueDistance: optionalish(distanceSchema),
  // valueDuration: optionalish(durationSchema),
  get valueHumanName() {
    return humanNameForwardSchema.optional()
  },
  get valueIdentifier() {
    return identifierForwardSchema.optional()
  },
  get valueMoney() {
    return moneyForwardSchema.optional()
  },
  get valuePeriod() {
    return periodForwardSchema.optional()
  },
  get valueQuantity() {
    return quantityForwardSchema.optional()
  },
  get valueRange() {
    return rangeForwardSchema.optional()
  },
  get valueRatio() {
    return ratioForwardSchema.optional()
  },
  get valueRatioRange() {
    return ratioRangeForwardSchema.optional()
  },
  get valueReference() {
    return referenceForwardSchema.optional()
  },
  get valueSampledData() {
    return sampledDataForwardSchema.optional()
  },
  get valueSignature() {
    return signatureForwardSchema.optional()
  },
  get valueTiming() {
    return timingForwardSchema.optional()
  },
  get valueContactDetail() {
    return contactDetailForwardSchema.optional()
  },
  get valueContributor() {
    return contributorForwardSchema.optional()
  },
  // valueDataRequirement: optionalish(dataRequirementSchema),
  // valueExpression: optionalish(expressionSchema),
  // valueParameterDefinition: optionalish(parameterDefinitionSchema),
  // valueRelatedArtifact: optionalish(relatedArtifactSchema),
  // valueTriggerDefinition: optionalish(triggerDefinitionSchema),
  get valueUsageContext() {
    return usageContextForwardSchema.optional()
  },
  get valueDosage() {
    return dosageForwardSchema.optional()
  },
})

export const extensionBackwardSchema = z.object({
  url: urlSchema.backward,
  get valueBase64Binary() {
    return base64BinarySchema.backward.optional()
  },
  get valueBoolean() {
    return z.boolean().optional()
  },
  get valueCanonical() {
    return z.string().optional()
  },
  get valueCode() {
    return codeSchema.backward.optional()
  },
  get valueDate() {
    return dateSchema.backward.optional()
  },
  get valueDateTime() {
    return dateTimeSchema.backward.optional()
  },
  get valueDecimal() {
    return z.number().optional()
  },
  get valueId() {
    return idSchema.backward.optional()
  },
  get valueInstant() {
    return instantSchema.backward.optional()
  },
  get valueInteger() {
    return z.number().int().optional()
  },
  get valueMarkdown() {
    return markdownSchema.backward.optional()
  },
  get valueOid() {
    return oidSchema.backward.optional()
  },
  get valuePositiveInt() {
    return positiveIntSchema.backward.optional()
  },
  get valueString() {
    return z.string().optional()
  },
  get valueTime() {
    return timeSchema.backward.optional()
  },
  get valueUnsignedInt() {
    return unsignedIntSchema.backward.optional()
  },
  get valueAddress() {
    return addressBackwardSchema.optional()
  },
  get valueAge() {
    return quantityBackwardSchema.optional()
  },
  get valueUri() {
    return uriSchema.backward.optional()
  },
  get valueUrl() {
    return urlSchema.backward.optional()
  },
  get valueAnnotation() {
    return annotationBackwardSchema.optional()
  },
  get valueAttachment() {
    return attachmentBackwardSchema.optional()
  },
  get valueCodeableConcept() {
    return codeableConceptBackwardSchema.optional()
  },
  // valueCodeableReference: optionalish(codeableReferenceSchema),
  get valueCoding() {
    return codingBackwardSchema.optional()
  },
  get valueContactPoint() {
    return contactPointBackwardSchema.optional()
  },
  // valueCount: optionalish(countSchema),
  // valueDistance: optionalish(distanceSchema),
  // valueDuration: optionalish(durationSchema),
  get valueHumanName() {
    return humanNameBackwardSchema.optional()
  },
  get valueIdentifier() {
    return identifierBackwardSchema.optional()
  },
  get valueMoney() {
    return moneyBackwardSchema.optional()
  },
  get valuePeriod() {
    return periodBackwardSchema.optional()
  },
  get valueQuantity() {
    return quantityBackwardSchema.optional()
  },
  get valueRange() {
    return rangeBackwardSchema.optional()
  },
  get valueRatio() {
    return ratioBackwardSchema.optional()
  },
  get valueRatioRange() {
    return ratioRangeBackwardSchema.optional()
  },
  get valueReference() {
    return referenceBackwardSchema.optional()
  },
  get valueSampledData() {
    return sampledDataBackwardSchema.optional()
  },
  get valueSignature() {
    return signatureBackwardSchema.optional()
  },
  get valueTiming() {
    return timingBackwardSchema.optional()
  },
  get valueContactDetail() {
    return contactDetailBackwardSchema.optional()
  },
  get valueContributor() {
    return contributorBackwardSchema.optional()
  },
  // valueDataRequirement: optionalish(dataRequirementSchema),
  // valueExpression: optionalish(expressionSchema),
  // valueParameterDefinition: optionalish(parameterDefinitionSchema),
  // valueRelatedArtifact: optionalish(relatedArtifactSchema),
  // valueTriggerDefinition: optionalish(triggerDefinitionSchema),
  get valueUsageContext() {
    return usageContextBackwardSchema.optional()
  },
  get valueDosage() {
    return dosageBackwardSchema.optional()
  },
})
