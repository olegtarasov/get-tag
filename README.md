# Get tag name

This action gets tag name from commit that triggered the action and puts it into an environment variable GIT_TAG_NAME.  It will also export is as an output named "tag".

You can also use optional parameters `tagRegex` and `tagRegexGroup` to extract a part from tag string.

## Usage

Dead simple:

```yaml
    steps:
      - uses: olegtarasov/get-tag@v2.1
        id: tagName
        with:
          tagRegex: "foobar-(.*)"  # Optional. Returns specified group text as tag name. Full tag string is returned if regex is not defined.
          tagRegexGroup: 1 # Optional. Default is 1.
      - name: Some other step # Output usage example
        with:
          tagname: ${{ steps.tagName.outputs.tag }}
      - name: Yet another step # Environment variabl usage example
        run: |
          docker build . --file Dockerfile --tag docker.pkg.github.com/someimage:$GIT_TAG_NAME

```

You can also use named regex groups (thanks to PR from @jelgblad):

```yaml
    steps:
      - uses: olegtarasov/get-tag@v2.1
        id: tagName
        with:
          tagRegex: "(?<package>.*)-(?<version>.*)" 
      - name: Some other step # Output usage example
        with:
          dirname: ${{ steps.tagName.outputs.package }}
          tagname: ${{ steps.tagName.outputs.version }}
```