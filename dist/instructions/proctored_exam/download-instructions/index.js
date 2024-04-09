"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _frontendPlatform = require("@edx/frontend-platform");
var _i18n = require("@edx/frontend-platform/i18n");
var _paragon = require("@openedx/paragon");
var _constants = require("../../../constants");
var _data = require("../../../data");
var _WarningModal = _interopRequireDefault(require("../WarningModal"));
var _api = require("../../../data/api");
var _messages = _interopRequireDefault(require("../messages"));
var _LtiProviderInstructions = _interopRequireDefault(require("./LtiProviderInstructions"));
var _RestProviderInstructions = _interopRequireDefault(require("./RestProviderInstructions"));
var _RPNowInstructions = _interopRequireDefault(require("./RPNowInstructions"));
var _DownloadButtons = _interopRequireDefault(require("./DownloadButtons"));
var _Footer = _interopRequireDefault(require("../Footer"));
var _SkipProctoredExamButton = _interopRequireDefault(require("../SkipProctoredExamButton"));
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const DownloadSoftwareProctoredExamInstructions = _ref => {
  let {
    intl,
    skipProctoredExam
  } = _ref;
  const {
    proctoringSettings,
    exam,
    allowProctoringOptOut
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const dispatch = (0, _reactRedux.useDispatch)();
  const {
    attempt,
    course_id: courseId,
    content_id: sequenceId
  } = exam;
  const {
    exam_started_poll_url: pollUrl,
    attempt_code: examCode,
    attempt_id: attemptId,
    software_download_url: downloadUrl,
    use_legacy_attempt_api: useLegacyAttemptApi
  } = attempt;
  const {
    provider_name: providerName,
    provider_tech_support_email: supportEmail,
    provider_tech_support_phone: supportPhone,
    provider_tech_support_url: supportURL,
    exam_proctoring_backend: proctoringBackend
  } = proctoringSettings;
  const examHasLtiProvider = !useLegacyAttemptApi;
  const {
    instructions
  } = proctoringBackend || {};
  const [systemCheckStatus, setSystemCheckStatus] = (0, _react.useState)('');
  const [downloadClicked, setDownloadClicked] = (0, _react.useState)(false);
  const withProviderInstructions = instructions && instructions.length > 0;
  const launchSoftwareUrl = examHasLtiProvider ? `${(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL}/lti/start_proctoring/${attemptId}` : downloadUrl;
  const handleDownloadClick = () => {
    (0, _api.pollExamAttempt)(pollUrl, sequenceId).then(data => {
      if (data.status === _constants.ExamStatus.READY_TO_START) {
        setSystemCheckStatus('success');
      } else {
        // TODO: This call circumvents the thunk for startProctoringSoftwareDownload
        // which is a bit odd and would handle useLegacyAttempt for us.
        // There's an opportunity to refactor and clean this up a bit.
        (0, _api.softwareDownloadAttempt)(attemptId, useLegacyAttemptApi);
        window.location.assign(launchSoftwareUrl);
      }
    });
    setDownloadClicked(true);
  };
  const handleStartExamClick = () => {
    (0, _api.pollExamAttempt)(pollUrl, sequenceId).then(data => data.status === _constants.ExamStatus.READY_TO_START ? dispatch((0, _data.getExamAttemptsData)(courseId, sequenceId)) : setSystemCheckStatus('failure'));
  };
  function providerInstructions() {
    if (examHasLtiProvider) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_LtiProviderInstructions.default, {
        providerName: providerName,
        supportEmail: supportEmail,
        supportPhone: supportPhone,
        supportURL: supportURL
      });
    }
    if (withProviderInstructions) {
      return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RestProviderInstructions.default, {
        providerName: providerName,
        supportEmail: supportEmail,
        supportPhone: supportPhone,
        instructions: instructions
      });
    }
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_RPNowInstructions.default, {
      code: examCode
    });
  }
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)(_paragon.Container, {
      className: "border py-5 mb-4",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_WarningModal.default, {
        isOpen: Boolean(systemCheckStatus),
        title: systemCheckStatus === 'success' ? intl.formatMessage(_messages.default.softwareLoadedModalTitle) : intl.formatMessage(_messages.default.cannotStartModalTitle),
        body: systemCheckStatus === 'success' ? intl.formatMessage(_messages.default.softwareLoadedModalBody) : intl.formatMessage(_messages.default.cannotStartModalBody),
        handleClose: () => setSystemCheckStatus('')
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        className: "h3",
        "data-testid": "exam-instructions-title",
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
          id: "exam.DownloadSoftwareProctoredExamInstructions.title",
          defaultMessage: "Set up and start your proctored exam."
        })
      }), providerInstructions(), /*#__PURE__*/(0, _jsxRuntime.jsx)(_DownloadButtons.default, {
        downloadUrl: launchSoftwareUrl,
        onDownloadClick: handleDownloadClick,
        onStartExamClick: handleStartExamClick,
        downloadClicked: downloadClicked
      }), !examHasLtiProvider && !withProviderInstructions && /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
        className: "pt-3",
        children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
          className: "h4",
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.DefaultDownloadSoftwareProctoredExamInstructions.step3.title",
            defaultMessage: "Step 3."
          })
        }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_i18n.FormattedMessage, {
            id: "exam.DefaultDownloadSoftwareProctoredExamInstructions.step3.body",
            defaultMessage: 'For security and exam integrity reasons, ' + 'we ask you to sign in to your edX account. Then we will ' + 'direct you to the RPNow proctoring experience.'
          })
        })]
      })]
    }), allowProctoringOptOut && /*#__PURE__*/(0, _jsxRuntime.jsx)(_SkipProctoredExamButton.default, {
      handleClick: skipProctoredExam
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Footer.default, {})]
  });
};
DownloadSoftwareProctoredExamInstructions.propTypes = {
  intl: _i18n.intlShape.isRequired,
  skipProctoredExam: _propTypes.default.func.isRequired
};
var _default = exports.default = (0, _i18n.injectIntl)(DownloadSoftwareProctoredExamInstructions);
//# sourceMappingURL=index.js.map