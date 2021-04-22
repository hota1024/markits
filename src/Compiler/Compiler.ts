import marked from 'marked'
import { paramCase } from 'change-case'
import { Snippets } from '@/types/Snippets'
import { Compilable } from './Compilable'

/**
 * Compiler class.
 */
export class Compiler implements Compilable {
  compile(source: string): Snippets {
    const tokens = this.parse(source)
    const snippets: Snippets = {}

    for (let i = 0; i < tokens.length; ++i) {
      const token = tokens[i]

      if (token.type === 'heading' && token.depth === 2) {
        const header = this.parseHeader(token)
        let next = tokens[++i]

        if (typeof next === 'undefined') {
          throw this.makeUnexpectedError(['paragraph', 'code'], 'end of file')
        }

        let description = ''
        while (typeof next !== 'undefined' && next.type === 'paragraph') {
          description += next.text

          next = tokens[++i]
        }

        if (typeof next === 'undefined') {
          throw this.makeUnexpectedError('code', 'end of file')
        }

        while (next.type === 'space') {
          next = tokens[++i]
        }

        if (next.type !== 'code') {
          throw this.makeUnexpectedError('code', next.type)
        }

        snippets[header.name] = {
          prefix: header.prefix ?? paramCase(header.name),
          description: description || header.name,
          body: next.text.split('\n'),
          ...(next.lang
            ? {
                scope: next.lang.replace(/ /g, ','),
              }
            : {}),
        }
      }
    }

    return snippets
  }

  private parse(markdown: string) {
    const tokens = marked.lexer(markdown)

    return tokens
  }

  private getTokenChildren(token: marked.Token): marked.Token[] {
    const { tokens } = token as { tokens: marked.Token[] }

    if (typeof tokens === 'undefined') {
      throw new TypeError(`the passed token has not tokens.`)
    }

    return tokens
  }

  private parseHeader(
    header: marked.Tokens.Heading
  ): { prefix?: string; name: string } {
    const tokens = this.getTokenChildren(header)

    const first = tokens[0]

    if (first.type === 'text') {
      return {
        name: first.text,
      }
    }

    if (first.type === 'codespan') {
      const prefix = first.text

      const second = tokens[1]

      if (second.type !== 'text') {
        throw this.makeUnexpectedError('text', second.type)
      }

      const name = second.text.startsWith(' - ')
        ? second.text.slice(3)
        : second.text[0] === ' '
        ? second.text.slice(1)
        : second.text

      return {
        name,
        prefix,
      }
    }

    throw this.makeUnexpectedError('text', first.type)
  }

  private makeUnexpectedError(
    expect: marked.Token['type'] | marked.Token['type'][],
    got: string
  ) {
    if (typeof expect === 'string') {
      return new Error(`expect '${expect}', but got '${got}'`)
    }

    return new Error(
      `expect ${expect.map((s) => `'${s}'`).join(' or ')}, but got '${got}'`
    )
  }
}
