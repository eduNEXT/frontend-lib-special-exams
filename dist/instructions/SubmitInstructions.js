"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _paragon = require("@openedx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _emitter = _interopRequireDefault(require("../data/emitter"));
var _constants = require("../constants");
var _data = require("../data");
var _proctored_exam = require("./proctored_exam");
var _timed_exam = require("./timed_exam");
var _Footer = _interopRequireDefault(require("./proctored_exam/Footer"));
var _events = require("../timer/events");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SubmitExamInstructions = () => {
  const {
    exam,
    activeAttempt
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    time_remaining_seconds: timeRemaining
  } = activeAttempt;
  const {
    type: examType
  } = exam || {};
  const [canContinue, setCanContinue] = (0, _react.useState)(timeRemaining > 0);
  const hideContinueButton = () => setCanContinue(false);
  (0, _react.useEffect)(() => {
    _emitter.default.once(_events.TIMER_REACHED_NULL, hideContinueButton);
    return () => {
      _emitter.default.off(_events.TIMER_REACHED_NULL, hideContinueButton);
    };
  }, []);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Container, {
      className: "border py-5 mb-4",
      children: [examType === _constants.ExamType.TIMED ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_timed_exam.SubmitTimedExamInstructions, {}) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_proctored_exam.SubmitProctoredExamInstructions, {}), canContinue && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
        variant: "outline-primary",
        onClick: () => dispatch((0, _data.continueExam)()),
        "data-testid": "continue-exam-button",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.SubmitExamInstructions.continueButton",
          defaultMessage: "No, I'd like to continue working"
        })
      })]
    }), examType !== _constants.ExamType.TIMED && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Footer.default, {})]
  });
};
var _default = exports.default = SubmitExamInstructions;
//# sourceMappingURL=SubmitInstructions.js.map