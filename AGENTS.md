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

5. **PM² Integration** (`src/pm2/`)
   - `PM2Workflow` - PM² methodology workflow implementation
   - Types for PM² phases, roles, and deliverables

## PM² Project Management Integration

This project uses the **PM² Methodology** (European Commission) for project management. When working on this project, follow PM² principles:

### PM² Phases

1. **Initiating** - Define project charter, stakeholders, risks
2. **Planning** - Create handbook, work plan, schedule, budget
3. **Executing** - Implement deliverables, monitor progress
4. **Closing** - Deliver final outputs, document lessons learned

### PM² Roles

- **Project Owner (PO)** - Ultimate accountability
- **Business Manager (BM)** - Business side representative
- **Solution Provider (SP)** - Technical delivery
- **Project Manager (PM)** - Day-to-day management
- **Project Core Team (PCT)** - Deliver work

### Agent Behavior (PM² Mode)

When implementing features or fixing bugs, follow this workflow:

1. **Initiating Phase**
   - Create/update SPEC.md with clear requirements
   - Identify stakeholders and their interests
   - Document initial risks

2. **Planning Phase**
   - Break down into work packages and tasks
   - Create/update TODO list
   - Define acceptance criteria for each requirement

3. **Executing Phase**
   - Implement code following specifications
   - Write tests for new functionality
   - Update documentation

4. **Closing Phase**
   - Run full test suite
   - Update CHANGELOG.md
   - Create release tag (semver)
   - Update GitHub milestones

### GitHub Integration

Automatically maintain:

- **Issues** - For each requirement/task
- **Milestones** - For releases (v1.0.0, v1.1.0, etc.)
- **Tags** - Using semver (v{major}.{minor}.{patch})
- **Commits** - Conventional commits: `feat(core): add new feature`

### Spec Files

Maintain SPEC.md with:
- Clear feature description
- Requirements linked to GitHub issues
- Acceptance criteria
- Dependencies and blockers

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

### PM² Workflow
```typescript
import { PM2Workflow } from 'LumiSDD/pm2';

const workflow = PM2Workflow.create('LUMISD-001', 'LumiSDD');

workflow.createCharter({
  title: 'LumiSDD v2.0',
  description: 'Add PM² support',
  objectives: ['Implement PM² workflow', 'Add GitHub automation'],
  stakeholders: [{ id: '1', name: 'Xflofoxx', role: 'project_owner', organization: 'LumiSDD' }],
  startDate: '2026-03-01',
  endDate: '2026-06-30',
});

workflow.setPhase('planning');
const spec = workflow.getSpec();
```
