//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University and the project authors (see CONTRIBUTORS.md)
//
// SPDX-License-Identifier: MIT
//

const {
  getEslintNodeConfig,
} = require("@stanfordspezi/spezi-web-configurations");

module.exports = [
  ...getEslintNodeConfig({ tsconfigRootDir: __dirname }),
  {
    ignores: [
      "**/lib/**",
      "**/jest.config.js",
      "**/jest.setup.js",
      "**/examples/**",
    ],
  },
];
