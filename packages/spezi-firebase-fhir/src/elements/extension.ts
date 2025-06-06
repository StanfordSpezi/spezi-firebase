//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod'
import {
  base64BinarySchema,
  codeSchema,
  dateSchema,
  dateTimeSchema,
  idSchema,
  instantSchema,
  markdownSchema,
  oidSchema,
  positiveIntSchema,
  timeSchema,
  unsignedIntSchema,
  uriSchema,
  urlSchema,
} from '../dataTypes/primitiveTypes.js'
import { optionalish } from '@stanfordspezi/spezi-firebase-utils'

export const extensionSchema = z.object({
  url: z.string(),
  valueBase64Binary: optionalish(base64BinarySchema),
  valueBoolean: optionalish(z.boolean()),
  valueCanonical: optionalish(z.string()),
  valueCode: optionalish(codeSchema),
  valueDate: optionalish(dateSchema),
  valueDateTime: optionalish(dateTimeSchema),
  valueDecimal: optionalish(z.number()),
  valueId: optionalish(idSchema),
  valueInstant: optionalish(instantSchema),
  valueInteger: optionalish(z.number().int()),
  valueMarkdown: optionalish(markdownSchema),
  valueOid: optionalish(oidSchema),
  valuePositiveInt: optionalish(positiveIntSchema),
  valueString: optionalish(z.string()),
  valueTime: optionalish(timeSchema),
  valueUnsignedInt: optionalish(unsignedIntSchema),
  // valueAddress: optionalish(addressSchema),
  // valueAge: optionalish(ageSchema),
  valueUri: optionalish(uriSchema),
  valueUrl: optionalish(urlSchema),
  // valueAnnotation: optionalish(annotationSchema),
  // valueAttachment: optionalish(attachmentSchema),
  // valueCodeableConcept: optionalish(codeableConceptSchema),
  // valueCodeableReference: optionalish(codeableReferenceSchema),
  // valueCoding: optionalish(codingSchema),
  // valueContactPoint: optionalish(contactPointSchema),
  // valueCount: optionalish(countSchema),
  // valueDistance: optionalish(distanceSchema),
  // valueDuration: optionalish(durationSchema),
  // valueHumanName: optionalish(humanNameSchema),
  // valueIdentifier: optionalish(identifierSchema),
  // valueMoney: optionalish(moneySchema),
  // valuePeriod: optionalish(periodSchema),
  // valueQuantity: optionalish(quantitySchema),
  // valueRange: optionalish(rangeSchema),
  // valueRatio: optionalish(ratioSchema),
  // valueRatioRange: optionalish(ratioRangeSchema),
  // valueReference: optionalish(referenceSchema),
  // valueSampledData: optionalish(sampledDataSchema),
  // valueSignature: optionalish(signatureSchema),
  // valueTiming: optionalish(timingSchema),
  // valueContactDetail: optionalish(contactDetailSchema),
  // valueContributor: optionalish(contributorSchema),
  // valueDataRequirement: optionalish(dataRequirementSchema),
  // valueExpression: optionalish(expressionSchema),
  // valueParameterDefinition: optionalish(parameterDefinitionSchema),
  // valueRelatedArtifact: optionalish(relatedArtifactSchema),
  // valueTriggerDefinition: optionalish(triggerDefinitionSchema),
  // valueUsageContext: optionalish(usageContextSchema),
  // valueDosage: optionalish(dosageSchema),
})
