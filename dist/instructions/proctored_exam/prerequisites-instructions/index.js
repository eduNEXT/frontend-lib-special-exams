"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _paragon = require("@edx/paragon");
var _i18n = require("@edx/frontend-platform/i18n");
var _context = _interopRequireDefault(require("../../../context"));
var _Pending = _interopRequireDefault(require("./Pending"));
var _Failed = _interopRequireDefault(require("./Failed"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var PrerequisitesProctoredExamInstructions = function PrerequisitesProctoredExamInstructions(_ref) {
  var skipProctoredExam = _ref.skipProctoredExam;
  var state = (0, _react.useContext)(_context["default"]);
  var exam = state.exam,
    allowProctoringOptOut = state.allowProctoringOptOut;
  var prerequisitesData = exam.prerequisite_status;
  var pending = prerequisitesData.pending_prerequisites,
    failed = prerequisitesData.failed_prerequisites;
  var child = null;
  if (failed && failed.length > 0) {
    child = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Failed["default"], {
      prerequisites: failed,
      allowProctoringOptOut: allowProctoringOptOut,
      skipProctoredExam: skipProctoredExam
    });
  } else if (pending && pending.length > 0) {
    child = /*#__PURE__*/(0, _jsxRuntime.jsx)(_Pending["default"], {
      prerequisites: pending,
      allowProctoringOptOut: allowProctoringOptOut,
      skipProctoredExam: skipProctoredExam
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Container, {
      className: "border py-5 mb-4",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "h3",
        "data-testid": "exam-instructions-title",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.EntranceProctoredExamInstructions.title",
          defaultMessage: "This exam is proctored"
        })
      }), child]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Footer["default"], {})]
  });
};
PrerequisitesProctoredExamInstructions.propTypes = {
  skipProctoredExam: _propTypes["default"].func.isRequired
};
var _default = exports["default"] = PrerequisitesProctoredExamInstructions;
//# sourceMappingURL=index.js.map