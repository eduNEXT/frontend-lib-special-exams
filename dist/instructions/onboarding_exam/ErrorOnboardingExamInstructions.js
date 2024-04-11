"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _context = _interopRequireDefault(require("../../context"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ErrorOnboardingExamInstructions = function ErrorOnboardingExamInstructions() {
  var state = (0, _react.useContext)(_context["default"]);
  var resetExam = state.resetExam;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "h3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.ErrorOnboardingExamInstructions.title",
        defaultMessage: "Error: There was a problem with your onboarding session"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "mb-0",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.ErrorOnboardingExamInstructions.text",
        defaultMessage: 'Your proctoring session ended before you completed this ' + 'onboarding exam. You should retry this onboarding exam'
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
      "data-testid": "retry-exam-button",
      variant: "primary",
      onClick: resetExam,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.ErrorOnboardingExamInstructions.retryExamButton",
        defaultMessage: "Retry my exam"
      })
    })]
  });
};
var _default = exports["default"] = ErrorOnboardingExamInstructions;
//# sourceMappingURL=ErrorOnboardingExamInstructions.js.map