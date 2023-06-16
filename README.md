# Vue 3 + TypeScript + Vite

## Install

```bash
npm install
```

## Running

Start the compilers to watch for changes and re-generate
the extension dist/ bundle:

```bash
npm run dev
```

Open a new Chrome tab with the extension loaded:

### Mac (osx)

```bash
open --new -a "Google Chrome" --args --user-data-dir=tmp --load-extension=/Users/matthewdavis/workspace/lisaapp/extension/dist --data-path=./tmp --no-first-run --auto-open-devtools-for-tabs --remote-debugging-port=9222 https://google.com
```

### Windows

```bash
&'C:\Program Files (x86)\Google\Chrome\Application\chrome.exe' --args --load-extension='C:\Users\Zaid Ahmed\Desktop\Lisa_project\browser-extension-chrome\dist' --user-data-dir='C:\Users\Zaid Ahmed\Desktop\Lisa_project\tmp' --no-first-run --auto-open-devtools-for-tabs --remote-debugging-port=9222 https://google.com
```