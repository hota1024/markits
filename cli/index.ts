import * as path from 'path'
import { pathExists, readFile, writeFile } from 'fs-extra'
import cac from 'cac'
import { Compiler } from '../dist/cjs/index'
import * as chalk from 'chalk'

const cli = cac('markits')

cli
  .command(
    '<input> <dest>',
    'Convert the markdown into a snippet json for vscode and output.'
  )
  .option(
    '--force-overwrite',
    'If this flag is specified, the output destination file will be forcibly overwritten.'
  )
  .option('-o', 'alias to --force-overwrite')
  .action(async (input, dest, options) => {
    const compiler = new Compiler()
    const cwd = process.cwd()
    const forceOverwrite = options.forceOverwrite ?? options.o ?? false

    const inputPath = path.resolve(cwd, input)
    const destPath = path.resolve(cwd, dest)

    if (!(await pathExists(inputPath))) {
      console.log(chalk.red`error: ` + `Could not resolve the path '${input}'.`)
      process.exit(1)
    }

    if (!forceOverwrite) {
      if (await pathExists(destPath)) {
        console.log(
          `${chalk.red`error:`} The file already exists in '${dest}'. please run the command again with the ${chalk.cyan`--force-overwrite`} option or the ${chalk.cyan`-o`} option.`
        )
        process.exit(1)
      }
    }

    const markdown = await readFile(path.resolve(cwd, input))
    const snippets = compiler.compile(markdown.toString())

    const json = JSON.stringify(snippets, null, 2)

    await writeFile(destPath, json)

    console.log(
      chalk.green`Successfully compiled ${chalk.cyan(
        Object.keys(snippets).length
      )} snippets to ${chalk.cyan`'${dest}'`}.`
    )
  })
cli.help()
cli.version('0.0.0')
cli.parse()
