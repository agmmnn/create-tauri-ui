![](https://i.imgur.com/Esdi7tr.png)

# create-tauri-ui

```bash
npx create-tauri-ui@latest

pnpm create tauri-ui

npm create tauri-ui@latest

yarn create tauri-ui
```

Then follow the prompts!

You can also directly specify the project name and the template you want to use via additional command line options. For example, to scaffold a Tauri-UI project, run:

```bash
# npm 7+, extra double-dash is needed:
npm create tauri-ui@latest my-tauri-app -- --template vite

# yarn
yarn create tauri-ui my-tauri-app --template vite

# pnpm
pnpm create tauri-ui my-tauri-app --template vite
```

Currently supported template presets include:

- `Vite`
- `Next.js`

You can use `.` for the project name to scaffold in the current directory.

## Acknowledgements

This project utilizes code from the following repository:

- [vitejs/create-vite](https://github.com/vitejs/vite/blob/main/packages/create-vite)
