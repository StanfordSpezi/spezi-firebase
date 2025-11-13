//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

/**
 * This test file validates that primitive type regex patterns match the FHIR specification.
 * FHIR R4B primitive types are defined at: https://hl7.org/fhir/R4B/datatypes.html
 */

import {
  base64BinarySchema,
  dateTimeSchema,
  dateSchema,
  instantSchema,
  codeSchema,
  timeSchema,
  uriSchema,
  oidSchema,
  idSchema,
  markdownSchema,
} from '../src/elements/dataTypes/primitiveTypes.js'

describe('Primitive Type Regex Validation', () => {
  describe('base64BinarySchema', () => {
    it('should accept valid base64 strings', () => {
      const validBase64 = [
        'SGVsbG8gV29ybGQ=',
        'VGVzdA==',
        'YWJjZA==',
        'MTIzNA==',
        'YWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXo=',
      ]

      validBase64.forEach((value) => {
        expect(() => base64BinarySchema.parse(value)).not.toThrow()
      })
    })

    it('should reject invalid base64 strings', () => {
      const invalidBase64 = [
        'Hello World', // Contains space
        'abc', // Not in groups of 4
        '!!!', // Invalid characters
        'abc!', // Invalid character '!'
      ]

      invalidBase64.forEach((value) => {
        expect(() => base64BinarySchema.parse(value)).toThrow()
      })
    })

    it('should accept base64 with valid padding', () => {
      // These are groups of 4 base64 characters, which the regex accepts
      expect(() => base64BinarySchema.parse('SGVsbG8=')).not.toThrow()
      expect(() => base64BinarySchema.parse('SGVsbG8gV29ybGQ=')).not.toThrow()
      expect(() => base64BinarySchema.parse('SGVs')).not.toThrow() // 4 chars
    })
  })

  describe('dateTimeSchema', () => {
    it('should accept valid FHIR dateTime values', () => {
      const validDateTimes = [
        '2023',
        '2023-11',
        '2023-11-13',
        '2023-11-13T10:30:00Z',
        '2023-11-13T10:30:00.123Z',
        '2023-11-13T10:30:00+05:30',
        '2023-11-13T10:30:00-08:00',
        '2023-01-01T00:00:00Z',
        '2023-12-31T23:59:59Z',
      ]

      validDateTimes.forEach((value) => {
        expect(() => dateTimeSchema.parse(value)).not.toThrow()
      })
    })

    it('should reject invalid dateTime values', () => {
      const invalidDateTimes = [
        '23-11-13', // Wrong format
        '2023-13-01', // Invalid month
        '2023-11-32', // Invalid day
        '2023-11-13T25:00:00Z', // Invalid hour
        '2023-11-13T10:60:00Z', // Invalid minute
        'not-a-date',
      ]

      invalidDateTimes.forEach((value) => {
        expect(() => dateTimeSchema.parse(value)).toThrow()
      })
    })
  })

  describe('dateSchema', () => {
    it('should accept valid FHIR date values', () => {
      const validDates = [
        '2023',
        '2023-11',
        '2023-11-13',
        '2000-01-01',
        '1999-12-31',
      ]

      validDates.forEach((value) => {
        expect(() => dateSchema.parse(value)).not.toThrow()
      })
    })

    it('should reject invalid date values', () => {
      const invalidDates = [
        '23-11-13', // Wrong format
        '2023-13-01', // Invalid month
        '2023-11-32', // Invalid day
        '2023-11-13T10:30:00Z', // Contains time
        'not-a-date',
      ]

      invalidDates.forEach((value) => {
        expect(() => dateSchema.parse(value)).toThrow()
      })
    })
  })

  describe('instantSchema', () => {
    it('should accept valid FHIR instant values', () => {
      const validInstants = [
        '2023-11-13T10:30:00Z',
        '2023-11-13T10:30:00.123Z',
        '2023-11-13T10:30:00+05:30',
        '2023-11-13T10:30:00-08:00',
        '2023-01-01T00:00:00Z',
        '2023-12-31T23:59:59.999Z',
      ]

      validInstants.forEach((value) => {
        expect(() => instantSchema.parse(value)).not.toThrow()
      })
    })

    it('should reject invalid instant values', () => {
      const invalidInstants = [
        '2023', // Missing time
        '2023-11-13', // Missing time
        '2023-11-13T10:30:00', // Missing timezone
        '2023-11-13T25:00:00Z', // Invalid hour
        'not-an-instant',
      ]

      invalidInstants.forEach((value) => {
        expect(() => instantSchema.parse(value)).toThrow()
      })
    })
  })

  describe('codeSchema', () => {
    it('should accept valid FHIR code values', () => {
      const validCodes = [
        'active',
        'final',
        'test-code',
        'code123',
        'multi word code',
      ]

      validCodes.forEach((value) => {
        expect(() => codeSchema.parse(value)).not.toThrow()
      })
    })

    it('should reject invalid code values', () => {
      const invalidCodes = [
        '', // Empty string
        '  ', // Only whitespace
        'code  with  double  spaces', // Multiple consecutive spaces
      ]

      invalidCodes.forEach((value) => {
        expect(() => codeSchema.parse(value)).toThrow()
      })
    })
  })

  describe('timeSchema', () => {
    it('should accept valid FHIR time values', () => {
      const validTimes = [
        '00:00:00',
        '10:30:00',
        '23:59:59',
        '12:00:00.123',
        '08:30:00.000',
      ]

      validTimes.forEach((value) => {
        expect(() => timeSchema.parse(value)).not.toThrow()
      })
    })

    it('should reject invalid time values', () => {
      const invalidTimes = [
        '25:00:00', // Invalid hour
        '10:60:00', // Invalid minute
        '10:30:61', // Invalid second
        '10:30', // Missing seconds
        'not-a-time',
      ]

      invalidTimes.forEach((value) => {
        expect(() => timeSchema.parse(value)).toThrow()
      })
    })
  })

  describe('uriSchema', () => {
    it('should accept valid URI values', () => {
      const validUris = [
        'http://example.com',
        'https://example.com/path',
        'urn:oid:1.2.3.4',
        'urn:uuid:550e8400-e29b-41d4-a716-446655440000',
        'relative/path',
        '#fragment',
        '',
      ]

      validUris.forEach((value) => {
        expect(() => uriSchema.parse(value)).not.toThrow()
      })
    })

    it('should reject URIs with whitespace', () => {
      const invalidUris = ['http://example.com with space', 'uri with space']

      invalidUris.forEach((value) => {
        expect(() => uriSchema.parse(value)).toThrow()
      })
    })
  })

  describe('oidSchema', () => {
    it('should accept valid OID values', () => {
      const validOids = [
        'urn:oid:1.2.3',
        'urn:oid:1.2.3.4.5.6.7.8.9',
        'urn:oid:2.16.840.1.113883.6.1',
        'urn:oid:0.1.2',
      ]

      validOids.forEach((value) => {
        expect(() => oidSchema.parse(value)).not.toThrow()
      })
    })

    it('should reject invalid OID values', () => {
      const invalidOids = [
        '1.2.3', // Missing urn:oid prefix
        'urn:oid:', // No numbers
        'urn:oid:3.1', // First digit > 2
        'urn:oid:1', // Too short
        'urn:oid:1.01', // Leading zero
      ]

      invalidOids.forEach((value) => {
        expect(() => oidSchema.parse(value)).toThrow()
      })
    })
  })

  describe('idSchema', () => {
    it('should accept valid FHIR id values', () => {
      const validIds = [
        'a',
        '123',
        'abc-123',
        'patient.123',
        'a1b2c3d4',
        'A1B2C3D4',
        '1234567890123456789012345678901234567890123456789012345678901234', // 64 chars
      ]

      validIds.forEach((value) => {
        expect(() => idSchema.parse(value)).not.toThrow()
      })
    })

    it('should reject invalid id values', () => {
      const invalidIds = [
        '', // Empty
        'abc_123', // Underscore not allowed
        'abc 123', // Space not allowed
        '12345678901234567890123456789012345678901234567890123456789012345', // 65 chars (too long)
      ]

      invalidIds.forEach((value) => {
        expect(() => idSchema.parse(value)).toThrow()
      })
    })
  })

  describe('markdownSchema', () => {
    it('should accept valid markdown values', () => {
      const validMarkdown = [
        '',
        'Simple text',
        '# Heading\n\nParagraph',
        '**Bold** and *italic*',
        'Line 1\nLine 2',
        '   Leading spaces',
      ]

      validMarkdown.forEach((value) => {
        expect(() => markdownSchema.parse(value)).not.toThrow()
      })
    })

    // Markdown allows almost any content, so there are very few invalid cases
    it('should be permissive for markdown content', () => {
      expect(() => markdownSchema.parse('Any content is valid')).not.toThrow()
    })
  })
})
