"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _i18n = require("@edx/frontend-platform/i18n");
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@edx/paragon");
var _context = _interopRequireDefault(require("../../context"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ErrorProctoredExamInstructions = function ErrorProctoredExamInstructions() {
  var state = (0, _react.useContext)(_context["default"]);
  var _ref = state.proctoringSettings || {},
    proctoringEscalationEmail = _ref.proctoring_escalation_email;
  var platformName = (0, _frontendPlatform.getConfig)().SITE_NAME;
  var contactUsUrl = (0, _frontendPlatform.getConfig)().CONTACT_URL;
  var renderBody = function renderBody() {
    if (proctoringEscalationEmail) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.ErrorProctoredExamInstructions.text1",
        defaultMessage: 'A system error has occurred with your proctored exam. ' + 'Please reach out to your course team at {supportLink} for assistance, ' + 'and return to the exam once you receive further instructions.',
        values: {
          supportLink: /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.MailtoLink, {
            to: proctoringEscalationEmail,
            children: proctoringEscalationEmail
          })
        }
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
      id: "exam.ErrorProctoredExamInstructions.text2",
      defaultMessage: 'A system error has occurred with your proctored exam. ' + 'Please reach out to {supportLink} for assistance, and return to ' + 'the exam once you receive further instructions.',
      values: {
        supportLink: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Hyperlink, {
          href: contactUsUrl,
          target: "_blank",
          children: [platformName, " Support"]
        })
      }
    });
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      className: "h3",
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.ErrorProctoredExamInstructions.title",
        defaultMessage: "Error with proctored exam"
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      className: "mb-0",
      children: renderBody()
    })]
  });
};
var _default = exports["default"] = ErrorProctoredExamInstructions;
//# sourceMappingURL=ErrorProctoredExamInstructions.js.map