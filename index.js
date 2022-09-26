const core = require('@actions/core');
const github = require('@actions/github');
const helper = require("./helpers");
const { requirements } = require('../../../../.trybe/requirements.json');

const evaluationData = core.getInput('evaluation-data', { required: true });
const buffer = new Buffer(evaluationData, "base64");
const results = JSON.parse(buffer.toString());

const grades = helper.calculateGrades(requirements, results);

const requirementsTable = helper.generateRequirementsTable(requirements, results)

const percentages = helper.calculatePercentages(grades);

const comment = helper.generateComment(percentages, requirementsTable)

const token = core.getInput('token', { required: true });
const client = github.getOctokit(token);
const { owner, repo } = github.context.issue;

async function createComment() {
  await client.issues.createComment({
    owner,
    repo,
    issue_number: process.env.INPUT_PR_NUMBER,
    body: comment,
  });
}

createComment();
