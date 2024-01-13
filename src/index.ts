import fs from "fs";
import path from "path";
import * as core from "@actions/core"
import * as exec from "@actions/exec"
import * as github from "@actions/github"
import { execSync } from "child_process";

const parseInputs = (sourcePaths: string, outputPaths: string, fontsPath: string) => {
  console.log({ sourcePaths, outputPaths, fontsPath });
}



(async () => {
  try {

    const PATH = path.join(__dirname, "../../github/workspace");
    
    const sourcePaths = core.getInput("source_paths");
    const outputPaths = core.getInput("output_paths", { required: false });
    const fontsPaths = core.getInput("fonts_path", { required: false });
    
    parseInputs(sourcePaths, outputPaths, fontsPaths);
    
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
