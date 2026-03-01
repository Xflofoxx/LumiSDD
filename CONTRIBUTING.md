# Contributing to LumiSDD

<!--
  Author: Xflofoxx
  Date: 2026-03-01
  License: MIT
-->

Thank you for your interest in contributing to LumiSDD!

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Development Setup

```bash
# Clone the repository
git clone https://github.com/Xflofoxx/LumiSDD.git
cd LumiSDD

# Install dependencies
npm install

# Run tests
npm test

# Build the project
npm run build

# Run typecheck
npm run typecheck

# Run lint
npm run lint
```

## Running Examples

### Hello Spec Example

```bash
cd examples/hello-spec
npm install
# Run the generator
./generate.sh
```

### Generating Specifications

```bash
# Generate TypeScript types from a spec
npx ts-node scripts/generate.ts examples/hello-spec/spec.yaml

# Generate Markdown documentation
npx ts-node scripts/generate.ts examples/hello-spec/spec.yaml --format markdown
```

## PM² Workflow

This project follows the PM² methodology. When contributing:

1. **Initiating**: Define requirements in SPEC.md with REQ-XXX IDs
2. **Planning**: Break down into tasks with acceptance criteria
3. **Executing**: Implement code, write tests
4. **Closing**: Ensure all tests pass, update changelog

## Commit Messages

We use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(core): add new feature
fix(validator): resolve validation issue
docs: update documentation
ci: add github actions workflow
refactor: improve code structure
test: add new tests
chore: update dependencies
```

## Pull Request Process

1. Create a feature branch: `feature/your-feature`
2. Make your changes
3. Ensure all tests pass: `npm test`
4. Run typecheck: `npm run typecheck`
5. Run lint: `npm run lint`
6. Update documentation if needed
7. Submit a Pull Request

## PM² Artefacts

When working on PM² deliverables:

- Use templates in `docs/pm2/`
- Document in `SPEC.md`
- Track requirements with REQ-XXX IDs
- Link PRs to requirements

## Code Style

- Use TypeScript strict mode
- Prefer interfaces over types
- Use readonly for immutable data
- Add JSDoc comments for public APIs

## Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run with coverage
npm test -- --coverage
```

## Building for Release

```bash
npm run build
```

This generates:
- ESM modules in `dist/`
- CJS modules in `dist/`
- Type declarations in `dist/`

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
