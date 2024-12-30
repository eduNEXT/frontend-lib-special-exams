"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _data = require("../../data");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var SubmittedPracticeExamInstructions = function SubmittedPracticeExamInstructions() {
  var dispatch = (0, _reactRedux.useDispatch)();
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "h3",
      "data-testid": "exam-instructions-title",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedOnboardingExamInstructions.title",
        defaultMessage: "You have submitted this practice proctored exam"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedProctoredExamInstructions.text1",
        defaultMessage: 'Practice exams do not affect your grade. You have ' + 'completed this practice exam and can continue with your course work.'
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      "data-testid": "retry-exam-button",
      variant: "primary",
      onClick: function onClick() {
        return dispatch((0, _data.resetExam)());
      },
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedPracticeExamInstructions.retryExamButton",
        defaultMessage: "Retry my exam"
      })
    })]
  });
};
var _default = exports["default"] = SubmittedPracticeExamInstructions;
//# sourceMappingURL=SubmittedPracticeExamInstructions.js.map