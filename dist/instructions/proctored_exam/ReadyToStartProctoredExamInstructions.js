"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@openedx/paragon");
var _Footer = _interopRequireDefault(require("./Footer"));
var _data = require("../../data");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ReadyToStartProctoredExamInstructions = () => {
  const {
    exam
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const {
    attempt,
    reviewPolicy
  } = exam;
  const dispatch = (0, _reactRedux.useDispatch)();
  const examDuration = attempt.total_time ? attempt.total_time : exam.total_time;
  const platformName = (0, _frontendPlatform.getConfig)().SITE_NAME;
  const rulesUrl = (0, _frontendPlatform.getConfig)().PROCTORED_EXAM_RULES_URL;
  const [beginExamClicked, setBeginExamClicked] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    dispatch((0, _data.getExamReviewPolicy)());
  }, [dispatch]);
  const handleStart = () => {
    setBeginExamClicked(true);
    dispatch((0, _data.startProctoredExam)());
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Container, {
      className: "border py-5 mb-4",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "h3",
        "data-testid": "exam-instructions-title",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.ReadyToStartProctoredExamInstructions.title1",
          defaultMessage: "Important"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("ul", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          "data-testid": "duration-text",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.ReadyToStartProctoredExamInstructions.text1",
            defaultMessage: "You have {examDuration} to complete this exam.",
            values: {
              examDuration
            }
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.ReadyToStartProctoredExamInstructions.text2",
            defaultMessage: "Once you start the exam, you cannot stop the timer."
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.ReadyToStartProctoredExamInstructions.text3",
            defaultMessage: "For all question types, you must click \"submit\" to complete your answer."
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.ReadyToStartProctoredExamInstructions.text4",
            defaultMessage: "If time expires before you click \"End My Exam\", only your submitted answers will be graded."
          })
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "h3",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.ReadyToStartProctoredExamInstructions.title2",
          defaultMessage: "Proctored Exam Rules"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.ReadyToStartProctoredExamInstructions.text5",
          defaultMessage: "You must adhere to the following rules while you complete this exam."
        }), "\xA0", /*#__PURE__*/(0, _jsxRuntime.jsx)("strong", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.ReadyToStartProctoredExamInstructions.text6",
            defaultMessage: 'If you violate these rules, you will receive a score of 0 ' + 'on the exam, and you will not be eligible for academic course credit.'
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("br", {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
          variant: "link",
          target: "_blank",
          href: rulesUrl,
          "data-testid": "proctored-exam-instructions-rulesLink",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.ReadyToStartProctoredExamInstructions.rulesLink",
            defaultMessage: "{platformName} Rules for Online Proctored Exams",
            values: {
              platformName
            }
          })
        })]
      }), reviewPolicy && /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "h3",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.ReadyToStartProctoredExamInstructions.title3",
            defaultMessage: "Additional Exam Rules"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.ReadyToStartProctoredExamInstructions.text7",
            defaultMessage: 'The following additional rules apply to this exam. ' + 'These rules take precedence over the Rules for Online Proctored Exams.'
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: reviewPolicy
        })]
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Button, {
        "data-testid": "start-exam-button",
        variant: "primary",
        onClick: handleStart,
        disabled: beginExamClicked,
        children: [beginExamClicked && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Spinner, {
          "data-testid": "exam-loading-spinner",
          animation: "border"
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.startExamInstructions.startExamButtonText",
          defaultMessage: "Start exam"
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Footer.default, {})]
  });
};
var _default = exports.default = ReadyToStartProctoredExamInstructions;
//# sourceMappingURL=ReadyToStartProctoredExamInstructions.js.map