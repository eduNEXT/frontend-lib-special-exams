"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@edx/paragon");
var _context = _interopRequireDefault(require("../../context"));
var _Footer = _interopRequireDefault(require("./Footer"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var SkipProctoredExamInstruction = function SkipProctoredExamInstruction(_ref) {
  var cancelSkipProctoredExam = _ref.cancelSkipProctoredExam;
  var state = (0, _react.useContext)(_context["default"]);
  var skipProctoringExam = state.skipProctoringExam;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Container, {
      className: "border py-5 mb-4",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        "data-testid": "proctored-exam-instructions-title",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.skipProctoredExamInstructions.text1",
          defaultMessage: "Are you sure you want to take this exam without proctoring?"
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.skipProctoredExamInstructions.text2",
          defaultMessage: 'If you take this exam without proctoring, you will not be eligible for ' + 'course credit or the MicroMasters credential if either applies to this course.'
        })
      }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
        className: "mb-0",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
          "data-testid": "skip-confirm-exam-button",
          variant: "primary",
          className: "mr-3 mb-2",
          onClick: skipProctoringExam,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.entranceExamInstructions.skipConfirmExamButtonText1",
            defaultMessage: "Continue Exam Without Proctoring"
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Button, {
          "data-testid": "skip-cancel-exam-button",
          variant: "secondary",
          className: "mb-2",
          onClick: cancelSkipProctoredExam,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.entranceExamInstructions.skipCancelExamButtonText",
            defaultMessage: "Go Back"
          })
        })]
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Footer["default"], {})]
  });
};
SkipProctoredExamInstruction.propTypes = {
  cancelSkipProctoredExam: _propTypes["default"].func.isRequired
};
var _default = exports["default"] = SkipProctoredExamInstruction;
//# sourceMappingURL=SkipProctoredExamInstruction.js.map