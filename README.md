# Get tag name

This simple action gets tag name from commit that triggered the action and puts it into an environment variable GITHUB_TAG_NAME.  It will also export is as an output
named "tag".

## Usage

Dead simple:

```yaml
    steps:
      - uses: olegtarasov/get-tag@v1
```
