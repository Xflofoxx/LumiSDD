# LumiSDD Agent Instructions

## Project Overview

LumiSDD is a lightweight Spec Driven Development (SDD) framework designed for modern software engineering. It provides tools for managing specifications, validating schemas, generating code, and tracking compliance.

## Philosophy

- **Lightweight** - Minimal dependencies, easy to integrate
- **Type-safe** - Full TypeScript support with strict typing
- **Extensible** - Easy to add new validators, generators, and trackers
- **Standards-compliant** - Supports JSON Schema, OpenAPI, and custom specs

## Architecture

### Core Modules

1. **Core** (`src/core/`)
   - `Spec` - Specification class with requirements and constraints
   - `SpecRegistry` - Registry for managing multiple specs

2. **Validators** (`src/validators/`)
   - `SpecValidator` - Base validator using Ajv
   - `JsonSchemaValidator` - JSON Schema validation
   - `OpenApiValidator` - OpenAPI specification validation

3. **Generators** (`src/generators/`)
   - `CodeGenerator` - Base class for code generation
   - `TypeScriptGenerator` - TypeScript type definitions
   - `MarkdownGenerator` - Markdown documentation

4. **Trackers** (`src/trackers/`)
   - `ComplianceTracker` - Track requirement compliance over time

## Development Guidelines

### TypeScript Standards
- Use strict TypeScript with explicit types
- Prefer interfaces over types for extensibility
- Use readonly for immutable data structures

### Testing
- All new features must include tests
- Run `npm test` before committing
- Maintain >80% code coverage

### Commit Messages
- Use conventional commits: `type(scope): description`
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

### Building
- Run `npm run build` before publishing
- Ensure both ESM and CJS outputs work

## Common Tasks

### Adding a New Validator
1. Extend `SpecValidator` class
2. Implement validation logic
3. Add exports to `src/validators/index.ts`

### Adding a New Generator
1. Extend `CodeGenerator` class
2. Implement `generate()` method
3. Add exports to `src/generators/index.ts`

### Running Tests
```bash
npm test           # Run tests once
npm run test:watch # Watch mode
```

### Building
```bash
npm run build      # Build for production
npm run dev        # Development with watch
```
