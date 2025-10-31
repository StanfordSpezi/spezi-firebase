<!--
This source file is part of the Stanford Biodesign Digital Health Spezi Firebase open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT
-->

# FHIR Zod Schema Generation - Improvement Proposals

## Executive Summary

This document proposes three different approaches to improve the creation of Zod schemas for FHIR R4B resources. Each approach is evaluated based on three key criteria:

- **Speed**: How quickly schemas can be generated or updated
- **Accuracy**: How closely schemas match the FHIR specification
- **Type Safety**: Level of compile-time type checking and runtime validation

## Current State Analysis

The current implementation manually creates Zod schemas for 130+ FHIR R4B resources, totaling approximately 14,500 lines of code. While comprehensive and type-safe, this approach has limitations:

- **Manual Maintenance**: Each schema requires hand-coding and must be manually updated when the FHIR specification changes
- **Consistency Challenges**: Different developers may implement similar patterns differently
- **Error Prone**: Manual schema creation can lead to inconsistencies with the FHIR specification
- **Time Intensive**: Adding new resources or updating existing ones requires significant developer time

---

## Approach 1: TypeScript-to-Zod Code Generation

### Overview

Leverage existing TypeScript definitions from `@types/fhir` and use tools like `ts-to-zod` to automatically generate Zod schemas. This approach transforms TypeScript interfaces into runtime-validated Zod schemas.

### Implementation Strategy

1. **Use Existing Type Definitions**: The `@types/fhir` package already provides comprehensive TypeScript types for all FHIR resources
2. **Code Generation Tool**: Utilize `ts-to-zod` or a custom transformer to convert TypeScript types to Zod schemas
3. **Build-Time Generation**: Integrate schema generation into the build pipeline
4. **Customization Layer**: Add post-processing to inject custom validations and helper methods

### Technical Details

```typescript
// Input: TypeScript definition from @types/fhir
interface Patient extends DomainResource {
  resourceType: "Patient";
  identifier?: Identifier[];
  active?: boolean;
  name?: HumanName[];
  // ... more fields
}

// Output: Generated Zod schema
export const patientSchema = z.object({
  resourceType: z.literal("Patient"),
  identifier: identifierSchema.array().optional(),
  active: z.boolean().optional(),
  name: humanNameSchema.array().optional(),
  // ... more fields
})
```

### Implementation Steps

1. Install and configure `ts-to-zod`
2. Create build script that:
   - Extracts type definitions from `@types/fhir`
   - Generates Zod schemas
   - Applies custom transformations (e.g., add helper methods, custom validations)
3. Integrate into CI/CD pipeline
4. Generate wrapper classes with helper methods

### Pros

✅ **Speed**: Very fast - automated generation takes seconds
✅ **Type Safety**: Excellent - maintains TypeScript types and adds runtime validation
✅ **Maintenance**: Minimal - update when `@types/fhir` updates
✅ **Consistency**: High - all schemas generated using same logic
✅ **Developer Experience**: Good - existing TypeScript knowledge applies

### Cons

❌ **Accuracy Limitations**: TypeScript types may not capture all FHIR constraints (e.g., choice types, conditional requirements)
❌ **Customization**: Requires additional layer for FHIR-specific validations
❌ **Tool Dependency**: Relies on third-party tools that may not be actively maintained
❌ **Type Complexity**: Complex TypeScript types (unions, conditionals) may not translate perfectly

### Evaluation

| Criterion    | Rating | Notes |
|--------------|--------|-------|
| Speed        | ⭐⭐⭐⭐⭐ | Automated generation in seconds |
| Accuracy     | ⭐⭐⭐   | Good for structure, may miss FHIR-specific constraints |
| Type Safety  | ⭐⭐⭐⭐⭐ | Excellent - combines compile-time and runtime checking |

### Estimated Implementation Time

- Initial setup: 2-3 days
- Integration and testing: 3-4 days
- Documentation: 1 day
- **Total: ~1.5 weeks**

