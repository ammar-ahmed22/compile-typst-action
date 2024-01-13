import fs from "fs";
import path from "path";
import * as core from "@actions/core"
import { execSync } from "child_process";

const PATH = path.join(__dirname, "../../github/workspace");

const setFailed = (message: string | Error) => {
  core.setFailed(message);
  process.exit(1);
}

const parseInputs = (): [string[], string[], string | undefined] => {
  let sourcePaths = core.getInput("source_paths");
  let outputPaths = core.getInput("output_paths", { required: false });
  let fontsPath = core.getInput("fonts_path", { required: false });

  if (!sourcePaths) {
    setFailed(`Argument: 'source_paths' is required!`)
  }
  let srcPaths = sourcePaths.trim().split(" ").map(s => s.trim());
  let outPaths = outputPaths.trim().split(" ").map(s => s.trim());

  // Check if source paths exist in the repo
  for (const p of srcPaths) {
    if (!fs.existsSync(path.join(PATH, p))) {
      setFailed(`Provided source path: '${p}' does not exist in the repository!`)
    }
  }

  if (outputPaths !== "") {
    if (srcPaths.length !== outPaths.length) {
      setFailed(`Argument: 'output_paths' must have the same number of paths as Argument: 'source_paths'`)
    }
  } else {
    outPaths = srcPaths.map(p => {
      let temp = p.split(".");
      temp[temp.length - 1] = "pdf";
      return temp.join(".");
    })
  }

  srcPaths = srcPaths.map(p => path.join(PATH, p));
  outPaths = outPaths.map(p => path.join(PATH, p));

  let fp;
  if (fontsPath !== "") {
    // Check if fonts path exists
    if (!fs.existsSync(path.join(PATH, fontsPath))) {
      setFailed(`Argument: 'fonts_path' does not exist in the repository!`)
    } else {
      fp = path.join(PATH, fontsPath);
    }
  }

  return [srcPaths, outPaths, fp];
}



(async () => {
  try {
    const [source, outputs, fontsPath] = parseInputs();

    for (let i = 0; i < source.length; i++) {
      const src = source[i];
      const out = outputs[i];
      let cmd = "typst compile ";
      if (fontsPath) {
        cmd += `--font-path ${fontsPath} `
      }
      cmd += `${src} ${out}`
      const res = execSync(cmd);
      console.log(res.toString());
    }
    // Check if outputs were created
    for (let out of outputs) {
      if (!fs.existsSync(out)) core.setFailed("Some files were not created! Check logs.")
    }
    console.log("All files generated!");

  } catch (error) {
   setFailed(error as Error)
  }
})()
