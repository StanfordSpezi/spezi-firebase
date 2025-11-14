# FHIR Schema Type Validation

This document explains the mechanisms in place to ensure exact type matches between Zod schemas and FHIR R4B types.

## Overview

The spezi-firebase-fhir package uses Zod schemas to validate FHIR resources at runtime. To ensure that these schemas exactly match the TypeScript types from `@types/fhir`, we have implemented several compile-time and runtime validation mechanisms.

## Type-Level Validation

### Compile-Time Type Checking

Every schema definition uses TypeScript's type system to enforce exact matches with FHIR types. This is done through:

1. **Type Annotations**: Each schema is annotated with `satisfies ZodType<FhirType>` to ensure the schema can produce the correct type.

2. **Bidirectional Type Tests**: The test file `test/schemaTypeValidation.test.ts` contains type-level assertions that verify bidirectional type compatibility:

   ```typescript
   type AssertExactType<T, U> =
     [T] extends [U] ?
       [U] extends [T] ?
         true
       : never
     : never
   ```

   This ensures that:

   - The schema output type is assignable to the FHIR type (no extra properties)
   - The FHIR type is assignable to the schema output type (no missing properties)

3. **Example Usage**:

   ```typescript
   // In patient.ts
   export const patientSchema = z.lazy(() =>
     domainResourceSchema.extend({
       resourceType: z.literal('Patient').readonly(),
       // ... all Patient fields
     }),
   ) satisfies ZodType<Patient>

   // In schemaTypeValidation.test.ts
   type _PatientSchemaOutput = z.infer<typeof patientSchema>
   type _PatientTest = AssertExactType<_PatientSchemaOutput, Patient>
   ```

If there's a type mismatch, TypeScript will fail to compile, preventing deployment of schemas that don't match FHIR specifications.

## Primitive Type Regex Validation

### Strict Regex Patterns

All primitive types (date, dateTime, instant, code, base64Binary, etc.) use strict regex patterns that are anchored with `^` and `$` to ensure complete string matching.

The test file `test/primitiveTypeRegex.test.ts` validates that:

1. **Valid FHIR values are accepted**: Tests include examples from the FHIR specification
2. **Invalid values are rejected**: Tests verify that malformed data is caught

### Primitive Type Examples

#### dateTime

- Pattern: `^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?$`
- Valid: `2023`, `2023-11-13`, `2023-11-13T10:30:00Z`, `2023-11-13T10:30:00+05:30`
- Invalid: `23-11-13`, `2023-13-01`, `2023-11-13T25:00:00Z`

#### date

- Pattern: `^([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?$`
- Valid: `2023`, `2023-11`, `2023-11-13`
- Invalid: `23-11-13`, `2023-13-01`, `2023-11-32`

#### base64Binary

- Pattern: `^(\s*([0-9a-zA-Z\+\/\=]){4}\s*)+$`
- Valid: `SGVsbG8gV29ybGQ=`, `iVBORw0KGgoAAAANSUhEUgAAAAUA`
- Invalid: `abc` (not in groups of 4), `Hello World` (invalid characters)

#### code

- Pattern: `^[^\s]+(\s[^\s]+)*$`
- Valid: `active`, `final`, `test-code`, `multi word code`
- Invalid: ``(empty),` `(only whitespace),`double space`

## Validation Process

### During Development

1. Write or modify a schema
2. TypeScript compiler checks type compatibility
3. If types don't match exactly, compilation fails with a clear error
4. Developer fixes the schema or type definition

### During Testing

1. Runtime tests validate actual FHIR data against schemas
2. Primitive type regex tests verify pattern correctness
3. Type validation tests ensure compile-time checks are working

### During Runtime

1. Zod schemas validate incoming FHIR data
2. Invalid data is rejected with detailed error messages
3. Valid data is parsed and type-safe

## Benefits

1. **Compile-Time Safety**: Type mismatches are caught before deployment
2. **Runtime Validation**: Invalid FHIR data is rejected with clear error messages
3. **Bidirectional Checking**: Ensures schemas aren't too permissive or too restrictive
4. **Regex Validation**: Primitive types conform to FHIR specifications
5. **Automatic Documentation**: TypeScript types serve as documentation

## Adding New Schemas

When adding a new FHIR resource schema:

1. Import the FHIR type from `fhir/r4b.js`
2. Define the schema with all fields matching the FHIR type
3. Add `satisfies ZodType<FhirType>` to the schema definition
4. Add type-level validation in `test/schemaTypeValidation.test.ts`
5. Add runtime tests with valid FHIR data

Example:

```typescript
import type { MyResource } from 'fhir/r4b.js'
import { z, type ZodType } from 'zod'

export const myResourceSchema = z.object({
  resourceType: z.literal('MyResource').readonly(),
  // ... all fields from MyResource
}) satisfies ZodType<MyResource>

export const myResourceSchemaTyped: ZodType<MyResource> = myResourceSchema
```

## Testing

Run the validation tests:

```bash
# All tests
npm test

# Type validation tests
npm test -- schemaTypeValidation.test.ts

# Primitive type regex tests
npm test -- primitiveTypeRegex.test.ts

# Type checking utilities
npm test -- typeChecking.test.ts
```

## References

- [FHIR R4B Specification](https://hl7.org/fhir/R4B/)
- [FHIR R4B Data Types](https://hl7.org/fhir/R4B/datatypes.html)
- [Zod Documentation](https://zod.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
