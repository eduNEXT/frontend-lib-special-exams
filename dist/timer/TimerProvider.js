"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TimerContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _data = require("../data");
var _events = require("./events");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Give an extra 5 seconds where the timer holds at 00:00 before page refreshes
const GRACE_PERIOD_SECS = 5;
const POLL_INTERVAL = 60;
const TIME_LIMIT_CRITICAL_PCT = 0.05;
const TIME_LIMIT_LOW_PCT = 0.2;
const LIMIT = GRACE_PERIOD_SECS ? 0 - GRACE_PERIOD_SECS : 0;
const TimerContext = exports.TimerContext = /*#__PURE__*/_react.default.createContext({});
const getFormattedRemainingTime = timeLeft => ({
  hours: Math.floor(timeLeft / (60 * 60)),
  minutes: Math.floor(timeLeft / 60 % 60),
  seconds: Math.floor(timeLeft % 60)
});
const TimerProvider = _ref => {
  let {
    children
  } = _ref;
  const {
    activeAttempt: attempt,
    exam
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const [timeState, setTimeState] = (0, _react.useState)({});
  const lastSignal = (0, _react.useRef)(null);
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    time_limit_mins: timeLimitMins
  } = exam;
  const {
    desktop_application_js_url: workerUrl,
    ping_interval: pingInterval,
    timer_ends: timerEnds
  } = attempt;
  const getTimeString = () => Object.values(timeState).map(item => {
    // Do not show timer negative value.
    // User will see 00:00:00 during grace period if any.
    const value = item < 0 ? 0 : item;
    return value < 10 ? `0${value}` : value;
  }).join(':');
  const pollExam = (0, _react.useCallback)(() => {
    // Poll url may be null if this is an LTI exam.
    dispatch((0, _data.pollAttempt)(attempt.exam_started_poll_url));
  }, [attempt.exam_started_poll_url, dispatch]);
  const processTimeLeft = (0, _react.useCallback)(secondsLeft => {
    const emit = signal => {
      // This prevents spamming.
      if (lastSignal.current === signal) {
        return;
      }
      _data.Emitter.emit(signal);
      lastSignal.current = signal;
    };
    const criticalLowTime = timeLimitMins * 60 * TIME_LIMIT_CRITICAL_PCT;
    const lowTime = timeLimitMins * 60 * TIME_LIMIT_LOW_PCT;
    if (secondsLeft <= LIMIT) {
      emit(_events.TIMER_LIMIT_REACHED);
      return true; // Kill the timer.
    }

    if (secondsLeft <= 0) {
      // Used to hide continue exam button on submit exam pages.
      // Since TIME_LIMIT_REACHED is fired after the grace period we
      // need to emit separate event when timer reaches 00:00
      emit(_events.TIMER_REACHED_NULL);
      return false;
    }
    if (secondsLeft <= criticalLowTime) {
      emit(_events.TIMER_IS_CRITICALLY_LOW);
      return false;
    }
    if (secondsLeft <= lowTime) {
      emit(_events.TIMER_IS_LOW);
      return false;
    }
    return false;
  }, [timeLimitMins]);

  // Set deadline as a reference to timerEnds that updates when it changes
  const deadline = (0, _react.useRef)(new Date(timerEnds));
  (0, _react.useEffect)(() => {
    deadline.current = new Date(timerEnds);
  }, [timerEnds]);
  (0, _react.useEffect)(() => {
    const timerRef = {
      current: true
    };
    let timerTick = -1;
    const ticker = () => {
      timerTick++;
      const now = Date.now();
      const remainingTime = (deadline.current.getTime() - now) / 1000;
      const secondsLeft = Math.floor(remainingTime);
      setTimeState(getFormattedRemainingTime(secondsLeft));

      // No polling during grace period.
      if (timerTick % POLL_INTERVAL === 0 && secondsLeft >= 0) {
        pollExam();
      }

      // If exam is proctored ping provider app.
      if (workerUrl && timerTick % pingInterval === pingInterval / 2) {
        dispatch((0, _data.pingAttempt)(pingInterval, workerUrl));
      }
      const killTimer = processTimeLeft(secondsLeft);
      if (killTimer) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    // We delay the first ticker execution to give time for the emmiter
    // subscribers to hook up, otherwise immediate emissions will miss their purpose.
    setTimeout(() => {
      ticker();

      // If the timer handler is not true at this point, it means that it was stopped in the first run.
      // So we don't need to start the timer.
      if (timerRef.current === true) {
        // After the first run, we start the ticker.
        timerRef.current = setInterval(ticker, 1000);
      }
    });
    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [pingInterval, workerUrl, processTimeLeft, pollExam, dispatch]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    (0, _jsxRuntime.jsx)(TimerContext.Provider, {
      value: {
        timeState,
        getTimeString
      },
      children: children
    })
  );
};
TimerProvider.propTypes = {
  children: _propTypes.default.element.isRequired
};
var _default = exports.default = TimerProvider;
//# sourceMappingURL=TimerProvider.js.map