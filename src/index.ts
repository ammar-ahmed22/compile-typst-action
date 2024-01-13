import fs from "fs";
import path from "path";
import * as core from "@actions/core"
import * as exec from "@actions/exec"
import * as github from "@actions/github"
import { execSync } from "child_process";

const PATH = path.join(__dirname, "../../github/workspace");

const setFailed = (message: string | Error) => {
  core.setFailed(message);
  process.exit(0);
}

const parseInputs = () => {
  let sourcePaths = core.getInput("source_paths");
  let outputPaths = core.getInput("output_paths", { required: false });
  let fontsPath = core.getInput("fonts_path", { required: false });

  if (!sourcePaths) {
    setFailed(`Argument: 'source_paths' is required!`)
  }
  let srcPaths = sourcePaths.trim().split(" ").map(s => s.trim());
  let outPaths = sourcePaths.trim().split(" ").map(s => s.trim());

  // Check if source paths exist in the repo
  for (const p of srcPaths) {
    if (!fs.existsSync(path.join(PATH, p))) {
      core.setFailed(`Provided source path: '${p}' does not exist in the repository!`)
    }
  }

  
}



(async () => {
  try {

    
    
    parseInputs();
    
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


  } catch (error) {
    console.log("ERROR:", error);
    // core.setFailed(`Action failed with error: ${error}`);
  }
})()
