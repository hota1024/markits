import { Snippets } from '@/types/Snippets'

/**
 * Compilable interface.
 */
export interface Compilable {
  /**
   * compiles markdown to vscode snippets.
   *
   * @param source markdown string.
   */
  compile(source: string): Snippets
}