---

## Approach 2: FHIR Structure Definition (JSON) Based Generation

### Overview

Parse the official FHIR R4B StructureDefinition resources (available as JSON) to generate Zod schemas. This is the most accurate approach as it uses the canonical FHIR specification directly.

### Implementation Strategy

1. **Download FHIR Definitions**: Obtain official FHIR R4B StructureDefinitions from hl7.org
2. **Parse StructureDefinitions**: Read JSON files containing element definitions, cardinality, types, and constraints
3. **Generate Schemas**: Create custom code generator that produces Zod schemas from parsed definitions
4. **Handle FHIR Patterns**: Implement specialized handling for:
   - Choice types (e.g., `value[x]`)
   - Backbone elements (nested structures)
   - Slicing and profiling
   - Value set bindings
   - Cardinality constraints

### Technical Details

```typescript
// Input: FHIR StructureDefinition JSON
{
  "resourceType": "StructureDefinition",
  "type": "Patient",
  "snapshot": {
    "element": [
      {
        "path": "Patient.identifier",
        "min": 0,
        "max": "*",
        "type": [{"code": "Identifier"}]
      },
      {
        "path": "Patient.active",
        "min": 0,
        "max": "1",
        "type": [{"code": "boolean"}]
      }
      // ... more elements
    ]
  }
}

// Generator reads this and produces accurate Zod schema
export const patientSchema = z.object({
  resourceType: z.literal("Patient"),
  identifier: identifierSchema.array().optional(), // max: "*" → array
  active: booleanSchema.optional(), // min: 0 → optional
  // ... accurate cardinality and types
})
```

### Implementation Steps

1. Download FHIR R4B definitions from http://hl7.org/fhir/R4B/definitions.json.zip
2. Create parser for StructureDefinition JSON files
3. Build code generator that:
   - Maps FHIR types to Zod types
   - Handles cardinality (min/max) correctly
   - Implements choice type expansion
   - Generates proper nesting for backbone elements
   - Adds value set validations where applicable
4. Generate all resource and datatype schemas
5. Add utility layer for helper methods

### Pros

✅ **Accuracy**: Highest - directly from official FHIR specification
✅ **Comprehensive**: Captures all FHIR constraints, including:
  - Cardinality requirements
  - Choice types with proper typing
  - Value set bindings
  - Element constraints
✅ **Future-Proof**: Easy to regenerate for new FHIR versions
✅ **Authoritative**: Source of truth is the specification itself
✅ **Complete Coverage**: Includes metadata like descriptions and examples

### Cons

❌ **Complexity**: FHIR StructureDefinitions are complex; parser must handle many edge cases
❌ **Initial Development**: Significant upfront investment to build generator
❌ **FHIR Knowledge Required**: Developers need deep understanding of FHIR specification structure
❌ **Large Output**: Generated code may be verbose
❌ **Validation Performance**: Extremely detailed schemas may impact runtime performance

### Evaluation

| Criterion    | Rating | Notes |
|--------------|--------|-------|
| Speed        | ⭐⭐⭐⭐ | Fast once built; one-time generation per FHIR version |
| Accuracy     | ⭐⭐⭐⭐⭐ | Highest - direct from specification |
| Type Safety  | ⭐⭐⭐⭐⭐ | Excellent - comprehensive runtime validation |

### Estimated Implementation Time

- Parser development: 1 week
- Code generator development: 2 weeks
- Edge case handling: 1 week
- Testing and validation: 1 week
- Documentation: 1 week
- **Total: ~6 weeks**

---

## Approach 3: Hybrid Approach with Schema Builder DSL

### Overview

Create a domain-specific language (DSL) or builder pattern that simplifies manual schema creation while maintaining type safety and reducing boilerplate. This approach balances automation with flexibility.

### Implementation Strategy

