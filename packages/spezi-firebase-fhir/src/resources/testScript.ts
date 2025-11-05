//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import {
  TestScriptDestination,
  TestScriptMetadata,
  TestScriptOrigin,
  type TestScript,
} from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'
import { FhirDomainResource } from './domainResourceClass.js'
import {
  backboneElementSchema,
  booleanSchema,
  codeableConceptSchema,
  codingSchema,
  contactDetailSchema,
  dateTimeSchema,
  domainResourceSchema,
  elementSchema,
  identifierSchema,
  intSchema,
  referenceSchema,
  stringSchema,
  urlSchema,
  uriSchema,
  usageContextSchema,
} from '../elements/index.js'
import {
  publicationStatusSchema,
  assertDirectionSchema,
  assertOperatorSchema,
  assertResponseCodeSchema,
  mimeTypeSchema,
  testScriptRequestMethodSchema,
} from '../valueSets/index.js'

const testScriptOriginSchema: ZodType<TestScriptOrigin> =
  backboneElementSchema.extend({
    index: intSchema,
    profile: codingSchema,
  })

const testScriptDestinationSchema: ZodType<TestScriptDestination> =
  backboneElementSchema.extend({
    index: intSchema,
    profile: codingSchema,
  })

const testScriptMetadataSchema: ZodType<TestScriptMetadata> =
  backboneElementSchema.extend({
    link: backboneElementSchema
      .extend({
        url: uriSchema,
        _url: elementSchema.optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
      })
      .array()
      .optional(),
    capability: backboneElementSchema
      .extend({
        required: booleanSchema,
        _required: elementSchema.optional(),
        validated: booleanSchema,
        _validated: elementSchema.optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        origin: intSchema.array().optional(),
        _origin: elementSchema.array().optional(),
        destination: intSchema.optional(),
        _destination: elementSchema.optional(),
        link: uriSchema.array().optional(),
        _link: elementSchema.array().optional(),
        capabilities: urlSchema,
        _capabilities: elementSchema.optional(),
      })
      .array(),
  })

