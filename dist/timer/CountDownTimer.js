"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _paragon = require("@openedx/paragon");
var _icons = require("@openedx/paragon/icons");
var _i18n = require("@edx/frontend-platform/i18n");
var _TimerProvider = require("./TimerProvider");
var _helpers = require("../helpers");
var _jsxRuntime = require("react/jsx-runtime");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/**
 * Display timer textual value. Display hide/show button.
 */const CountDownTimer = (0, _i18n.injectIntl)(props => {
  const timer = (0, _react.useContext)(_TimerProvider.TimerContext);
  const timeString = timer.getTimeString();
  const [isShowTimer, showTimer, hideTimer] = (0, _paragon.useToggle)(true);
  const {
    intl
  } = props;
  const {
    time_remaining_seconds: timeRemainingSeconds
  } = props.attempt;
  const generateAccessbilityString = () => {
    const humanizedTime = (0, _helpers.generateHumanizedTime)(timeRemainingSeconds);
    /**
    * INTL NOTE: At the moment, these strings are NOT internationalized/translated.
    * The back-end also does not support this either.
    *
    * It is TBD if this needs to be implemented
    */
    return `you have ${humanizedTime} remaining`;
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "exam-timer-clock d-flex justify-content-between",
    style: {
      minWidth: isShowTimer ? '110px' : '32px'
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "sr-only timer-announce",
      "aria-live": "assertive",
      children: generateAccessbilityString()
    }), isShowTimer && timeString, /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: "pl-2 d-flex flex-column justify-content-center",
      id: "toggle_timer",
      "aria-pressed": isShowTimer ? 'false' : 'true',
      "aria-label": isShowTimer ? intl.formatMessage({
        id: 'exam.aria.hideTimer',
        defaultMessage: 'Hide Timer'
      }) : intl.formatMessage({
        id: 'exam.aria.showTimer',
        defaultMessage: 'Show Timer'
      }),
      children: isShowTimer ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        "data-testid": "hide-timer",
        src: _icons.VisibilityOff,
        onClick: hideTimer
      }) : /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
        "data-testid": "show-timer",
        src: _icons.Visibility,
        onClick: showTimer
      })
    })]
  });
});
var _default = exports.default = CountDownTimer;
//# sourceMappingURL=CountDownTimer.js.map