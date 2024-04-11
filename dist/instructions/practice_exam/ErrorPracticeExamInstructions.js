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
var ErrorPracticeExamInstructions = function ErrorPracticeExamInstructions() {
  var state = (0, _react.useContext)(_context["default"]);
  var resetExam = state.resetExam;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("h3", {
      className: "h3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.ErrorPracticeExamInstructions.title",
        defaultMessage: "There was a problem with your practice proctoring session"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("h4", {
      className: "h4",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.ErrorPracticeExamInstructions.title2",
        defaultMessage: "Your practice proctoring results: "
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: "font-weight-bold",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.ErrorPracticeExamInstructions.title2.result",
          defaultMessage: "Unsatisfactory"
        })
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "mb-0",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.ErrorPracticeExamInstructions.text",
        defaultMessage: 'Your proctoring session ended before you completed this practice exam. ' + 'You can retry this practice exam if you had problems setting up the online proctoring software.'
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
var _default = exports["default"] = ErrorPracticeExamInstructions;
//# sourceMappingURL=ErrorPracticeExamInstructions.js.map