1. **Create Schema Builders**: Develop fluent API for defining FHIR resources
2. **Smart Defaults**: Automatically infer common patterns (e.g., optional arrays, primitive wrappers)
3. **Template System**: Provide templates for common FHIR patterns
4. **Validation Helpers**: Built-in functions for FHIR-specific validations
5. **Type Safety**: Leverage TypeScript to ensure builder output matches FHIR types

### Technical Details

```typescript
// Builder API for simplified schema creation
const patientSchema = fhirResource('Patient')
  .withField('identifier', identifierSchema, { array: true, optional: true })
  .withField('active', booleanSchema, { optional: true })
  .withField('name', humanNameSchema, { array: true, optional: true })
  .withField('telecom', contactPointSchema, { array: true, optional: true })
  .withField('gender', administrativeGenderSchema, { optional: true })
  .withField('birthDate', dateSchema, { optional: true })
  .withBackbone('contact', (backbone) =>
    backbone
      .withField('relationship', codeableConceptSchema, { array: true, optional: true })
      .withField('name', humanNameSchema, { optional: true })
      .withField('telecom', contactPointSchema, { array: true, optional: true })
  )
  .withHelperMethods({
    getActiveIdentifiers: (patient: Patient) => 
      patient.identifier?.filter(id => id.period?.end === undefined)
  })
  .build()

// Alternative: Template-based approach
const patientSchema = defineResource({
  resourceType: 'Patient',
  fields: {
    identifier: array(identifierSchema).optional(),
    active: boolean().optional(),
    name: array(humanNameSchema).optional(),
    contact: backbone({
      relationship: array(codeableConceptSchema).optional(),
      name: humanNameSchema.optional(),
      // ...
    }).optional()
  },
  helpers: {
    getActiveIdentifiers: (patient) => 
      patient.identifier?.filter(id => !id.period?.end)
  }
})
```

### Implementation Steps

1. Design builder API focusing on ergonomics and type safety
2. Implement core builder classes:
   - `FhirResourceBuilder`
   - `BackboneElementBuilder`
   - `FieldBuilder`
3. Create helper functions for common patterns:
   - `optionalArray(schema)`
   - `choice(...schemas)` for FHIR choice types
   - `reference(...resourceTypes)` for typed references
4. Build template system for rapid resource creation
5. Migrate existing schemas incrementally

### Pros

✅ **Balance**: Good balance of automation and flexibility
✅ **Gradual Adoption**: Can migrate schemas incrementally
✅ **Developer-Friendly**: Intuitive API reduces learning curve
✅ **Customization**: Easy to add resource-specific logic
✅ **Type Safety**: Builder enforces correct structure at compile time
✅ **Maintainability**: Cleaner, more readable schema definitions
✅ **No External Dependencies**: Pure TypeScript solution

### Cons

❌ **Still Manual**: Each resource must be defined (though faster than current approach)
❌ **Learning Curve**: Developers must learn the builder API
❌ **Partial Automation**: Not fully automated like other approaches
❌ **Maintenance Overhead**: Builder library itself needs maintenance
❌ **Performance**: Builder pattern adds minimal runtime overhead

### Evaluation

| Criterion    | Rating | Notes |
|--------------|--------|-------|
| Speed        | ⭐⭐⭐⭐ | Faster than manual, not as fast as full automation |
| Accuracy     | ⭐⭐⭐⭐ | Good - reduces human error through structured API |
| Type Safety  | ⭐⭐⭐⭐⭐ | Excellent - compile-time and runtime safety |

### Estimated Implementation Time

- Builder API design: 1 week
- Core implementation: 2 weeks
- Helper utilities: 1 week
- Documentation and examples: 1 week
- Migration of existing schemas: 2 weeks
- **Total: ~7 weeks**

---

## Comparison Matrix

