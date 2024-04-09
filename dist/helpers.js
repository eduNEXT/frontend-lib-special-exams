"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldRenderExpiredPage = exports.isEmpty = exports.getDisplayName = exports.generateHumanizedTime = exports.appendTimerEnd = void 0;
var _constants = require("./constants");
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
const isEmpty = obj => {
  if (!obj) {
    return true;
  }
  return Object.keys(obj).length === 0;
};
exports.isEmpty = isEmpty;
const getDisplayName = WrappedComponent => WrappedComponent.displayName || WrappedComponent.name || 'Component';
exports.getDisplayName = getDisplayName;
const shouldRenderExpiredPage = exam => {
  const {
    type: examType,
    passed_due_date: passedDueDate,
    attempt
  } = exam;
  if (!passedDueDate || examType === _constants.ExamType.PRACTICE) {
    return false;
  }
  return isEmpty(attempt) || !attempt.attempt_id || (0, _constants.IS_INCOMPLETE_STATUS)(attempt.attempt_status);
};
exports.shouldRenderExpiredPage = shouldRenderExpiredPage;
const generateHumanizedTime = timeRemainingSeconds => {
  let hours = 0;
  let minutes = 0;
  let remainingTime = '';
  hours = Math.floor(timeRemainingSeconds / 60 / 60);
  minutes = Math.floor(timeRemainingSeconds / 60) % 60;
  if (hours !== 0) {
    remainingTime += `${hours} hour`;
    if (hours >= 2) {
      remainingTime += 's';
    }
    remainingTime += ' and ';
  }
  remainingTime += `${minutes} minute`;
  if (minutes !== 1) {
    remainingTime += 's';
  }
  return remainingTime;
};

// The only information we get on the remaining time on the active exam attempt
// from the endpoint is the remaining seconds. We need to have a fixed time reference
// on the time limit to be able to calculate the remaining time accurately.
exports.generateHumanizedTime = generateHumanizedTime;
const appendTimerEnd = activeAttempt => {
  if (!activeAttempt?.time_remaining_seconds) {
    return activeAttempt;
  }
  const timerEnds = new Date(Date.now() + activeAttempt.time_remaining_seconds * 1000);
  const updatedActiveAttempt = _objectSpread(_objectSpread({}, activeAttempt), {}, {
    timer_ends: timerEnds.toISOString()
  });
  return updatedActiveAttempt;
};
exports.appendTimerEnd = appendTimerEnd;
//# sourceMappingURL=helpers.js.map