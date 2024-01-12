import fs from "fs";
import path from "path";
import { exec, execSync } from "child_process";

const REPO_PATH = path.join(__dirname, "../github/workspace");

// const parseInputs = (env: NodeJS.ProcessEnv): [string[], string[]] | undefined => {
//   const sourceFiles = env.INPUT_SOURCE_FILES;
//   const output = env.INPUT_OUTPUT;
//   if (!sourceFiles) {
//     core.setFailed("input: 'source_files' is required!")
//     return undefined;
//   }
//   const sourcePaths: string[] = sourceFiles.trim().split(" ").map(p => p.trim());
//   for (const p of sourcePaths) {
//     if (p.split(".").at(-1) !== "typ") {
//       core.setFailed("input: 'source_files' must be '.typ' files!")
//       return undefined;
//     }
//   }

//   for (const p of sourcePaths) {
//     const fullPath = path.join(REPO_PATH, p);
//     if (!fs.existsSync(fullPath)) {
//       core.setFailed(`file: '${p}' does not exist!`)
//       return undefined;
//     }
//   }
  
//   let outputPaths: string[];
//   if (!output) {
//     outputPaths = sourcePaths.map(p => {
//       let temp = p.split(".");
//       temp[temp.length - 1] = "pdf"
//       return temp.join(".");
//     })
//   } else {
//     outputPaths = output.trim().split(" ").map(p => p.trim());
//     if (outputPaths.length !== sourcePaths.length) {
//       core.setFailed("Number of output paths must match source files!")
//       return undefined;
//     }
//   }

//   return [sourcePaths, outputPaths]
// }

(() => {
  try {
    console.log("Hello world!");
    // console.log(process.env);
    const PATH = path.join(__dirname, "../repo")
    // console.log(fs.readdirSync(path.join(__dirname, "../repo")));
    const file1 = path.join(PATH, "./testing/file1.typ")
    const output = path.join(PATH, "output.pdf")
    try {
      console.log("TYPST COMPILE RUN");
      execSync(`typst compile ${file1} ${output}`)
      console.log("TYPST COMPILE COMPLETE");
      console.log(fs.readdirSync(PATH));
    } catch (error) {
      console.log("ERROR:", error);
    }
    // throw new Error("Test error!")
    // const parsed = parseInputs(process.env);
    // if (!parsed) return;
    // const [sourcePaths, outputPaths] = parsed;
    // for (let i = 0; i < sourcePaths.length; i++) {
    //   const sp = sourcePaths[i];
    //   const op = outputPaths[i];
    //   try {
    //     const stdout = execSync(`typst compile ${sp} ${op}`)
    //     console.log(`stdout: ${stdout}`);
    //   } catch (error) {
    //     core.setFailed(`Typst failed with: ${error}`);
    //   }
    // }
  } catch (error) {
    console.log("ERROR:", error);
    // core.setFailed(`Action failed with error: ${error}`);
  }
})()
