const gradeToApprove = 3;

const calculateGrades = (requirements, results) => requirements.reduce(
  (acc, requirement) => {
    const result = results.evaluations.find(
      (evaluation) => evaluation.description === requirement.description
    );
    if (!result) return acc;
    if (requirement.bonus) {
      acc.bonusTotal++;
    if (result.grade >= gradeToApprove) acc.bonusGrade++;
      return acc;
    }
    acc.requiredTotal++;
    if (result.grade >= gradeToApprove) acc.requiredGrade++;
      return acc;
    },
    { requiredGrade: 0, bonusGrade: 0, requiredTotal: 0, bonusTotal: 0 }
);

const calculatePercentages = (grades) => ({
  required: ((grades.requiredGrade / grades.requiredTotal) * 100).toFixed(2),
  total: (((grades.requiredGrade + grades.bonusGrade) / (grades.requiredTotal + grades.bonusTotal)) *100).toFixed(2),
});

const generateRequirementsTable = (requirements, results) => requirements.reduce((acc, requirement) => {
  const result = results.evaluations.find(
    (evaluation) => evaluation.description === requirement.description
  );
  const description = requirement.description;
  const grade = result && result.grade ? result.grade : 0;

  const resultEmoji = grade >= gradeToApprove ? ':heavy_check_mark:' : ':heavy_multiplication_x:';

  return `${acc}${description} | ${resultEmoji}\n`;}, ''
);


const generateComment = (percentages, requirementsTable) => `
  ### Resultado do projeto
  *Item* | |
  --- | :---:
  Percentual de cumprimento de requisitos obrigatórios | ${percentages.required}%
  Percentual de cumprimento de requisitos totais | ${percentages.total}%
  ### Resultado por requisito
  *Nome* | *Avaliação*
  --- | :---:
  ${requirementsTable}
`;

module.exports = {
  calculateGrades,
  calculatePercentages,
  generateRequirementsTable,
  generateComment
};