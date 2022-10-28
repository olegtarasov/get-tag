import * as github from '@actions/github'
import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const ref = github.context.ref
    const tagPath = 'refs/tags/'
    if (ref && ref.startsWith(tagPath)) {
      let tag = ref.substr(tagPath.length, ref.length)
      const regexStr = core.getInput('tagRegex')
      if (regexStr) {
        const regex = new RegExp(regexStr)
        const groupIdx = parseInt(core.getInput('tagRegexGroup') || '1')
        const result = regex.exec(tag)
        if (result && result.length > groupIdx) {
          tag = result[groupIdx]
        } else {
          core.warning(
            `Failed to match regex '${regexStr}' in tag string '${tag}'. Result is '${result}'`
          )
          return
        }

        // Return named groups on output
        if (result.groups) {
          for (const [key, value] of Object.entries(result.groups)) {
            core.setOutput(key, value)
          }
        }
      }
      core.exportVariable('GIT_TAG_NAME', tag)
      core.setOutput('tag', tag)
    }
  } catch (error) {
    let errorMessage = 'Unknown error'
    if (error instanceof Error) {
      errorMessage = error.message
    }
    core.setFailed(errorMessage)
  }
}

run()