| Aspect | Approach 1: TS-to-Zod | Approach 2: FHIR JSON | Approach 3: Builder DSL |
|--------|----------------------|----------------------|------------------------|
| **Speed** | ⭐⭐⭐⭐⭐ Automated | ⭐⭐⭐⭐ One-time per version | ⭐⭐⭐⭐ Semi-automated |
| **Accuracy** | ⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Highest | ⭐⭐⭐⭐ Very Good |
| **Type Safety** | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐⭐ Excellent | ⭐⭐⭐⭐⭐ Excellent |
| **Implementation Time** | 1.5 weeks | 6 weeks | 7 weeks |
| **Maintenance** | Low | Low | Medium |
| **Flexibility** | Medium | Low | High |
| **Learning Curve** | Low | Medium | Medium |
| **External Dependencies** | Yes | No | No |

---

## Recommendations

### Short-Term (Immediate Improvement)

**Recommendation: Approach 3 - Hybrid Builder DSL**

**Rationale:**
- Provides immediate productivity improvements
- Can be implemented incrementally without disrupting existing code
- Offers best balance of developer experience and accuracy
- No external dependencies reduces risk
- Maintains full control over schema generation logic

**Implementation Plan:**
1. Weeks 1-2: Build core DSL/builder infrastructure
2. Weeks 3-4: Create helper utilities and templates
3. Week 5: Document API and create migration guide
4. Weeks 6-7: Migrate 20-30 existing schemas as proof of concept
5. Ongoing: Gradually migrate remaining schemas

### Long-Term (Maximum Accuracy)

**Recommendation: Approach 2 - FHIR JSON-Based Generation**

**Rationale:**
- Most accurate representation of FHIR specification
- Future-proof: easy to update for new FHIR versions
- Eliminates manual schema maintenance entirely
- Becomes the single source of truth for all FHIR resources

**Implementation Plan:**
1. Phase 1 (Weeks 1-3): Build parser for FHIR StructureDefinitions
2. Phase 2 (Weeks 4-6): Implement code generator with FHIR pattern support
3. Phase 3 (Weeks 7-8): Handle edge cases and complex resources
4. Phase 4 (Week 9): Generate all schemas and validate against existing
5. Phase 5 (Week 10): Integration testing and performance optimization
6. Phase 6 (Week 11): Documentation and migration
7. Phase 7 (Week 12): Buffer for issues and refinement

### Alternative Consideration

**Approach 1 (TS-to-Zod)** is viable as a quick win if:
- Immediate results are needed (< 2 weeks)
- TypeScript type coverage from `@types/fhir` is deemed sufficient
- Team is comfortable with external tool dependencies
- FHIR-specific validation can be added post-generation

However, it should be seen as a stepping stone rather than final solution.

---

## Success Metrics

To measure the success of any implemented approach, track:

1. **Schema Generation Time**: Time from FHIR spec update to usable schemas
2. **Error Rate**: Number of bugs/inaccuracies found in generated schemas
3. **Developer Productivity**: Time to add/modify a resource schema
4. **Test Coverage**: Percentage of FHIR resources with comprehensive tests
5. **Performance**: Schema validation time for typical FHIR resources
6. **Maintainability**: Effort required to support new FHIR versions

---

## Conclusion

All three approaches offer significant improvements over manual schema creation:

- **Approach 1** wins on implementation speed and simplicity
- **Approach 2** wins on accuracy and long-term maintainability
- **Approach 3** wins on flexibility and developer experience

For the Spezi Firebase FHIR package, a **phased approach** is recommended:

1. **Phase 1**: Implement Approach 3 (Builder DSL) for immediate productivity gains
2. **Phase 2**: Develop Approach 2 (FHIR JSON Generation) as the ultimate solution
3. **Fallback**: Keep Approach 1 (TS-to-Zod) as a rapid prototype option if needed

This strategy provides immediate value while working toward the most accurate and maintainable long-term solution.

---

## Appendix A: Code Examples

### Example 1: Generated Schema from Approach 2

