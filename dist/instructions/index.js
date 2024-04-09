"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _proctored_exam = require("./proctored_exam");
var _helpers = require("../helpers");
var _constants = require("../constants");
var _EntranceInstructions = _interopRequireDefault(require("./EntranceInstructions"));
var _SubmitInstructions = _interopRequireDefault(require("./SubmitInstructions"));
var _RejectedInstructions = _interopRequireDefault(require("./RejectedInstructions"));
var _ErrorInstructions = _interopRequireDefault(require("./ErrorInstructions"));
var _SubmittedInstructions = _interopRequireDefault(require("./SubmittedInstructions"));
var _VerifiedInstructions = _interopRequireDefault(require("./VerifiedInstructions"));
var _ExpiredInstructions = _interopRequireDefault(require("./ExpiredInstructions"));
var _UnknownAttemptStatusError = _interopRequireDefault(require("./UnknownAttemptStatusError"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const Instructions = _ref => {
  let {
    children
  } = _ref;
  const {
    exam
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const {
    attempt,
    type: examType,
    prerequisite_status: prerequisitesData,
    passed_due_date: passedDueDate,
    hide_after_due: hideAfterDue
  } = exam || {};
  const prerequisitesPassed = prerequisitesData ? prerequisitesData.are_prerequisites_satisifed : true;
  const {
    attempt_status: attemptStatus,
    attempt_ready_to_resume: attemptReadyToResume
  } = attempt || {};
  const [skipProctoring, toggleSkipProctoring] = (0, _react.useState)(false);
  const toggleSkipProctoredExam = () => toggleSkipProctoring(!skipProctoring);
  const expired = (0, _helpers.shouldRenderExpiredPage)(exam);
  if (expired) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExpiredInstructions.default, {});
  }
  const renderEmptyAttemptInstructions = () => {
    let component = /*#__PURE__*/(0, _jsxRuntime.jsx)(_EntranceInstructions.default, {
      examType: examType,
      skipProctoredExam: toggleSkipProctoredExam
    });
    if (examType === _constants.ExamType.PROCTORED && !prerequisitesPassed) {
      component = /*#__PURE__*/(0, _jsxRuntime.jsx)(_proctored_exam.PrerequisitesProctoredExamInstructions, {
        skipProctoredExam: toggleSkipProctoredExam
      });
    }
    return component;
  };
  switch (true) {
    case examType === _constants.ExamType.PROCTORED && skipProctoring:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_proctored_exam.SkipProctoredExamInstruction, {
        cancelSkipProctoredExam: toggleSkipProctoredExam
      });
    case (0, _helpers.isEmpty)(attempt) || !attempt.attempt_id:
      return renderEmptyAttemptInstructions();
    case attemptReadyToResume:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_EntranceInstructions.default, {
        examType: examType,
        skipProctoredExam: toggleSkipProctoredExam
      });
    case attemptStatus === _constants.ExamStatus.CREATED:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_proctored_exam.DownloadSoftwareProctoredExamInstructions, {
        skipProctoredExam: toggleSkipProctoredExam
      });
    case attemptStatus === _constants.ExamStatus.DOWNLOAD_SOFTWARE_CLICKED:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_proctored_exam.DownloadSoftwareProctoredExamInstructions, {});
    case attemptStatus === _constants.ExamStatus.READY_TO_START:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_proctored_exam.ReadyToStartProctoredExamInstructions, {});
    case attemptStatus === _constants.ExamStatus.READY_TO_SUBMIT:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubmitInstructions.default, {});
    case attemptStatus === _constants.ExamStatus.SUBMITTED:
      // don't show submitted page for timed exam if exam has passed due date
      // and in studio visibility option is set to 'show entire section'
      // instead show exam content
      if (examType === _constants.ExamType.TIMED && passedDueDate && !hideAfterDue) {
        return children;
      }
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubmittedInstructions.default, {
        examType: examType
      });
    case attemptStatus === _constants.ExamStatus.SECOND_REVIEW_REQUIRED:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_SubmittedInstructions.default, {
        examType: examType
      });
    case attemptStatus === _constants.ExamStatus.VERIFIED:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_VerifiedInstructions.default, {
        examType: examType
      });
    case attemptStatus === _constants.ExamStatus.REJECTED:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RejectedInstructions.default, {
        examType: examType
      });
    case attemptStatus === _constants.ExamStatus.ERROR:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrorInstructions.default, {
        examType: examType
      });
    case examType === _constants.ExamType.PROCTORED && (0, _constants.IS_ONBOARDING_ERROR)(attemptStatus):
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_proctored_exam.OnboardingErrorProctoredExamInstructions, {});
    case attemptStatus === _constants.ExamStatus.STARTED:
      return children;
    default:
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_UnknownAttemptStatusError.default, {});
  }
};
Instructions.propTypes = {
  children: _propTypes.default.element.isRequired
};
var _default = exports.default = Instructions;
//# sourceMappingURL=index.js.map