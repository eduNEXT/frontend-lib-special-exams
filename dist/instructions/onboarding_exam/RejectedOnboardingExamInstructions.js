"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _data = require("../../data");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const RejectedOnboardingExamInstructions = () => {
  const {
    proctoringSettings
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    integration_specific_email: integrationSpecificEmail
  } = proctoringSettings || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "h3",
      "data-testid": "rejected-onboarding-title",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.RejectedOnboardingExamInstructions.title",
        defaultMessage: "Your onboarding session was reviewed, but did not pass all requirements"
      })
    }), integrationSpecificEmail && /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      "data-testid": "integration-email-contact",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.RejectedOnboardingExamInstructions.text1",
        defaultMessage: "Please contact "
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.MailtoLink, {
        to: integrationSpecificEmail,
        children: integrationSpecificEmail
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.RejectedOnboardingExamInstructions.text2",
        defaultMessage: " if you have questions. You may retake this onboarding exam by clicking \"Retry my exam\"."
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      "data-testid": "reset-exam-button",
      variant: "primary",
      onClick: () => dispatch((0, _data.resetExam)()),
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.RejectedOnboardingExamInstructions.resetExamButton",
        defaultMessage: "Retry my exam"
      })
    })]
  });
};
var _default = exports.default = RejectedOnboardingExamInstructions;
//# sourceMappingURL=RejectedOnboardingExamInstructions.js.map