import { calculateGrades, calculatePercentages, generateRequirementsTable } from "./helpers";

const buffer = new Buffer('${{ steps.evaluator.outputs.result }}', 'base64');
const results = JSON.parse(buffer.toString());
const { requirements } = require('./.trybe/requirements.json');

const grades = calculateGrades(requirements, results);

const requirementsTable = generateRequirementsTable(requirements, results)

const percentages = calculatePercentages(grades);

const comment = generateComment = (percentages, requirementsTable)

github.rest.issues.createComment({
  issue_number: context.payload.number,
  owner: context.payload.organization.login,
  repo: context.payload.repository.name,
  body: comment
});