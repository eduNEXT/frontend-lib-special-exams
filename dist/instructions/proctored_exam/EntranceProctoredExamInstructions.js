"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _context = _interopRequireDefault(require("../../context"));
var _SkipProctoredExamButton = _interopRequireDefault(require("./SkipProctoredExamButton"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var EntranceProctoredExamInstructions = function EntranceProctoredExamInstructions(_ref) {
  var skipProctoredExam = _ref.skipProctoredExam;
  var state = (0, _react.useContext)(_context["default"]);
  var exam = state.exam,
    createProctoredExamAttempt = state.createProctoredExamAttempt,
    allowProctoringOptOut = state.allowProctoringOptOut;
  var _ref2 = exam || {},
    attempt = _ref2.attempt;
  var _attempt$total_time = attempt.total_time,
    totalTime = _attempt$total_time === void 0 ? 0 : _attempt$total_time;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [attempt.attempt_ready_to_resume ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "h3",
        "data-testid": "proctored-exam-instructions-title",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.ReadyToResumeProctoredExamInstructions.title",
          defaultMessage: "Your exam is ready to be resumed."
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.ReadyToResumeProctoredExamInstructions.text",
          defaultMessage: "You will have {totalTime} to complete your exam.",
          values: {
            totalTime: totalTime
          }
        })
      })]
    }) : /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "h3",
      "data-testid": "proctored-exam-instructions-title",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.EntranceProctoredExamInstructions.title",
        defaultMessage: "This exam is proctored"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.EntranceProctoredExamInstructions.text1",
        defaultMessage: 'To be eligible for credit or the program credential associated with this course, ' + 'you must pass the proctoring review for this exam.'
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "mt-4 pl-md-4",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.EntranceProctoredExamInstructions.text2",
        defaultMessage: "You will be guided through steps to set up online proctoring software and verify your identity."
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "pl-md-4",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        "data-testid": "start-exam-button",
        variant: "primary",
        onClick: createProctoredExamAttempt,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.startExamInstructions.startExamButtonText",
          defaultMessage: "Continue to my proctored exam."
        })
      })
    }), allowProctoringOptOut && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SkipProctoredExamButton["default"], {
      handleClick: skipProctoredExam
    })]
  });
};
EntranceProctoredExamInstructions.propTypes = {
  skipProctoredExam: _propTypes["default"].func.isRequired
};
var _default = exports["default"] = EntranceProctoredExamInstructions;
//# sourceMappingURL=EntranceProctoredExamInstructions.js.map