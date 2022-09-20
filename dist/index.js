/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 724:
/***/ ((module) => {

module.exports = eval("require")("./.trybe/requirements.json");


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __nccwpck_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			__webpack_modules__[moduleId](module, module.exports, __nccwpck_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete __webpack_module_cache__[moduleId];
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__nccwpck_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat */
/******/ 	
/******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
// ESM COMPAT FLAG
__nccwpck_require__.r(__webpack_exports__);

;// CONCATENATED MODULE: ./helpers.js
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


const comment = (percentages, requirementsTable) => `
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
;// CONCATENATED MODULE: ./index.js


const buffer = new Buffer('${{ steps.evaluator.outputs.result }}', 'base64');
const results = JSON.parse(buffer.toString());
const { requirements } = __nccwpck_require__(724);

const grades = calculateGrades(requirements, results);

const requirementsTable = generateRequirementsTable(requirements, results)

const percentages = calculatePercentages(grades);

const index_comment = generateComment = (percentages, requirementsTable)

github.rest.issues.createComment({
  issue_number: context.payload.number,
  owner: context.payload.organization.login,
  repo: context.payload.repository.name,
  body: index_comment
});
})();

module.exports = __webpack_exports__;
/******/ })()
;