export const untypedTestScriptSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('TestScript').readonly(),
    url: urlSchema,
    _url: elementSchema.optional(),
    identifier: identifierSchema.optional(),
    version: stringSchema.optional(),
    _version: elementSchema.optional(),
    name: stringSchema,
    _name: elementSchema.optional(),
    title: stringSchema.optional(),
    _title: elementSchema.optional(),
    status: publicationStatusSchema,
    _status: elementSchema.optional(),
    experimental: booleanSchema.optional(),
    _experimental: elementSchema.optional(),
    date: dateTimeSchema.optional(),
    _date: elementSchema.optional(),
    publisher: stringSchema.optional(),
    _publisher: elementSchema.optional(),
    contact: contactDetailSchema.array().optional(),
    description: stringSchema.optional(),
    _description: elementSchema.optional(),
    useContext: usageContextSchema.array().optional(),
    jurisdiction: codeableConceptSchema.array().optional(),
    purpose: stringSchema.optional(),
    _purpose: elementSchema.optional(),
    copyright: stringSchema.optional(),
    _copyright: elementSchema.optional(),
    origin: testScriptOriginSchema.array().optional(),
    destination: testScriptDestinationSchema.array().optional(),
    metadata: testScriptMetadataSchema.optional(),
    fixture: backboneElementSchema
      .extend({
        autocreate: booleanSchema,
        _autocreate: elementSchema.optional(),
        autodelete: booleanSchema,
        _autodelete: elementSchema.optional(),
        resource: referenceSchema.optional(),
      })
      .array()
      .optional(),
    profile: referenceSchema.array().optional(),
    variable: backboneElementSchema
      .extend({
        name: stringSchema,
        _name: elementSchema.optional(),
        defaultValue: stringSchema.optional(),
        _defaultValue: elementSchema.optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        expression: stringSchema.optional(),
        _expression: elementSchema.optional(),
        headerField: stringSchema.optional(),
        _headerField: elementSchema.optional(),
        hint: stringSchema.optional(),
        _hint: elementSchema.optional(),
        path: stringSchema.optional(),
        _path: elementSchema.optional(),
        sourceId: stringSchema.optional(),
        _sourceId: elementSchema.optional(),
      })
      .array()
      .optional(),
    setup: backboneElementSchema
      .extend({
        action: backboneElementSchema
          .extend({
            operation: backboneElementSchema
              .extend({
                type: codingSchema.optional(),
                resource: urlSchema.optional(),
                _resource: elementSchema.optional(),
                label: stringSchema.optional(),
                _label: elementSchema.optional(),
                description: stringSchema.optional(),
                _description: elementSchema.optional(),
                accept: stringSchema.optional(),
                _accept: elementSchema.optional(),
                contentType: mimeTypeSchema.optional(),
                _contentType: elementSchema.optional(),
                destination: intSchema.optional(),
                _destination: elementSchema.optional(),
                encodeRequestUrl: booleanSchema,
                _encodeRequestUrl: elementSchema.optional(),
                method: testScriptRequestMethodSchema.optional(),
                _method: elementSchema.optional(),
                origin: intSchema.optional(),
                _origin: elementSchema.optional(),
                params: stringSchema.optional(),
                _params: elementSchema.optional(),
                requestHeader: backboneElementSchema
                  .extend({
                    field: stringSchema,
                    _field: elementSchema.optional(),
                    value: stringSchema,
                    _value: elementSchema.optional(),
                  })
                  .array()
                  .optional(),
                requestId: stringSchema.optional(),
                _requestId: elementSchema.optional(),
                responseId: stringSchema.optional(),
                _responseId: elementSchema.optional(),
                sourceId: stringSchema.optional(),
                _sourceId: elementSchema.optional(),
                targetId: stringSchema.optional(),
                _targetId: elementSchema.optional(),
                url: stringSchema.optional(),
                _url: elementSchema.optional(),
              })
              .optional(),
            assert: backboneElementSchema
              .extend({
                label: stringSchema.optional(),
                _label: elementSchema.optional(),
                description: stringSchema.optional(),
                _description: elementSchema.optional(),
                direction: assertDirectionSchema.optional(),
                _direction: elementSchema.optional(),
                compareToSourceId: stringSchema.optional(),
                _compareToSourceId: elementSchema.optional(),
                compareToSourceExpression: stringSchema.optional(),
                _compareToSourceExpression: elementSchema.optional(),
                compareToSourcePath: stringSchema.optional(),
                _compareToSourcePath: elementSchema.optional(),
                contentType: mimeTypeSchema.optional(),
                _contentType: elementSchema.optional(),
                expression: stringSchema.optional(),
                _expression: elementSchema.optional(),
                headerField: stringSchema.optional(),
                _headerField: elementSchema.optional(),
                minimumId: stringSchema.optional(),
                _minimumId: elementSchema.optional(),
                navigationLinks: booleanSchema.optional(),
                _navigationLinks: elementSchema.optional(),
                operator: assertOperatorSchema.optional(),
                _operator: elementSchema.optional(),
                path: stringSchema.optional(),
                _path: elementSchema.optional(),
                requestMethod: testScriptRequestMethodSchema.optional(),
                _requestMethod: elementSchema.optional(),
                requestURL: stringSchema.optional(),
                _requestURL: elementSchema.optional(),
                resource: urlSchema.optional(),
                _resource: elementSchema.optional(),
                response: assertResponseCodeSchema.optional(),
                _response: elementSchema.optional(),
                responseCode: stringSchema.optional(),
                _responseCode: elementSchema.optional(),
                sourceId: stringSchema.optional(),
                _sourceId: elementSchema.optional(),
                stopTestOnFail: booleanSchema,
                _stopTestOnFail: elementSchema.optional(),
                validateProfileId: stringSchema.optional(),
                _validateProfileId: elementSchema.optional(),
                value: stringSchema.optional(),
                _value: elementSchema.optional(),
                warningOnly: booleanSchema,
                _warningOnly: elementSchema.optional(),
              })
              .optional(),
          })
          .array(),
      })
      .optional(),
    test: backboneElementSchema
      .extend({
        name: stringSchema.optional(),
        _name: elementSchema.optional(),
        description: stringSchema.optional(),
        _description: elementSchema.optional(),
        action: backboneElementSchema
          .extend({
            operation: backboneElementSchema
              .extend({
                type: codingSchema.optional(),
                resource: urlSchema.optional(),
                _resource: elementSchema.optional(),
                label: stringSchema.optional(),
                _label: elementSchema.optional(),
                description: stringSchema.optional(),
                _description: elementSchema.optional(),
                accept: stringSchema.optional(),
                _accept: elementSchema.optional(),
                contentType: mimeTypeSchema.optional(),
                _contentType: elementSchema.optional(),
                destination: intSchema.optional(),
                _destination: elementSchema.optional(),
                encodeRequestUrl: booleanSchema,
                _encodeRequestUrl: elementSchema.optional(),
                method: testScriptRequestMethodSchema.optional(),
                _method: elementSchema.optional(),
                origin: intSchema.optional(),
                _origin: elementSchema.optional(),
                params: stringSchema.optional(),
                _params: elementSchema.optional(),
                requestHeader: backboneElementSchema
                  .extend({
                    field: stringSchema,
                    _field: elementSchema.optional(),
                    value: stringSchema,
                    _value: elementSchema.optional(),
                  })
                  .array()
                  .optional(),
                requestId: stringSchema.optional(),
                _requestId: elementSchema.optional(),
                responseId: stringSchema.optional(),
                _responseId: elementSchema.optional(),
                sourceId: stringSchema.optional(),
                _sourceId: elementSchema.optional(),
                targetId: stringSchema.optional(),
                _targetId: elementSchema.optional(),
                url: stringSchema.optional(),
                _url: elementSchema.optional(),
              })
              .optional(),
            assert: backboneElementSchema
              .extend({
                label: stringSchema.optional(),
                _label: elementSchema.optional(),
                description: stringSchema.optional(),
                _description: elementSchema.optional(),
                direction: assertDirectionSchema.optional(),
                _direction: elementSchema.optional(),
                compareToSourceId: stringSchema.optional(),
                _compareToSourceId: elementSchema.optional(),
                compareToSourceExpression: stringSchema.optional(),
                _compareToSourceExpression: elementSchema.optional(),
                compareToSourcePath: stringSchema.optional(),
                _compareToSourcePath: elementSchema.optional(),
                contentType: mimeTypeSchema.optional(),
                _contentType: elementSchema.optional(),
                expression: stringSchema.optional(),
                _expression: elementSchema.optional(),
                headerField: stringSchema.optional(),
                _headerField: elementSchema.optional(),
                minimumId: stringSchema.optional(),
                _minimumId: elementSchema.optional(),
                navigationLinks: booleanSchema.optional(),
                _navigationLinks: elementSchema.optional(),
                operator: assertOperatorSchema.optional(),
                _operator: elementSchema.optional(),
                path: stringSchema.optional(),
                _path: elementSchema.optional(),
                requestMethod: testScriptRequestMethodSchema.optional(),
                _requestMethod: elementSchema.optional(),
                requestURL: stringSchema.optional(),
                _requestURL: elementSchema.optional(),
                resource: urlSchema.optional(),
                _resource: elementSchema.optional(),
                response: assertResponseCodeSchema.optional(),
                _response: elementSchema.optional(),
                responseCode: stringSchema.optional(),
                _responseCode: elementSchema.optional(),
                sourceId: stringSchema.optional(),
                _sourceId: elementSchema.optional(),
                stopTestOnFail: booleanSchema,
                _stopTestOnFail: elementSchema.optional(),
                validateProfileId: stringSchema.optional(),
                _validateProfileId: elementSchema.optional(),
                value: stringSchema.optional(),
                _value: elementSchema.optional(),
                warningOnly: booleanSchema,
                _warningOnly: elementSchema.optional(),
              })
              .optional(),
          })
          .array(),
      })
      .array()
      .optional(),
    teardown: backboneElementSchema
      .extend({
        action: backboneElementSchema
          .extend({
            operation: backboneElementSchema.extend({
              type: codingSchema.optional(),
              resource: urlSchema.optional(),
              _resource: elementSchema.optional(),
              label: stringSchema.optional(),
              _label: elementSchema.optional(),
              description: stringSchema.optional(),
              _description: elementSchema.optional(),
              accept: stringSchema.optional(),
              _accept: elementSchema.optional(),
              contentType: mimeTypeSchema.optional(),
              _contentType: elementSchema.optional(),
              destination: intSchema.optional(),
              _destination: elementSchema.optional(),
              encodeRequestUrl: booleanSchema,
              _encodeRequestUrl: elementSchema.optional(),
              method: testScriptRequestMethodSchema.optional(),
              _method: elementSchema.optional(),
              origin: intSchema.optional(),
              _origin: elementSchema.optional(),
              params: stringSchema.optional(),
              _params: elementSchema.optional(),
              requestHeader: backboneElementSchema
                .extend({
                  field: stringSchema,
                  _field: elementSchema.optional(),
                  value: stringSchema,
                  _value: elementSchema.optional(),
                })
                .array()
                .optional(),
              requestId: stringSchema.optional(),
              _requestId: elementSchema.optional(),
              responseId: stringSchema.optional(),
              _responseId: elementSchema.optional(),
              sourceId: stringSchema.optional(),
              _sourceId: elementSchema.optional(),
              targetId: stringSchema.optional(),
              _targetId: elementSchema.optional(),
              url: stringSchema.optional(),
              _url: elementSchema.optional(),
            }),
          })
          .array(),
      })
      .optional(),
  }),
) satisfies ZodType<TestScript>

export const testScriptSchema: ZodType<TestScript> = untypedTestScriptSchema

export class FhirTestScript extends FhirDomainResource<TestScript> {
  public static parse(value: unknown): FhirTestScript {
    return new FhirTestScript(testScriptSchema.parse(value))
  }
}
