// https://github.com/vitejs/vite/blob/main/packages/create-vite/src/index.ts

import type { Framework } from "./type";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
// import spawn from "cross-spawn";
import minimist from "minimist";
import prompts from "prompts";
import toml from "@iarna/toml";
import yaml from "js-yaml";
import { blue, gray, lightGreen, red, reset } from "kolorist";

import {
  formatTargetDir,
  isEmpty,
  copy,
  copyDir,
  editFile,
  emptyDir,
  isValidPackageName,
  pkgFromUserAgent,
  toValidPackageName,
} from "./utils";

const argv = minimist<{
  t?: string;
  template?: string;
}>(process.argv.slice(2), { string: ["_"] });
const cwd = process.cwd();

const FRAMEWORKS: Framework[] = [
  { name: "vite", display: "Vite ⚡", color: blue },
  { name: "next", display: "Next.js ▲", color: lightGreen },
];
const TEMPLATES = FRAMEWORKS.map((f) => f.name);

const renameFiles: Record<string, string | undefined> = {
  _gitignore: ".gitignore",
};

const defaultTargetDir = "tauri-ui";

async function init() {
  const argTargetDir = formatTargetDir(argv._[0]);
  const argTemplate = argv.template || argv.t;

  let targetDir = argTargetDir || defaultTargetDir;
  const getProjectName = () =>
    targetDir === "." ? path.basename(path.resolve()) : targetDir;

  const result: prompts.Answers<
    "projectName" | "overwrite" | "packageName" | "framework"
  > = await prompts(
    [
      {
        type: argTargetDir ? null : "text",
        name: "projectName",
        message: reset("Project name:"),
        initial: defaultTargetDir,
        onState: (state) => {
          targetDir = formatTargetDir(state.value) || defaultTargetDir;
        },
      },
      {
        type: () =>
          !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "confirm",
        name: "overwrite",
        message: () =>
          (targetDir === "."
            ? "Current directory"
            : `Target directory "${targetDir}"`) +
          ` is not empty. Remove existing files and continue?`,
      },
      {
        type: (_, { overwrite }: { overwrite?: boolean }) => {
          if (overwrite === false) {
            throw new Error(red("✖") + " Operation cancelled");
          }
          return null;
        },
        name: "overwriteChecker",
      },
      {
        type: () => (isValidPackageName(getProjectName()) ? null : "text"),
        name: "packageName",
        message: reset("Package name:"),
        initial: () => toValidPackageName(getProjectName()),
        validate: (dir) =>
          isValidPackageName(dir) || "Invalid package.json name",
      },
      {
        type: argTemplate && TEMPLATES.includes(argTemplate) ? null : "select",
        name: "framework",
        message:
          typeof argTemplate === "string" && !TEMPLATES.includes(argTemplate)
            ? reset(
                `"${argTemplate}" isn't a valid template. Please choose from below: `
              )
            : reset("Select a framework:"),
        initial: 0,
        choices: FRAMEWORKS.map((framework) => {
          const frameworkColor = framework.color;
          return {
            title: frameworkColor(framework.display || framework.name),
            value: framework,
          };
        }),
      },
    ],

    {
      onCancel: () => {
        throw new Error(red("✖") + " Operation cancelled");
      },
    }
  );

  // user choice associated with prompts
  const { framework, overwrite, packageName } = result;

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  // determine template
  let template: string = framework?.name || argTemplate;

  const pkgInfo = pkgFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "npm";

  console.log(`\nScaffolding project in ${gray(root)}`);

  const templateDir = path.resolve(
    fileURLToPath(import.meta.url),
    "../../templates/",
    template
  );

  const write = (file: string, content?: string) => {
    const targetPath = path.join(root, renameFiles[file] ?? file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  };

  const files = fs.readdirSync(templateDir);
  for (const file of files.filter(
    (f) => f !== "package.json" || "tauri.conf.json" || "Cargo.toml"
  )) {
    write(file);
  }

  // edit files
  const pkg = JSON.parse(
    fs.readFileSync(path.join(templateDir, `package.json`), "utf-8")
  );
  pkg.name = packageName || getProjectName();
  write("package.json", JSON.stringify(pkg, null, 2) + "\n");

  const cargoToml: any = toml.parse(
    fs.readFileSync(path.join(templateDir, `/src-tauri/Cargo.toml`), "utf-8")
  );
  cargoToml.package.name = packageName || getProjectName();
  write("/src-tauri/Cargo.toml", toml.stringify(cargoToml) + "\n");

  const tauriConf = JSON.parse(
    fs.readFileSync(
      path.join(templateDir, `/src-tauri/tauri.conf.json`),
      "utf-8"
    )
  );
  tauriConf.tauri.windows[0].title = packageName || getProjectName();
  tauriConf.package.productName = packageName || getProjectName();
  write(
    "/src-tauri/tauri.conf.json",
    JSON.stringify(tauriConf, null, 2) + "\n"
  );
  //

  const cdProjectName = path.relative(cwd, root);
  console.log(`\nDone. Now run:`);
  if (root !== cwd) {
    console.log(
      `  cd ${
        cdProjectName.includes(" ") ? `"${cdProjectName}"` : cdProjectName
      }`
    );
  }
  switch (pkgManager) {
    case "yarn":
      console.log(`  yarn`);
      console.log(`  yarn tauri dev`);
      break;
    case "pnpm":
      console.log(`  pnpm i`);
      console.log(`  pnpm tauri dev`);
      break;
    default:
      console.log(`  ${pkgManager} install`);
      console.log(`  ${pkgManager} run tauri dev`);
      break;
  }
  console.log();
}

init().catch((e) => {
  console.error(e);
});
