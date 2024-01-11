import core from "@actions/core"
import github from "@actions/github";
import fs from "fs";
import path from "path";

const parseInputs = (env: NodeJS.ProcessEnv) => {
  const sourceFiles = env.INPUT_SOURCE_FILES;
  const output = env.INPUT_OUTPUT;
  if (!sourceFiles) {
    core.setFailed("input: 'source_files' is required!")
    return undefined;
  }
  const sourcePaths: string[] = sourceFiles.trim().split(" ").map(p => p.trim());
  for (const path of sourcePaths) {
    if (path.split(".").at(-1) !== "typ") {
      core.setFailed("input: 'source_files' must be '.typ' files!")
      return undefined;
    }
  }
  
  let outputPaths: string[];
  if (!output) {
    outputPaths = sourcePaths.map(p => p.split(".")[0] + ".pdf")
  } else {
    outputPaths = output.trim().split(" ").map(p => p.trim());
    if (outputPaths.length !== sourcePaths.length) {}
  }
}

try {
  console.log("Hello world!");
  console.log(process.env);
  console.log(fs.readdirSync(path.join(__dirname)));
} catch (error) {
  core.setFailed(`Action failed with error: ${error}`);
}