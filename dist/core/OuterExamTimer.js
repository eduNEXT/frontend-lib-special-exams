"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react2 = require("@edx/frontend-platform/react");
var _timer = require("../timer");
var _ExamAPIError = _interopRequireDefault(require("../exam/ExamAPIError"));
var _data = require("../data");
var _constants = require("../constants");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ExamTimer = _ref => {
  let {
    courseId
  } = _ref;
  const {
    activeAttempt,
    apiErrorMsg
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const {
    authenticatedUser
  } = (0, _react.useContext)(_react2.AppContext);
  const showTimer = !!(activeAttempt && (0, _constants.IS_STARTED_STATUS)(activeAttempt.attempt_status));
  const dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(() => {
    dispatch((0, _data.getLatestAttemptData)(courseId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  // if user is not authenticated they cannot have active exam, so no need for timer
  // (also exam API would return 403 error)
  if (!authenticatedUser) {
    return null;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: "d-flex flex-column justify-content-center",
    children: [showTimer && /*#__PURE__*/(0, _jsxRuntime.jsx)(_timer.ExamTimerBlock, {}), apiErrorMsg && /*#__PURE__*/(0, _jsxRuntime.jsx)(_ExamAPIError.default, {})]
  });
};
ExamTimer.propTypes = {
  courseId: _propTypes.default.string.isRequired
};

/**
 * OuterExamTimer is the component responsible for showing exam timer on non-sequence pages.
 * @param courseId - Id of a course that is checked for active exams, if there is one the timer
 * will be shown.
 */
const OuterExamTimer = _ref2 => {
  let {
    courseId
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(ExamTimer, {
    courseId: courseId
  });
};
OuterExamTimer.propTypes = {
  courseId: _propTypes.default.string.isRequired
};
var _default = exports.default = OuterExamTimer;
//# sourceMappingURL=OuterExamTimer.js.map