# Requirements Evaluation Table Action

A Github action that evaluates the requirements and comments the result table on the pull request.

## Development

⚠️ Github actions will run `dist/index.js` to execute this action, so you *must run* `npm run pack` and commit the changes made at `dist/index.js` if you want to apply any changes. ⚠️

Install the dependencies
```bash
$ npm install
```

## Package for distribution

GitHub Actions will run the entry point from the `action.yml`. Packaging assembles the code into one file that can be checked in to Git, enabling fast and reliable execution and preventing the need to check in node_modules.

Actions are run from GitHub repos. Packaging the action will create a packaged action in the dist folder.

Run package

```bash
npm run pack
```

Since the packaged `index.js` is run from the dist folder.

```bash
git add dist
```

## Inputs

This action accepts the following configuration parameters via `with:`

### `evaluation-data`
  
**Required**

JSON with structure below in the base64 format:

```json
{
  "github_username": "String",
  "github_repository_name": "String",
  "evaluations": [{
    "description": "String",
    "grade": "Integer"
  }, {...}]
}
```

### `token`

**Required**

The GitHub token to use for making API requests.

### `pr_number`

**Required**

Pull Request number that dispatched the workflow.

## Usage

- Basic:

  ```yaml
  steps:
    - uses: actions/setup-node@v1.4.4
      with:
        node-version: "16"

    - name: Create feedback comment
      uses: ./.github/actions/requirements-evaluation-table-action
      with:
        evaluation-data: ${{ steps.evaluator.outputs.result }}
        pr_number: ${{ github.event.pull_request.number }}
        token: ${{ secrets.GITHUB_TOKEN }}
  ```

- Using conditionally on a template repository:
  
  ```yaml
  # first, create an env var with template name
  env:
    template_name: betrybe/sd-0x-project-project-name

  steps:
    - uses: actions/setup-node@v1.4.4
      with:
        node-version: "16"

    - name: Create feedback comment
      # use env var to define if this step should run
      if: ${{ github.repository == env.template_name }}
      uses: ./.github/actions/requirements-evaluation-table-action
      with:
        evaluation-data: ${{ steps.evaluator.outputs.result }}
        pr_number: ${{ github.event.pull_request.number }}
        token: ${{ secrets.GITHUB_TOKEN }}
  ```  


## Checking latest version

Check the latest version to use [here](https://github.com/betrybe/requirements-evaluation-table-action/releases).

