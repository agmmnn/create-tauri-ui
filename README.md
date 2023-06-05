![](https://i.imgur.com/ONV0z45.png)

# create-tauri-ui

Create [Tauri UI](https://github.com/agmmnn/tauri-ui) in a few steps.

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
yarn create tauri-ui my-tauri-app --template next

# pnpm
pnpm create tauri-ui my-tauri-app --template sveltekit
```

Currently supported template presets include:

- [`Vite + React`](https://github.com/agmmnn/create-tauri-ui/tree/master/templates/vite)
- [`Next.js`](https://github.com/agmmnn/tauri-ui/)
- [`SvelteKit`](https://github.com/agmmnn/create-tauri-ui/tree/master/templates/sveltekit) ([@huntabyte/shadcn-svelte](https://github.com/huntabyte/shadcn-svelte))

You can use `.` for the project name to scaffold in the current directory.

## Acknowledgements

This project utilizes code from the following repository:

- [vitejs/create-vite](https://github.com/vitejs/vite/blob/main/packages/create-vite)
