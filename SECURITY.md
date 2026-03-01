# Security Policy

<!--
  Author: Xflofoxx
  Date: 2026-03-01
  License: MIT
-->

## Supported Versions

We currently support the following versions of LumiSDD:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability within LumiSDD, please open an issue to github with tag "security". All security vulnerabilities will be promptly addressed.

Please include the following information:

- Type of vulnerability
- Full paths of source file(s) related to the vulnerability
- Location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit it

## Response Timeline

We aim to respond to vulnerability reports within 48 hours and provide a timeline for remediation:

- **Critical**: 24 hours to acknowledge, 7 days to fix
- **High**: 48 hours to acknowledge, 14 days to fix
- **Medium**: 72 hours to acknowledge, 30 days to fix
- **Low**: 1 week to acknowledge, 60 days to fix

## Security Best Practices

When using LumiSDD in your projects:

1. **Keep dependencies updated** - Regularly update to the latest version
2. **Validate inputs** - Always validate data before passing to validators
3. **Use strict schemas** - Enable strict mode for validators
4. **Audit regularly** - Run `npm audit` periodically

## Security Updates

We will publish security advisories on GitHub Security Advisories. Subscribe to the repository to receive notifications.

## Disclosure Policy

We follow a coordinated disclosure practice. Please give us reasonable time to address the vulnerability before public disclosure.

Thank you for helping keep LumiSDD and its users safe!
