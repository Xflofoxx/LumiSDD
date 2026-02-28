import type { GeneratorOptions, GeneratedCode } from '../core/types.js';
import { Spec } from '../core/Spec.js';

export abstract class CodeGenerator {
  abstract language: string;

  abstract generate(spec: Spec, options?: GeneratorOptions): GeneratedCode | GeneratedCode[];

  protected escapeKeyword(name: string): string {
    const keywords = ['class', 'interface', 'type', 'enum', 'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'switch', 'case', 'break', 'continue', 'new', 'this', 'super', 'import', 'export', 'default', 'from', 'as', 'async', 'await', 'try', 'catch', 'finally', 'throw', 'void', 'null', 'undefined', 'true', 'false', 'typeof', 'instanceof', 'in', 'of'];
    if (keywords.includes(name.toLowerCase())) {
      return `${name}_`;
    }
    return name;
  }

  protected toPascalCase(str: string): string {
    return str.replace(/[-_\s](.)?/g, (_, c) => c ? c.toUpperCase() : '')
      .replace(/^(.)/, (c) => c.toUpperCase());
  }

  protected toCamelCase(str: string): string {
    const pascal = this.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  protected toKebabCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();
  }

  protected toSnakeCase(str: string): string {
    return str.replace(/([a-z])([A-Z])/g, '$1_$2')
      .replace(/[\s-]+/g, '_')
      .toLowerCase();
  }
}
