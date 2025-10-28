//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type DeviceUseStatement } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  annotationSchema,
  codeableConceptSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  periodSchema,
  referenceSchema,
  timingSchema,
} from '../elements/index.js'
import { deviceUseStatementStatusSchema } from '../valueSets/index.js'

export const untypedDeviceUseStatementSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('DeviceUseStatement').readonly(),
    identifier: identifierSchema.array().optional(),
    basedOn: referenceSchema.array().optional(),
    status: deviceUseStatementStatusSchema,
    _status: elementSchema.optional(),
    subject: referenceSchema,
    derivedFrom: referenceSchema.array().optional(),
    timingTiming: timingSchema.optional(),
    timingPeriod: periodSchema.optional(),
    timingDateTime: dateTimeSchema.optional(),
    _timingDateTime: elementSchema.optional(),
    recordedOn: dateTimeSchema.optional(),
    _recordedOn: elementSchema.optional(),
    source: referenceSchema.optional(),
    device: referenceSchema,
    reasonCode: codeableConceptSchema.array().optional(),
    reasonReference: referenceSchema.array().optional(),
    bodySite: codeableConceptSchema.optional(),
    note: annotationSchema.array().optional(),
  }),
) satisfies ZodType<DeviceUseStatement>

export const deviceUseStatementSchema: ZodType<DeviceUseStatement> =
  untypedDeviceUseStatementSchema

export class FhirDeviceUseStatement extends FhirDomainResource<DeviceUseStatement> {
  // Static Functions

  public static parse(value: unknown): FhirDeviceUseStatement {
    return new FhirDeviceUseStatement(deviceUseStatementSchema.parse(value))
  }
}
