import core from "@actions/core"
import github from "@actions/github"

try {
  console.log("Hello world!");
  console.log(process.env);
} catch (error) {
  core.setFailed(`Action failed with error: ${error}`);
}