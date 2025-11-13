#!/bin/bash

# FHIR Zod Schema Generator - Quick Start Script
# This script sets up and runs the schema generator

set -e

echo "🚀 FHIR Zod Schema Generator - Quick Start"
echo "=========================================="
echo ""

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed."
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Parse arguments
RESOURCE=""
OUTPUT_DIR="./generated"

while [[ $# -gt 0 ]]; do
    case $1 in
        --resource)
            RESOURCE="$2"
            shift 2
            ;;
        --output)
            OUTPUT_DIR="$2"
            shift 2
            ;;
        --help|-h)
            echo "Usage: ./quick-start.sh [options]"
            echo ""
            echo "Options:"
            echo "  --resource <name>   Generate schema for specific resource (e.g., Patient)"
            echo "  --output <dir>      Output directory (default: ./generated)"
            echo "  --help, -h          Show this help message"
            echo ""
            echo "Examples:"
            echo "  ./quick-start.sh                      # Generate all core resources"
            echo "  ./quick-start.sh --resource Patient   # Generate Patient only"
            echo "  ./quick-start.sh --output ./my-dir    # Custom output directory"
            exit 0
            ;;
        *)
            echo "❌ Unknown option: $1"
            echo "   Use --help for usage information"
            exit 1
            ;;
    esac
done

# Run the generator
echo "🔄 Running schema generator..."
echo ""

if [ -n "$RESOURCE" ]; then
    node generate-schemas.js --resource "$RESOURCE" --output "$OUTPUT_DIR"
else
    node generate-schemas.js --output "$OUTPUT_DIR"
fi

echo ""
echo "✨ Done! Check the output in: $OUTPUT_DIR/"
echo ""
echo "📖 Next steps:"
echo "   1. Review generated-schemas.ts"
echo "   2. Check example-usage.ts for usage patterns"
echo "   3. Test with your FHIR data"
echo ""
