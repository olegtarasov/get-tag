import * as github from '@actions/github';
import * as core from '@actions/core';

async function run() {
  try {
    const ref = github.context.ref
    const tagPath = "refs/tags/"
    if (ref && ref.startsWith(tagPath)) {
      var tag = ref.substr(tagPath.length, ref.length);
      const regexStr = core.getInput("tagRegex")
      if (regexStr) {
        const regex = new RegExp(regexStr)
        const groupIdx = parseInt(core.getInput("tagRegexGroup") || "1")
        const result = regex.exec(tag);
        if (result && result.length > groupIdx) {
          tag = result[groupIdx]
        }
        else {
          core.warning(`Failed to match regex '${regexStr}' in tag string '${tag}'. Result is '${result}'`)
          return
        }
      }
      core.exportVariable("GIT_TAG_NAME", tag);
      core.setOutput('tag', tag);
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
