"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.TimerContext = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@edx/paragon");
var _data = require("../data");
var _events = require("./events");
var _hocs = require("../hocs");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } /* give an extra 5 seconds where the timer holds at 00:00 before page refreshes */
var GRACE_PERIOD_SECS = 5;
var POLL_INTERVAL = 60;
var TIME_LIMIT_CRITICAL_PCT = 0.05;
var TIME_LIMIT_LOW_PCT = 0.2;
var TimerContext = exports.TimerContext = /*#__PURE__*/_react["default"].createContext({});
var mapStateToProps = function mapStateToProps(state) {
  var _state$examState = state.examState,
    activeAttempt = _state$examState.activeAttempt,
    exam = _state$examState.exam;
  return {
    attempt: activeAttempt,
    timeLimitMins: exam.time_limit_mins
  };
};
var getFormattedRemainingTime = function getFormattedRemainingTime(timeLeft) {
  return {
    hours: Math.floor(timeLeft / (60 * 60)),
    minutes: Math.floor(timeLeft / 60 % 60),
    seconds: Math.floor(timeLeft % 60)
  };
};
var TimerServiceProvider = function TimerServiceProvider(_ref) {
  var children = _ref.children,
    attempt = _ref.attempt,
    timeLimitMins = _ref.timeLimitMins,
    pollHandler = _ref.pollHandler,
    pingHandler = _ref.pingHandler;
  var _useState = (0, _react.useState)({}),
    _useState2 = _slicedToArray(_useState, 2),
    timeState = _useState2[0],
    setTimeState = _useState2[1];
  var _useToggle = (0, _paragon.useToggle)(false),
    _useToggle2 = _slicedToArray(_useToggle, 2),
    limitReached = _useToggle2[0],
    setLimitReached = _useToggle2[1];
  var workerUrl = attempt.desktop_application_js_url,
    pingInterval = attempt.ping_interval,
    timeRemaining = attempt.time_remaining_seconds;
  var LIMIT = GRACE_PERIOD_SECS ? 0 - GRACE_PERIOD_SECS : 0;
  var CRITICAL_LOW_TIME = timeLimitMins * 60 * TIME_LIMIT_CRITICAL_PCT;
  var LOW_TIME = timeLimitMins * 60 * TIME_LIMIT_LOW_PCT;
  var liveInterval = null;
  var getTimeString = function getTimeString() {
    return Object.values(timeState).map(function (item) {
      // Do not show timer negative value.
      // User will see 00:00:00 during grace period if any.
      var value = item < 0 ? 0 : item;
      return value < 10 ? "0".concat(value) : value;
    }).join(':');
  };
  var pollExam = function pollExam() {
    // poll url may be null if this is an LTI exam
    pollHandler(attempt.exam_started_poll_url);
  };
  var processTimeLeft = function processTimeLeft(timer, secondsLeft) {
    if (secondsLeft <= CRITICAL_LOW_TIME) {
      _data.Emitter.emit(_events.TIMER_IS_CRITICALLY_LOW);
    } else if (secondsLeft <= LOW_TIME) {
      _data.Emitter.emit(_events.TIMER_IS_LOW);
    }
    // Used to hide continue exam button on submit exam pages.
    // Since TIME_LIMIT_REACHED is fired after the grace period we
    // need to emit separate event when timer reaches 00:00
    if (secondsLeft <= 0) {
      _data.Emitter.emit(_events.TIMER_REACHED_NULL);
    }
    if (!limitReached && secondsLeft < LIMIT) {
      clearInterval(timer);
      setLimitReached();
      _data.Emitter.emit(_events.TIMER_LIMIT_REACHED);
    }
  };
  (0, _react.useEffect)(function () {
    var timerTick = 0;
    var secondsLeft = Math.floor(timeRemaining);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    liveInterval = setInterval(function () {
      secondsLeft -= 1;
      timerTick += 1;
      setTimeState(getFormattedRemainingTime(secondsLeft));
      processTimeLeft(liveInterval, secondsLeft);
      // no polling during grace period
      if (timerTick % POLL_INTERVAL === 0 && secondsLeft >= 0) {
        pollExam();
      }
      // if exam is proctored ping provider app
      if (workerUrl && timerTick % pingInterval === pingInterval / 2) {
        pingHandler(pingInterval, workerUrl);
      }
    }, 1000);
    return function () {
      if (liveInterval) {
        clearInterval(liveInterval);
        liveInterval = null;
      }
    };
  }, [timeRemaining]);
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
TimerServiceProvider.propTypes = {
  attempt: _propTypes["default"].shape({
    time_remaining_seconds: _propTypes["default"].number.isRequired,
    exam_started_poll_url: _propTypes["default"].string,
    desktop_application_js_url: _propTypes["default"].string,
    ping_interval: _propTypes["default"].number,
    taking_as_proctored: _propTypes["default"].bool,
    attempt_status: _propTypes["default"].string.isRequired
  }).isRequired,
  timeLimitMins: _propTypes["default"].number.isRequired,
  children: _propTypes["default"].element.isRequired,
  pollHandler: _propTypes["default"].func,
  pingHandler: _propTypes["default"].func
};
TimerServiceProvider.defaultProps = {
  pollHandler: function pollHandler() {},
  pingHandler: function pingHandler() {}
};
var _default = exports["default"] = (0, _hocs.withExamStore)(TimerServiceProvider, mapStateToProps);
//# sourceMappingURL=TimerProvider.js.map