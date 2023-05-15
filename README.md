# Vue 3 + TypeScript + Vite

## Install

```bash
npm install
```

## Running

Start the compilers to watch for changes and re-generate
the extension dist/ bundle:

```bash
nodemon
```

Open a new Chrome tab with the extension loaded:

```bash
open --new -a "Google Chrome" --args --user-data-dir=tmp --load-extension=/Users/matthewdavis/workspace/lisaapp/extension/dist --data-path=./tmp --no-first-run --auto-open-devtools-for-tabs --remote-debugging-port=9222 https://google.com
```
