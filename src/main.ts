import * as github from '@actions/github';
import * as core from '@actions/core';

async function run() {
  try {
    const ref = github.context.ref
    const tagPath = "refs/tags/"
    if (ref && ref.startsWith(tagPath)) {
      core.exportVariable("GITHUB_TAG_NAME", ref.substr(tagPath.length, ref.length))
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
