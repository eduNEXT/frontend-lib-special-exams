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
const SubmittedOnboardingExamInstructions = () => {
  const [isConfirm, confirm] = (0, _paragon.useToggle)(false);
  const {
    proctoringSettings
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    learner_notification_from_email: learnerNotificationFromEmail,
    integration_specific_email: integrationSpecificEmail
  } = proctoringSettings || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "h3",
      "data-testid": "exam-instructions-title",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedOnboardingExamInstructions.title",
        defaultMessage: "You have submitted this onboarding exam"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedProctoredExamInstructions.text1",
        defaultMessage: 'If you do not have an onboarding profile with the system, Verificient ' + 'will review your submission and create an onboarding profile to grant you access to ' + 'proctored exams. Onboarding profile review can take 2+ business days.'
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedProctoredExamInstructions.text2",
        defaultMessage: 'Once your profile has been reviewed, you will receive an email with ' + 'review results. The email will come from '
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.MailtoLink, {
        to: learnerNotificationFromEmail,
        children: learnerNotificationFromEmail
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedProctoredExamInstructions.text3",
        defaultMessage: ', so make sure this email has been added ' + 'to your inbox filter.'
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedProctoredExamInstructions.text4",
        defaultMessage: 'If you do not have an onboarding profile with the system, Verificient ' + 'will review your submission and create an onboarding profile to grant you access to ' + 'proctored exams. Onboarding profile review can take 2+ business days.'
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedProctoredExamInstructions.text5",
        defaultMessage: 'If you already have an onboarding profile approved through another course, ' + 'this submission will not be reviewed. You may retry this exam at any time to validate that ' + 'your setup still meets the requirements for proctoring.'
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "link",
        onClick: confirm,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.SubmittedProctoredExamInstructions.confirm",
          defaultMessage: "I understand and want to reset this onboarding exam."
        })
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      "data-testid": "retry-exam-button",
      variant: "primary",
      onClick: () => dispatch((0, _data.resetExam)()),
      disabled: !isConfirm,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.ErrorOnboardingExamInstructions.retryExamButton",
        defaultMessage: "Retry my exam"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
      className: "mt-4",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedProctoredExamInstructions.text6",
        defaultMessage: "Please contact "
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.MailtoLink, {
        to: integrationSpecificEmail,
        children: integrationSpecificEmail
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.SubmittedProctoredExamInstructions.text7",
        defaultMessage: " if you have questions."
      })]
    })]
  });
};
var _default = exports.default = SubmittedOnboardingExamInstructions;
//# sourceMappingURL=SubmittedOnboardingExamInstructions.js.map