# LumiSDD Examples

**Project:** LUMISD-001  
**Version:** 1.0.0  
**Date:** 2026-03-01

---

## Overview

This directory contains practical examples demonstrating how to use **LumiSDD** (Lightweight Spec-Driven Development) framework. Each example is designed to showcase different aspects of specification-driven development.

---

## Available Examples

### 1. Hello Spec (`hello-spec/`)

A simple, beginner-friendly example demonstrating the basics of Spec-Driven Development.

**What it demonstrates:**
- Basic specification creation (YAML)
- JSON Schema definition
- Requirements and constraints
- TypeScript code generation

**Complexity:** Beginner ⭐

**Quick Start:**
```bash
cd examples/hello-spec
chmod +x generate.sh
./generate.sh
```

**Learn more:** [hello-spec/README.md](hello-spec/README.md)

---

### 2. User CRUD Service (`user-crud/`)

A real-world REST API service specification with complete CRUD operations.

**What it demonstrates:**
- Full API specification (OpenAPI-style)
- 7 requirements with acceptance criteria
- Security and validation constraints
- Complete data model with relationships

**Complexity:** Intermediate ⭐⭐

**What you'll learn:**
- How to specify a complete REST API
- How to define validation rules
- How to document security requirements

**Learn more:** [user-crud/README.md](user-crud/README.md)

---

### 3. End-to-End Workflow (`e2e-hello/`)

A complete demonstration of the full SDD workflow from specification to compliance.

**What it demonstrates:**
- Loading and validating specifications
- Generating TypeScript types from JSON Schema
- Generating implementation code
- Generating tests from requirements
- Running generated tests
- Creating compliance reports
- Building traceability matrices

**Complexity:** Advanced ⭐⭐⭐

**Quick Start:**
```bash
npm run example:e2e
```

**Learn more:** [e2e-hello/README.md](e2e-hello/README.md)

---

## How to Choose an Example

| Your Goal | Recommended Example |
|-----------|-------------------|
| Learn the basics | Hello Spec |
| Build a real API | User CRUD |
| See full workflow | E2E Workflow |

---

## Principles of Spec-Driven Development

### 1. Define First

Always create your specification **before** writing code. The spec is the source of truth.

```yaml
spec:
  id: MY-SERVICE-001
  name: MyService
  version: 1.0.0
```

### 2. Validate Automatically

Use JSON Schema or OpenAPI to automatically validate data:

```yaml
schema:
  type: object
  properties:
    email:
      type: string
      format: email
```

### 3. Generate Code

Let the framework generate types and validators from your spec:

```bash
npm run example:e2e
```

### 4. Track Compliance

Monitor requirement fulfillment with built-in tracking:

```typescript
const report = tracker.generateReport(specId);
console.log(report.compliancePercentage);
```

---

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# Clone the repository
git clone https://github.com/Xflofoxx/LumiSDD.git
cd LumiSDD

# Install dependencies
npm install

# Build the library
npm run build
```

### Running Examples

```bash
# Simple example
cd examples/hello-spec
./generate.sh

# E2E workflow
npm run example:e2e
```

---

## Architecture Overview

```
LumiSDD Framework
├── Core           # Spec, SpecRegistry
├── Validators    # JSON Schema, OpenAPI
├── Generators    # TypeScript, Markdown
├── Trackers      # Compliance tracking
└── PM2           # Project management
```

---

## Documentation

- [Main Documentation](../docs/)
- [Getting Started](../docs/getting-started.md)
- [PM² Resources](../docs/pm2/)
- [Quality Plan](../docs/Quality-Plan.md)

---

## Contributing

Contributions are welcome! Please read our [Contributing Guide](../CONTRIBUTING.md) and follow the [Code of Conduct](../CODE_OF_CONDUCT.md).

---

## License

MIT License - see [LICENSE](../LICENSE) for details.

---

## Support

- Open an [Issue](https://github.com/Xflofoxx/LumiSDD/issues)
- Read the [Documentation](../docs/)
- Check [PM² Resources](../docs/pm2/)

---

## Revision History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2026-03-01 | Initial examples |
