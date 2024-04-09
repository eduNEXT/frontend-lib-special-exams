"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactRedux = require("react-redux");
var _react = _interopRequireWildcard(require("react"));
var _react2 = require("@edx/frontend-platform/react");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _Exam = _interopRequireDefault(require("./Exam"));
var _data = require("../data");
var _jsxRuntime = require("react/jsx-runtime");
const _excluded = ["children"];
/**
 * Exam wrapper is responsible for triggering initial exam data fetching and rendering Exam.
 */
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
const ExamWrapper = _ref => {
  let {
      children
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded);
  const {
    authenticatedUser
  } = (0, _react.useContext)(_react2.AppContext);
  const {
    sequence,
    courseId,
    isStaff,
    originalUserIsStaff,
    canAccessProctoredExams
  } = props;
  const {
    isLoading
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const dispatch = (0, _reactRedux.useDispatch)();
  const loadInitialData = async () => {
    await dispatch((0, _data.getExamAttemptsData)(courseId, sequence.id));
    await (0, _data.getAllowProctoringOptOut)(sequence.allowProctoringOptOut);
    await (0, _data.checkExamEntry)();
  };
  const isGated = sequence && sequence.gatedContent !== undefined && sequence.gatedContent.gated;
  (0, _react.useEffect)(() => {
    // fetch exam data on exam sequences or if no exam data has been fetched yet
    if (sequence.isTimeLimited || isLoading) {
      loadInitialData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // if the user is browsing public content (not logged in) they cannot be in an exam
  // if the user is staff they may view exam content without an exam attempt
  // any requests for exam state will 403 so just short circuit this component here
  if (!authenticatedUser || isStaff) {
    return children;
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Exam.default, {
    isGated: isGated,
    isTimeLimited: sequence.isTimeLimited,
    originalUserIsStaff: originalUserIsStaff,
    canAccessProctoredExams: canAccessProctoredExams,
    children: children
  });
};
ExamWrapper.propTypes = {
  sequence: _propTypes.default.shape({
    id: _propTypes.default.string.isRequired,
    isTimeLimited: _propTypes.default.bool,
    allowProctoringOptOut: _propTypes.default.bool,
    gatedContent: _propTypes.default.shape({
      gated: _propTypes.default.bool
    })
  }).isRequired,
  courseId: _propTypes.default.string.isRequired,
  children: _propTypes.default.element.isRequired,
  isStaff: _propTypes.default.bool,
  originalUserIsStaff: _propTypes.default.bool,
  canAccessProctoredExams: _propTypes.default.bool
};
ExamWrapper.defaultProps = {
  isStaff: false,
  originalUserIsStaff: false,
  canAccessProctoredExams: true
};
var _default = exports.default = ExamWrapper;
//# sourceMappingURL=ExamWrapper.js.map