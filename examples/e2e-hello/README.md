# HelloSpec E2E - End-to-End Example

This example demonstrates a complete LumiSDD workflow from specification to compliance tracking.

## Prerequisites

- Node.js 18+
- LumiSDD built (`npm run build`)

## Running the Example

```bash
npm run build
npm run example:e2e
```

## Workflow Steps

1. **Load Specification** - Loads and validates spec.yaml
2. **Generate TypeScript** - Creates type definitions from JSON Schema
3. **Generate Tests** - Creates Vitest test file from requirements
4. **Run Tests** - Executes generated tests
5. **Generate Compliance Report** - Creates compliance report from requirements
6. **Update Traceability** - Updates requirements traceability matrix
