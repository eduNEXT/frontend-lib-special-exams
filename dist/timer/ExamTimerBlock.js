"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _CountDownTimer = _interopRequireDefault(require("./CountDownTimer"));
var _constants = require("../constants");
var _TimerProvider = _interopRequireDefault(require("./TimerProvider"));
var _data = require("../data");
var _events = require("./events");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Exam timer block component.
 */const ExamTimerBlock = (0, _i18n.injectIntl)(_ref => {
  let {
    intl
  } = _ref;
  const {
    activeAttempt: attempt
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const [isShowMore, showMore, showLess] = (0, _paragon.useToggle)(false);
  const [alertVariant, setAlertVariant] = (0, _react.useState)('info');
  const [timeReachedNull, setTimeReachedNull] = (0, _react.useState)(false);
  const dispatch = (0, _reactRedux.useDispatch)();
  if (!attempt || !(0, _constants.IS_STARTED_STATUS)(attempt.attempt_status)) {
    return null;
  }
  const onLowTime = () => setAlertVariant('warning');
  const onCriticalLowTime = () => setAlertVariant('danger');
  const onTimeReachedNull = () => setTimeReachedNull(true);
  const handleEndExamClick = () => {
    // if timer reached 00:00 submit exam right away
    // instead of trying to move user to ready_to_submit page
    if (timeReachedNull) {
      dispatch((0, _data.submitExam)());
    } else {
      dispatch((0, _data.stopExam)());
    }
  };
  (0, _react.useEffect)(() => {
    _data.Emitter.once(_events.TIMER_IS_LOW, onLowTime);
    _data.Emitter.once(_events.TIMER_IS_CRITICALLY_LOW, onCriticalLowTime);
    _data.Emitter.once(_events.TIMER_LIMIT_REACHED, () => dispatch((0, _data.expireExam)()));
    _data.Emitter.once(_events.TIMER_REACHED_NULL, onTimeReachedNull);
    return () => {
      _data.Emitter.off(_events.TIMER_IS_LOW, onLowTime);
      _data.Emitter.off(_events.TIMER_IS_CRITICALLY_LOW, onCriticalLowTime);
      _data.Emitter.off(_events.TIMER_LIMIT_REACHED, () => dispatch((0, _data.expireExam)()));
      _data.Emitter.off(_events.TIMER_REACHED_NULL, onTimeReachedNull);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_TimerProvider.default, {
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert, {
      variant: alertVariant,
      children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "d-flex justify-content-between flex-column flex-lg-row align-items-start",
        "data-testid": "exam-timer",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.examTimer.text",
            defaultMessage: "You are taking \"{examLink}\" as {examType}.",
            values: {
              examLink: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert.Link, {
                href: attempt.exam_url_path,
                children: attempt.exam_display_name
              }),
              examType: attempt.exam_type
            }
          }), ' ', isShowMore ? /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
            children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
              id: "exam.examTimer.showLess",
              defaultMessage: 'The timer on the right shows the time remaining in the exam. ' + 'To receive credit for problems, you must select "Submit" ' + 'for each problem before you select "End My Exam" '
            }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert.Link, {
              onClick: showLess,
              children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
                id: "exam.examTimer.showLessLink",
                defaultMessage: "Show less"
              })
            })]
          }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert.Link, {
            onClick: showMore,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
              id: "exam.examTimer.showMoreLink",
              defaultMessage: "Show more"
            })
          })]
        }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
          className: "d-flex align-items-center flex-shrink-0 ml-lg-3 mt-2 mt-lg-0",
          "aria-label": intl.formatMessage({
            id: 'exam.aria.examTimerAndEndExamButton',
            defaultMessage: 'Exam timer and end exam button'
          }),
          children: [attempt.attempt_status !== _constants.ExamStatus.READY_TO_SUBMIT && /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
            "data-testid": "end-button",
            className: "mr-3",
            variant: "outline-primary",
            onClick: handleEndExamClick,
            children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
              id: "exam.examTimer.endExamBtn",
              defaultMessage: "End My Exam"
            })
          }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_CountDownTimer.default, {
            attempt: attempt
          })]
        })]
      })
    })
  });
});
ExamTimerBlock.propTypes = {};
var _default = exports.default = ExamTimerBlock;
//# sourceMappingURL=ExamTimerBlock.js.map