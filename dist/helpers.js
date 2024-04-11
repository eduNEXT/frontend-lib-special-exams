"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldRenderExpiredPage = exports.isEmpty = exports.getDisplayName = exports.generateHumanizedTime = void 0;
var _constants = require("./constants");
var isEmpty = exports.isEmpty = function isEmpty(obj) {
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0;
};
var getDisplayName = exports.getDisplayName = function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
var shouldRenderExpiredPage = exports.shouldRenderExpiredPage = function shouldRenderExpiredPage(exam) {
  var examType = exam.type,
    passedDueDate = exam.passed_due_date,
    attempt = exam.attempt;
  if (!passedDueDate || examType === _constants.ExamType.PRACTICE) {
    return false;
  }
  return isEmpty(attempt) || !attempt.attempt_id || (0, _constants.IS_INCOMPLETE_STATUS)(attempt.attempt_status);
};
var generateHumanizedTime = exports.generateHumanizedTime = function generateHumanizedTime(timeRemainingSeconds) {
  var hours = 0;
  var minutes = 0;
  var remainingTime = '';
  hours = Math.floor(timeRemainingSeconds / 60 / 60);
  minutes = Math.floor(timeRemainingSeconds / 60) % 60;
  if (hours !== 0) {
    remainingTime += "".concat(hours, " hour");
    if (hours >= 2) {
      remainingTime += 's';
    }
    remainingTime += ' and ';
  }
  remainingTime += "".concat(minutes, " minute");
  if (minutes !== 1) {
    remainingTime += 's';
  }
  return remainingTime;
};
//# sourceMappingURL=helpers.js.map