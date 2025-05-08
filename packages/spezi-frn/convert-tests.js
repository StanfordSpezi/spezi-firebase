#!/usr/bin/env node

//
// This source file is part of the Stanford Biodesign Digital Health Spezi Firebase Remote Notifications open-source project
//
// SPDX-FileCopyrightText: 2025 Stanford University
//
// SPDX-License-Identifier: MIT
//

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEST_DIR = path.join(__dirname, 'test')

async function findTestFiles(dir) {
  const allFiles = await fs.readdir(dir, { withFileTypes: true })
  
  const files = await Promise.all(
    allFiles.map(async (dirent) => {
      const res = path.resolve(dir, dirent.name)
      if (dirent.isDirectory()) {
        return findTestFiles(res)
      } else if (dirent.name.endsWith('.test.ts')) {
        return res
      }
      return []
    })
  )
  
  return files.flat()
}

function convertChaiToJest(content) {
  // Remove Chai import
  content = content.replace(/import\s+\{\s*expect\s*\}\s+from\s+['"]chai['"]/g, '')
  
  // Replace it() with test()
  content = content.replace(/\bit\(/g, 'test(')

  // Convert assertion syntax
  const transformations = [
    // Type assertions
    [/expect\((.*?)\)\.to\.be\.an\.instanceOf\((.*?)\)/g, 'expect($1).toBeInstanceOf($2)'],
    [/expect\((.*?)\)\.to\.be\.a\(['"]function['"]\)/g, 'expect(typeof $1).toBe("function")'],
    [/expect\((.*?)\)\.to\.be\.an\(['"]object['"]\)/g, 'expect($1).toBeObject()'],
    [/expect\((.*?)\)\.to\.be\.an\(['"]array['"]\)/g, 'expect(Array.isArray($1)).toBe(true)'],
    [/expect\((.*?)\)\.to\.be\.a\(['"]string['"]\)/g, 'expect(typeof $1).toBe("string")'],
    [/expect\((.*?)\)\.to\.be\.a\(['"]number['"]\)/g, 'expect(typeof $1).toBe("number")'],
    [/expect\((.*?)\)\.to\.be\.a\(['"]boolean['"]\)/g, 'expect(typeof $1).toBe("boolean")'],
    
    // Basic assertions
    [/expect\((.*?)\)\.to\.equal\((.*?)\)/g, 'expect($1).toBe($2)'],
    [/expect\((.*?)\)\.to\.be\.undefined/g, 'expect($1).toBeUndefined()'],
    [/expect\((.*?)\)\.to\.be\.null/g, 'expect($1).toBeNull()'],
    [/expect\((.*?)\)\.to\.be\.true/g, 'expect($1).toBe(true)'],
    [/expect\((.*?)\)\.to\.be\.false/g, 'expect($1).toBe(false)'],
    [/expect\((.*?)\)\.to\.not\.be\.undefined/g, 'expect($1).toBeDefined()'],
    
    // Deep equality
    [/expect\((.*?)\)\.to\.deep\.equal\((.*?)\)/g, 'expect($1).toEqual($2)'],
    [/expect\((.*?)\)\.to\.eql\((.*?)\)/g, 'expect($1).toEqual($2)'],
    
    // Length assertions
    [/expect\((.*?)\)\.to\.have\.lengthOf\((.*?)\)/g, 'expect($1).toHaveLength($2)'],
    
    // Property assertions
    [/expect\((.*?)\)\.to\.have\.property\(['"](.+?)['"](?:,\s*(.+))?\)/g, (match, obj, prop, value) => {
      if (value) {
        return `expect(${obj}).toHaveProperty("${prop}", ${value})`
      }
      return `expect(${obj}).toHaveProperty("${prop}")`
    }],
    
    // Include assertions
    [/expect\((.*?)\)\.to\.include\((.*?)\)/g, 'expect($1).toContain($2)'],
    [/expect\((.*?)\)\.to\.contain\((.*?)\)/g, 'expect($1).toContain($2)'],
    
    // Match assertions
    [/expect\((.*?)\)\.to\.match\((.*?)\)/g, 'expect($1).toMatch($2)'],
    
    // Throw assertions
    [/expect\(\(\) => (.*?)\)\.to\.throw\(\)/g, 'expect(() => $1).toThrow()'],
    [/expect\(\(\) => (.*?)\)\.to\.throw\((.*?)\)/g, 'expect(() => $1).toThrow($2)'],
    
    // Negations
    [/expect\((.*?)\)\.to\.not\./g, 'expect($1).not.']
  ]
  
  for (const [pattern, replacement] of transformations) {
    content = content.replace(pattern, replacement)
  }
  
  return content
}

async function convertFiles() {
  try {
    const testFiles = await findTestFiles(TEST_DIR)
    console.log(`Found ${testFiles.length} test files to convert`)
    
    for (const file of testFiles) {
      console.log(`Converting ${path.relative(__dirname, file)}`)
      
      const content = await fs.readFile(file, 'utf8')
      const convertedContent = convertChaiToJest(content)
      
      await fs.writeFile(file, convertedContent, 'utf8')
    }
    
    console.log('All test files converted successfully!')
  } catch (error) {
    console.error('Error converting test files:', error)
    process.exit(1)
  }
}

convertFiles()