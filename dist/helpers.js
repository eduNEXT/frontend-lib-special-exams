"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldRenderExpiredPage = exports.isEmpty = exports.getDisplayName = exports.generateHumanizedTime = exports.appendTimerEnd = void 0;
var _constants = require("./constants");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
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

// The only information we get on the remaining time on the active exam attempt
// from the endpoint is the remaining seconds. We need to have a fixed time reference
// on the time limit to be able to calculate the remaining time accurately.
var appendTimerEnd = exports.appendTimerEnd = function appendTimerEnd(activeAttempt) {
  if (!(activeAttempt !== null && activeAttempt !== void 0 && activeAttempt.time_remaining_seconds)) {
    return activeAttempt;
  }
  var timerEnds = new Date(Date.now() + activeAttempt.time_remaining_seconds * 1000);
  var updatedActiveAttempt = _objectSpread(_objectSpread({}, activeAttempt), {}, {
    timer_ends: timerEnds.toISOString()
  });
  return updatedActiveAttempt;
};
//# sourceMappingURL=helpers.js.map