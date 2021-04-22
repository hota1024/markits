/**
 * Snippet type.
 */
export type Snippet = {
  prefix: string | string[]
  body: string | string[]
  description: string
  scope?: string
}

/**
 * Snippets type.
 */
export type Snippets = Record<string, Snippet>
