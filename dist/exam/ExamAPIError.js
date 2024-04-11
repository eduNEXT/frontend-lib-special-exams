"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _frontendPlatform = require("@edx/frontend-platform");
var _paragon = require("@edx/paragon");
var _icons = require("@edx/paragon/icons");
var _i18n = require("@edx/frontend-platform/i18n");
var _context = _interopRequireDefault(require("../context"));
var _messages = _interopRequireDefault(require("./messages"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n["default"] = e, t && t.set(e, n), n; }
var ExamAPIError = function ExamAPIError(_ref) {
  var intl = _ref.intl;
  var state = (0, _react.useContext)(_context["default"]);
  var _getConfig = (0, _frontendPlatform.getConfig)(),
    SITE_NAME = _getConfig.SITE_NAME,
    SUPPORT_URL = _getConfig.SUPPORT_URL;
  var apiErrorMsg = state.apiErrorMsg;
  var shouldShowApiErrorMsg = !!apiErrorMsg && !apiErrorMsg.includes('<');
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Alert, {
    variant: "danger",
    "data-testid": "exam-api-error-component",
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Icon, {
      src: _icons.Info,
      className: "alert-icon"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_paragon.Alert.Heading, {
      "data-testid": "error-details",
      children: shouldShowApiErrorMsg ? apiErrorMsg : intl.formatMessage(_messages["default"].apiErrorDefault)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      children: SITE_NAME && SUPPORT_URL ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
        id: "exam.apiError.supportText.withLink",
        defaultMessage: 'If the issue persists, please reach out to {supportLink} for assistance, ' + 'and return to the exam once you receive further instructions.',
        values: {
          supportLink: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Hyperlink, {
            "data-testid": "support-link",
            destination: SUPPORT_URL,
            target: "_blank",
            children: [SITE_NAME, " Support"]
          })
        }
      }) : intl.formatMessage(_messages["default"].supportTextWithoutLink)
    })]
  });
};
ExamAPIError.propTypes = {
  intl: _i18n.intlShape.isRequired
};
var _default = exports["default"] = (0, _i18n.injectIntl)(ExamAPIError);
//# sourceMappingURL=ExamAPIError.js.map