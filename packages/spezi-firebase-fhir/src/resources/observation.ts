//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { z } from 'zod/v4'
import { codeSchema, timeSchema } from '../primitiveTypes/primitiveTypes.js'
import { identifierForwardSchema } from '../dataTypes/identifier.js'
import { referenceForwardSchema } from '../dataTypes/reference.js'
import { codeableConceptForwardSchema } from '../dataTypes/codeableConcept.js'
import { quantityForwardSchema } from '../dataTypes/quantity.js'
import { backBoneElementForwardSchema } from '../elements/backBoneElement.js'
import { dateTimeSchema } from '../primitiveTypes/dateTime.js'
import { instantSchema } from '../primitiveTypes/instant.js'
import { rangeForwardSchema } from '../dataTypes/range.js'
import { domainResourceForwardSchema } from '../elements/domainResource.js'
import { periodForwardSchema } from '../dataTypes/period.js'
import { sampledDataForwardSchema } from '../dataTypes/sampledData.js'
import { ratioForwardSchema } from '../dataTypes/ratio.js'
import { timingForwardSchema } from '../dataTypes/timing.js'

/*
export enum ObservationStatus {
  registered = 'registered',
  preliminary = 'preliminary',
  final = 'final',
  amended = 'amended',
  corrected = 'corrected',
  cancelled = 'cancelled',
  enteredInError = 'entered-in-error',
  unknown = 'unknown',
}

const observationReferenceRangeForwardSchema =
  backBoneElementForwardSchema.extend({
    get low() {
      return quantityForwardSchema.optional()
    },
    get high() {
      return quantityForwardSchema.optional()
    },
    get type() {
      return codeableConceptForwardSchema.optional()
    },
    get appliesTo() {
      return codeableConceptForwardSchema.array().optional()
    },
    get age() {
      return rangeForwardSchema.optional()
    },
    get text() {
      return z.string().optional()
    },
  })

export const observationComponentForwardSchema =
  backBoneElementForwardSchema.extend({
    get code() {
      return codeableConceptForwardSchema
    },
    get valueQuantity() {
      return quantityForwardSchema.optional()
    },
    get valueCodeableConcept() {
      return codeableConceptForwardSchema.optional()
    },
    get valueString() {
      return z.string().optional()
    },
    get valueBoolean() {
      return z.boolean().optional()
    },
    get valueInteger() {
      return z.number().int().optional()
    },
    get valueRange() {
      return rangeForwardSchema.optional()
    },
    get valueRatio() {
      return ratioForwardSchema.optional()
    },
    get valueSampledData() {
      return sampledDataForwardSchema.optional()
    },
    get valueTime() {
      return timeSchema.forward.optional()
    },
    get valueDateTime() {
      return dateTimeSchema.forward.optional()
    },
    get valuePeriod() {
      return periodForwardSchema.optional()
    },
    get dataAbsentReason() {
      return codeableConceptForwardSchema.optional()
    },
    get interpretation() {
      return codeableConceptForwardSchema.array().optional()
    },
    get referenceRange() {
      return observationReferenceRangeForwardSchema.array().optional()
    },
  })

export const observationForwardSchema = domainResourceForwardSchema.extend({
  get resourceType() {
    return z.literal('Observation')
  },
  get status() {
    return codeSchema.forward
  },
  get identifier() {
    return identifierForwardSchema.array().optional()
  },
  get basedOn() {
    return referenceForwardSchema.array().optional()
  },
  get partOf() {
    return referenceForwardSchema.array().optional()
  },
  get category() {
    return codeableConceptForwardSchema.array().optional()
  },
  get code() {
    return codeableConceptForwardSchema
  },
  get subject() {
    return referenceForwardSchema.optional()
  },
  get focus() {
    return referenceForwardSchema.array().optional()
  },
  get encounter() {
    return referenceForwardSchema.optional()
  },
  get effectiveDateTime() {
    return dateTimeSchema.forward.optional()
  },
  get effectivePeriod() {
    return periodForwardSchema.optional()
  },
  get effectiveTiming() {
    return timingForwardSchema.optional()
  },
  get effectiveInstant() {
    return instantSchema.forward.optional()
  },
  get issued() {
    return instantSchema.forward.optional()
  },
  get performer() {
    return referenceForwardSchema.array().optional()
  },
  get valueQuantity() {
    return quantityForwardSchema.optional()
  },
  get valueCodeableConcept() {
    return codeableConceptForwardSchema.optional()
  },
  get valueString() {
    return z.string().optional()
  },
  get valueBoolean() {
    return z.boolean().optional()
  },
  get valueInteger() {
    return z.number().int().optional()
  },
  get valueRange() {
    return rangeForwardSchema.optional()
  },
  get valueRatio() {
    return ratioForwardSchema.optional()
  },
  get valueSampledData() {
    return sampledDataForwardSchema.optional()
  },
  get valueTime() {
    return timeSchema.forward.optional()
  },
  get valueDateTime() {
    return dateTimeSchema.forward.optional()
  },
  get valuePeriod() {
    return periodForwardSchema.optional()
  },
  get dataAbsentReason() {
    return codeableConceptForwardSchema.optional()
  },
  get interpretation() {
    return codeableConceptForwardSchema.array().optional()
  },
  get note() {
    return referenceForwardSchema.array().optional()
  },
  get bodySite() {
    return codeableConceptForwardSchema.optional()
  },
  get method() {
    return codeableConceptForwardSchema.optional()
  },
  get specimen() {
    return referenceForwardSchema.optional()
  },
  get device() {
    return referenceForwardSchema.optional()
  },
  get referenceRange() {
    return observationReferenceRangeForwardSchema.array().optional()
  },
  get hasMember() {
    return referenceForwardSchema.array().optional()
  },
  get derivedFrom() {
    return referenceForwardSchema.array().optional()
  },
  get component() {
    return observationComponentForwardSchema.array().optional()
  },
})
*/
