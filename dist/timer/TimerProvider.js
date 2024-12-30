"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TimerContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _data = require("../data");
var _events = require("./events");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // Give an extra 5 seconds where the timer holds at 00:00 before page refreshes
var GRACE_PERIOD_SECS = 5;
var POLL_INTERVAL = 60;
var TIME_LIMIT_CRITICAL_PCT = 0.05;
var TIME_LIMIT_LOW_PCT = 0.2;
var LIMIT = GRACE_PERIOD_SECS ? 0 - GRACE_PERIOD_SECS : 0;
var TimerContext = exports.TimerContext = /*#__PURE__*/_react["default"].createContext({});
var getFormattedRemainingTime = function getFormattedRemainingTime(timeLeft) {
  return {
    hours: Math.floor(timeLeft / (60 * 60)),
    minutes: Math.floor(timeLeft / 60 % 60),
    seconds: Math.floor(timeLeft % 60)
  };
};
var TimerProvider = function TimerProvider(_ref) {
  var children = _ref.children;
  var _useSelector = (0, _reactRedux.useSelector)(function (state) {
      return state.specialExams;
    }),
    attempt = _useSelector.activeAttempt,
    exam = _useSelector.exam;
  var _useState = (0, _react.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    timeState = _useState2[0],
    setTimeState = _useState2[1];
  var lastSignal = (0, _react.useRef)(null);
  var dispatch = (0, _reactRedux.useDispatch)();
  var timeLimitMins = exam.time_limit_mins;
  var workerUrl = attempt.desktop_application_js_url,
    pingInterval = attempt.ping_interval,
    timerEnds = attempt.timer_ends;
  var getTimeString = function getTimeString() {
    return Object.values(timeState).map(function (item) {
      // Do not show timer negative value.
      // User will see 00:00:00 during grace period if any.
      var value = item < 0 ? 0 : item;
      return value < 10 ? "0".concat(value) : value;
    }).join(':');
  };
  var pollExam = (0, _react.useCallback)(function () {
    // Poll url may be null if this is an LTI exam.
    dispatch((0, _data.pollAttempt)(attempt.exam_started_poll_url));
  }, [attempt.exam_started_poll_url, dispatch]);
  var processTimeLeft = (0, _react.useCallback)(function (secondsLeft) {
    var emit = function emit(signal) {
      // This prevents spamming.
      if (lastSignal.current === signal) {
        return;
      }
      _data.Emitter.emit(signal);
      lastSignal.current = signal;
    };
    var criticalLowTime = timeLimitMins * 60 * TIME_LIMIT_CRITICAL_PCT;
    var lowTime = timeLimitMins * 60 * TIME_LIMIT_LOW_PCT;
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
  var deadline = (0, _react.useRef)(new Date(timerEnds));
  (0, _react.useEffect)(function () {
    deadline.current = new Date(timerEnds);
  }, [timerEnds]);
  (0, _react.useEffect)(function () {
    var timerRef = {
      current: true
    };
    var timerTick = -1;
    var ticker = function ticker() {
      timerTick++;
      var now = Date.now();
      var remainingTime = (deadline.current.getTime() - now) / 1000;
      var secondsLeft = Math.floor(remainingTime);
      setTimeState(getFormattedRemainingTime(secondsLeft));

      // No polling during grace period.
      if (timerTick % POLL_INTERVAL === 0 && secondsLeft >= 0) {
        pollExam();
      }

      // If exam is proctored ping provider app.
      if (workerUrl && timerTick % pingInterval === pingInterval / 2) {
        dispatch((0, _data.pingAttempt)(pingInterval, workerUrl));
      }
      var killTimer = processTimeLeft(secondsLeft);
      if (killTimer) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };

    // We delay the first ticker execution to give time for the emmiter
    // subscribers to hook up, otherwise immediate emissions will miss their purpose.
    setTimeout(function () {
      ticker();

      // If the timer handler is not true at this point, it means that it was stopped in the first run.
      // So we don't need to start the timer.
      if (timerRef.current === true) {
        // After the first run, we start the ticker.
        timerRef.current = setInterval(ticker, 1000);
      }
    });
    return function () {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [pingInterval, workerUrl, processTimeLeft, pollExam, dispatch]);
  return (
    /*#__PURE__*/
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    (0, _jsxRuntime.jsx)(TimerContext.Provider, {
      value: {
        timeState: timeState,
        getTimeString: getTimeString
      },
      children: children
    })
  );
};
TimerProvider.propTypes = {
  children: _propTypes["default"].element.isRequired
};
var _default = exports["default"] = TimerProvider;
//# sourceMappingURL=TimerProvider.js.map