```typescript
// Generated from FHIR StructureDefinition
export const patientSchema = z.lazy(() =>
  domainResourceSchema.extend({
    resourceType: z.literal('Patient').readonly(),
    // identifier: min=0, max=*, type=Identifier
    identifier: identifierSchema.array().optional(),
    // active: min=0, max=1, type=boolean
    active: booleanSchema.optional(),
    _active: elementSchema.optional(),
    // name: min=0, max=*, type=HumanName
    name: humanNameSchema.array().optional(),
    // telecom: min=0, max=*, type=ContactPoint
    telecom: contactPointSchema.array().optional(),
    // gender: min=0, max=1, type=code, binding=AdministrativeGender
    gender: administrativeGenderSchema.optional(),
    _gender: elementSchema.optional(),
    // birthDate: min=0, max=1, type=date
    birthDate: dateSchema.optional(),
    _birthDate: elementSchema.optional(),
    // deceased[x]: min=0, max=1, type=boolean|dateTime (choice type)
    deceasedBoolean: booleanSchema.optional(),
    _deceasedBoolean: elementSchema.optional(),
    deceasedDateTime: dateTimeSchema.optional(),
    _deceasedDateTime: elementSchema.optional(),
    // contact: BackboneElement (nested structure)
    contact: backboneElementSchema
      .extend({
        relationship: codeableConceptSchema.array().optional(),
        name: humanNameSchema.optional(),
        telecom: contactPointSchema.array().optional(),
        address: addressSchema.optional(),
        gender: administrativeGenderSchema.optional(),
        _gender: elementSchema.optional(),
        organization: referenceSchema.optional(),
        period: periodSchema.optional(),
      })
      .array()
      .optional(),
  }),
) satisfies ZodType<Patient>
```

### Example 2: Builder DSL Usage

```typescript
// Using builder DSL (Approach 3)
import { defineResource, array, optional, backbone } from './builders'

export const patientSchema = defineResource<Patient>({
  resourceType: 'Patient',
  fields: {
    identifier: array(identifierSchema).optional(),
    active: optional(booleanSchema).withPrimitive(),
    name: array(humanNameSchema).optional(),
    telecom: array(contactPointSchema).optional(),
    gender: optional(administrativeGenderSchema).withPrimitive(),
    birthDate: optional(dateSchema).withPrimitive(),
    // Choice type helper
    deceased: choice({
      deceasedBoolean: optional(booleanSchema).withPrimitive(),
      deceasedDateTime: optional(dateTimeSchema).withPrimitive(),
    }),
    // Backbone element helper
    contact: array(
      backbone({
        relationship: array(codeableConceptSchema).optional(),
        name: optional(humanNameSchema),
        telecom: array(contactPointSchema).optional(),
        address: optional(addressSchema),
        gender: optional(administrativeGenderSchema).withPrimitive(),
        organization: optional(referenceSchema),
        period: optional(periodSchema),
      })
    ).optional(),
  },
})
```

---

## Appendix B: Tools and Resources

### Approach 1 Tools
- **ts-to-zod**: https://github.com/fabien0102/ts-to-zod
- **typescript-json-schema**: https://github.com/YousefED/typescript-json-schema
- **@types/fhir**: https://www.npmjs.com/package/@types/fhir

### Approach 2 Resources
- **FHIR R4B Definitions**: http://hl7.org/fhir/R4B/definitions.json.zip
- **StructureDefinition Docs**: http://hl7.org/fhir/R4B/structuredefinition.html
- **FHIR JSON Format**: http://hl7.org/fhir/R4B/json.html

### Approach 3 Inspirations
- **Drizzle ORM**: Schema builder patterns
- **Zod Extensions**: https://github.com/colinhacks/zod#writing-generic-functions
- **Type-safe Builders**: https://www.typescriptlang.org/docs/handbook/2/generics.html

---

*Document Version: 1.0*  
*Last Updated: 2025-10-31*  
*Author: Spezi Firebase Team*
