![markits-screen](https://user-images.githubusercontent.com/24543982/115786547-ee982800-a3fb-11eb-93ab-4a1fe7858198.png)

<h1 align="center">markits</h1>
<h3 align="center">generate vscode snippets from markdown.</h3>

## 🟦  Compile markdown to vscode snippets json

markits compiles markdown into a snippet file for vscode.
This allows for concise snippet management with markdown.

![markits-compile-image](https://user-images.githubusercontent.com/24543982/115788403-872fa780-a3fe-11eb-8397-0687d86cc59e.png)

## 🚀 Getting started

### Install markits

```shell
yarn global add markits
# or
npm install -g markits
```

### Compile markdown to snippets

Prepare a markdown file like the following.

```markdown
# my typescript snippets

## `ei` - export a interface

generates `export interface ... {...}`.

\```typescript typescriptreact
export interface $1 {
  $2
}
\```

## `eci` - export a class that implemented a interface

generates `export class ... implements ... {...}`

\```typescript typescriptreact
export class $1 implements $2 {
  $3
}
\```
```

Then run the following command to generate the snippet file.

```shell
markits snippets.md snippets.json -o
```

Finally, move the generated snippet file to the vscode snippet folder(ex: `/Code/User/snippets/snippets.json`).

## 📁 Syntax

### Snippet name (**required**)

```markdown
## <snippet-name>
```

### Snippet name with prefix (**required**)

```markdown
## `<prefix>` <snippet-name>
```

or

```markdown
## `<prefix>` - <snippet-name>
```

### Snippet description

```markdown
<snippet-description>
```

### Snippet body

```
\```<scope0>[,<scope1>[,<scope2>[,...]]]
<snippet-body>
\```
```

## ⚒️ API

markits provides an API for the compiler.

### Installation

```shell
yarn add markits
# or
npm install markits
```

### Usage

```typescript
import { Compiler } from 'markits'

const compiler = new Compiler()
const snippets = compiler.compile(markdown)

console.log(JSON.stringify(snippets, null, 2))
```

## 💬 LICENSE

```plain
MIT License

Copyright (c) 2021 ほた

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
