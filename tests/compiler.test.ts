import { Compiler } from '@/Compiler/Compiler'

describe('compiler tests', () => {
  test('should compile simple markdown', () => {
    const compiler = new Compiler()
    const source = `
# my typescript snippets

## \`ei\` - export interface

generates \`export interface ... {...}\`

\`\`\`typescript typescriptreact
/**
 * $2
 */
export interface $1 {
  $3
}

\`\`\`

## \`eii\` - export class that implemented a interface

generates \`export class ... implements ... {...}\`

\`\`\`typescript typescriptreact
/**
 * $3
 */
export class $1 implements $2 {
  $4
}

\`\`\`
`.trim()

    const result = compiler.compile(source)

    expect(result).toMatchObject({
      'export interface': {
        scope: 'typescript,typescriptreact',
        prefix: 'ei',
        body: ['/**', ' * $2', ' */', 'export interface $1 {', '  $3', '}', ''],
      },
      'export class that implemented a interface': {
        scope: 'typescript,typescriptreact',
        prefix: 'eii',
        body: [
          '/**',
          ' * $3',
          ' */',
          'export class $1 implements $2 {',
          '  $4',
          '}',
          '',
        ],
      },
    })
  })

  test('should compile omitted prefix and description', () => {
    const compiler = new Compiler()
    const source = `
## omitted prefix and description

\`\`\`
\`\`\`
`.trim()

    const result = compiler.compile(source)

    expect(result).toMatchObject({
      'omitted prefix and description': {
        prefix: 'omitted-prefix-and-description',
        description: 'omitted prefix and description',
        body: [''],
      },
    })
  })

  test('should compile snippet header that no spaces after the prefix', () => {
    const compiler = new Compiler()
    const source = `
## \`prefix\`test

\`\`\`
\`\`\`
`.trim()

    const result = compiler.compile(source)

    expect(result).toMatchObject({
      test: {
        prefix: 'prefix',
      },
    })
  })

  test('should compile snippet header that contains ` - ` after the prefix', () => {
    const compiler = new Compiler()
    const source = `
## \`prefix\` - test

\`\`\`
\`\`\`
`.trim()

    const result = compiler.compile(source)

    expect(result).toMatchObject({
      test: {
        prefix: 'prefix',
      },
    })
  })

  test('should trim space after prefix', () => {
    const compiler = new Compiler()
    const source = `
## \`prefix\` test

\`\`\`
\`\`\`
`.trim()

    const result = compiler.compile(source)

    expect(result).toMatchObject({
      test: {
        prefix: 'prefix',
      },
    })
  })

  test('should compile empty markdown', () => {
    const compiler = new Compiler()

    const result = compiler.compile('')

    expect(result).toMatchObject({})
  })

  test('should throw error when code is not provided', () => {
    const compiler = new Compiler()

    expect(() => {
      compiler.compile('## no code')
    }).toThrow()
  })
})
