<!--

This source file is part of the Stanford Biodesign Digital Health Spezi Firebase open-source project

SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)

SPDX-License-Identifier: MIT

-->

# Spezi Firebase Utils

[![Build and Test](https://github.com/StanfordSpezi/spezi-firebase/actions/workflows/build-and-test.yml/badge.svg)](https://github.com/StanfordSpezi/spezi-firebase/actions/workflows/build-and-test.yml)
[![codecov](https://codecov.io/gh/StanfordSpezi/spezi-firebase/graph/badge.svg)](https://codecov.io/gh/StanfordSpezi/spezi-firebase)

A collection of utility functions for Firebase projects, extracted from the Stanford ENGAGE-HF project. This package provides core utilities used by other Spezi Firebase packages.

## Installation

```bash
npm install @stanfordbdhg/spezi-firebase-utils
```

## Features

- **Schema Converters**: Type-safe data conversion with Zod
- **Localization**: Easily handle multi-language text with fallbacks
- **Array Helpers**: Functions for working with arrays (average, median, percentile, etc.)
- **Date Utilities**: Simple date manipulation functions
- **Lazy Loading**: Generic lazy initialization pattern

## Usage Examples

### Schema Converter

```typescript
import { SchemaConverter } from '@stanfordbdhg/spezi-firebase-utils'
import { z } from 'zod'

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  age: z.number().optional(),
})

const userConverter = new SchemaConverter({
  schema: userSchema,
  encode: (user) => ({
    name: user.name,
    email: user.email,
    age: user.age,
  }),
})
```

### Localized Text

```typescript
import { LocalizedText } from '@stanfordbdhg/spezi-firebase-utils'

const greeting = new LocalizedText({
  en: 'Hello',
  es: 'Hola',
  fr: 'Bonjour',
})

console.log(greeting.localize('fr')) // 'Bonjour'
console.log(greeting.localize('de', 'en')) // 'Hello' (fallback)
```

## License

This project is licensed under the MIT License. See [Licenses](https://github.com/StanfordSpezi/spezi-firebase/tree/main/LICENSES) for more information.

## Contributors

This project is developed as part of the Stanford Byers Center for Biodesign at Stanford University.
See [CONTRIBUTORS.md](https://github.com/StanfordSpezi/spezi-firebase/tree/main/CONTRIBUTORS.md) for a full list of all Spezi Firebase contributors.

![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-light.png#gh-light-mode-only)
![Stanford Byers Center for Biodesign Logo](https://raw.githubusercontent.com/StanfordBDHG/.github/main/assets/biodesign-footer-dark.png#gh-dark-mode-only)
