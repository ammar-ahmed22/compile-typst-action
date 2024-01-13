import fs from "fs";
import path from "path";
import * as core from "@actions/core"
import * as exec from "@actions/exec"
import * as github from "@actions/github"
import { execSync } from "child_process";

const setFailed = (message: string | Error) => {
  core.setFailed(message);
  process.exit(0);
}

const parseInputs = () => {
  const sourcePaths = core.getInput("source_paths");
  const outputPaths = core.getInput("output_paths", { required: false });
  const fontsPath = core.getInput("fonts_path", { required: false });

  
}



(async () => {
  try {

    const PATH = path.join(__dirname, "../../github/workspace");
    
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
