//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import { type Binary } from 'fhir/r4b.js'
import { FhirBinary } from '../../src/index.js'

describe('FhirBinary', () => {
  describe('getDataAsUint8Array', () => {
    it('should decode base64 data correctly', () => {
      // "Hello, World!" in base64
      const base64Data = 'SGVsbG8sIFdvcmxkIQ=='
      const binary: Binary = {
        resourceType: 'Binary',
        contentType: 'text/plain',
        data: base64Data,
      }

      const fhirBinary = new FhirBinary(binary)
      const data = fhirBinary.dataAsUint8Array

      expect(data).toBeInstanceOf(Uint8Array)
      expect(data?.length).toBe(13)

      // Convert back to string to verify
      const decoder = new TextDecoder()
      const text = decoder.decode(data)
      expect(text).toBe('Hello, World!')
    })

    it('should decode binary data correctly', () => {
      // Create a simple binary sequence
      const bytes = new Uint8Array([0, 1, 2, 3, 255, 254, 253])
      const base64Data = Buffer.from(bytes).toString('base64')

      const binary: Binary = {
        resourceType: 'Binary',
        contentType: 'application/octet-stream',
        data: base64Data,
      }

      const fhirBinary = new FhirBinary(binary)
      const data = fhirBinary.dataAsUint8Array

      expect(data).toBeInstanceOf(Uint8Array)
      expect(data?.length).toBe(7)
      expect(Array.from(data ?? [])).toEqual([0, 1, 2, 3, 255, 254, 253])
    })

    it('should return undefined when no data', () => {
      const binary: Binary = {
        resourceType: 'Binary',
        contentType: 'text/plain',
      }

      const fhirBinary = new FhirBinary(binary)
      const data = fhirBinary.dataAsUint8Array

      expect(data).toBeUndefined()
    })

    it('should handle empty base64 string', () => {
      const binary: Binary = {
        resourceType: 'Binary',
        contentType: 'text/plain',
        data: '',
      }

      const fhirBinary = new FhirBinary(binary)
      const data = fhirBinary.dataAsUint8Array

      // Empty string is still valid base64, returns empty array
      expect(data).toBeDefined()
      expect(data?.length).toBe(0)
    })

    it('should handle invalid base64 gracefully', () => {
      // Note: Node.js Buffer.from() is lenient and doesn't throw for many invalid inputs
      // This test verifies the method doesn't crash
      const binary: Binary = {
        resourceType: 'Binary',
        contentType: 'text/plain',
        data: '!!!invalid!!!',
      }

      const fhirBinary = new FhirBinary(binary)

      // Should not throw, but may return unexpected results
      expect(() => fhirBinary.dataAsUint8Array).not.toThrow()
    })

    it('should handle large binary data', () => {
      // Create a 1KB array
      const bytes = new Uint8Array(1024)
      for (let i = 0; i < bytes.length; i++) {
        bytes[i] = i % 256
      }
      const base64Data = Buffer.from(bytes).toString('base64')

      const binary: Binary = {
        resourceType: 'Binary',
        contentType: 'application/octet-stream',
        data: base64Data,
      }

      const fhirBinary = new FhirBinary(binary)
      const data = fhirBinary.dataAsUint8Array

      expect(data).toBeInstanceOf(Uint8Array)
      expect(data?.length).toBe(1024)

      // Verify the data matches
      for (let i = 0; i < 1024; i++) {
        expect(data?.[i]).toBe(i % 256)
      }
    })

    it('should decode JSON data stored as base64', () => {
      const jsonData = { name: 'Test', value: 42 }
      const jsonString = JSON.stringify(jsonData)
      const base64Data = Buffer.from(jsonString).toString('base64')

      const binary: Binary = {
        resourceType: 'Binary',
        contentType: 'application/json',
        data: base64Data,
      }

      const fhirBinary = new FhirBinary(binary)
      const data = fhirBinary.dataAsUint8Array

      expect(data).toBeInstanceOf(Uint8Array)

      // Decode and parse the JSON
      const decoder = new TextDecoder()
      const decodedJson = JSON.parse(decoder.decode(data))

      expect(decodedJson).toEqual(jsonData)
    })
  })
})
