# HelloSpec E2E - End-to-End Example

**Project:** LUMISD-001  
**Version:** 1.0.0  
**Date:** 2026-03-01

---

## Overview

This example demonstrates a **complete Spec-Driven Development workflow** from specification to compliance tracking. It's the recommended starting point for understanding LumiSDD.

**What you'll see:**
- How to load and validate a specification
- How to generate TypeScript types from JSON Schema
- How to generate tests from requirements
- How to run tests
- How to generate compliance reports
- How to build traceability matrices

---

## Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- LumiSDD built (`npm run build`)

---

## Quick Start

```bash
# Build the library
npm run build

# Run the E2E example
npm run example:e2e
```

---

## Workflow Steps

This example executes the complete SDD workflow:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  1. Load Spec  │────▶│  2. Generate   │────▶│  3. Generate   │
│  (YAML)         │     │  Types          │     │  Tests          │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                                                        │
                        ┌─────────────────┐             │
                        │  6. Traceability│◀────────────┘
                        │  Matrix         │
                        └─────────────────┘
                              ▲
                        ┌─────────────────┐
                        │  5. Compliance │
                        │  Report         │
                        └─────────────────┘
```

### Step 1: Load Specification
Loads and validates the YAML specification file.

### Step 2: Generate TypeScript
Creates TypeScript interfaces from the JSON Schema.

### Step 3: Generate Tests
Creates Vitest test file based on requirements.

### Step 4: Run Tests
Executes the generated tests.

### Step 5: Generate Compliance Report
Creates a compliance report showing requirement status.

### Step 6: Update Traceability Matrix
Builds a traceability matrix linking requirements to code.

---

## Output Files

After running, you'll find in `examples/e2e-hello/output/`:

| File | Description |
|------|-------------|
| `types.ts` | Generated TypeScript interfaces |
| `implementation.ts` | Generated implementation |
| `tests.test.ts` | Generated test suite |
| `compliance-report.json` | Compliance report (JSON) |
| `compliance-report.md` | Compliance report (Markdown) |
| `traceability-matrix.json` | Traceability matrix (JSON) |
| `traceability-matrix.md` | Traceability matrix (Markdown) |

---

## Principles Demonstrated

1. **Define First** - All code generated from specification
2. **Validate Automatically** - Schema validation at runtime
3. **Generate Code** - Types and tests from requirements
4. **Track Compliance** - Real-time compliance reporting

---

## Learn More

- [Examples Hub](../README.md)
- [LumiSDD Documentation](../docs/getting-started.md)
- [PM² Resources](../docs/pm2/)
- [Quality Plan](../docs/Quality-Plan.md)
