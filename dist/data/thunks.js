"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.checkExamEntry = checkExamEntry;
exports.continueExam = continueExam;
exports.createProctoredExamAttempt = createProctoredExamAttempt;
exports.examRequiresAccessToken = examRequiresAccessToken;
exports.expireExam = expireExam;
exports.getAllowProctoringOptOut = getAllowProctoringOptOut;
exports.getExamAttemptsData = getExamAttemptsData;
exports.getExamReviewPolicy = getExamReviewPolicy;
exports.getLatestAttemptData = getLatestAttemptData;
exports.getProctoringSettings = getProctoringSettings;
exports.pingAttempt = pingAttempt;
exports.pollAttempt = pollAttempt;
exports.resetExam = resetExam;
exports.skipProctoringExam = skipProctoringExam;
exports.startProctoredExam = startProctoredExam;
exports.startProctoringSoftwareDownload = startProctoringSoftwareDownload;
exports.startTimedExam = startTimedExam;
exports.stopExam = stopExam;
exports.submitExam = submitExam;
var _logging = require("@edx/frontend-platform/logging");
var _frontendPlatform = require("@edx/frontend-platform");
var _api = require("./api");
var _helpers = require("../helpers");
var _slice = require("./slice");
var _constants = require("../constants");
var _handlers = require("./messages/handlers");
var _constants2 = _interopRequireDefault(require("./messages/constants"));
var _proctorio = require("./messages/proctorio");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function handleAPIError(error, dispatch) {
  const {
    message,
    detail
  } = error;
  dispatch((0, _slice.setApiError)({
    errorMsg: message || detail
  }));
}
const EXAM_START_TIMEOUT_MILLISECONDS = 5000;

/**
 * Fetch attempt data and update exam state after performing another action if it is provided.
 * It is assumed that action somehow modifies attempt in the backend, that's why the state needs
 * to be updated.
 * @param courseId - id of a course
 * @param sequenceId - id of a sequence
 * @param promiseToBeResolvedFirst - a promise that should get resolved before fetching attempt data
 * @param noLoading - if set to false shows spinner while executing the function
 */
function updateAttemptAfter(courseId, sequenceId) {
  let promiseToBeResolvedFirst = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let noLoading = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return async dispatch => {
    if (!noLoading) {
      dispatch((0, _slice.setIsLoading)({
        isLoading: true
      }));
    }
    if (promiseToBeResolvedFirst) {
      try {
        const response = await promiseToBeResolvedFirst;
        if (!response || !response.exam_attempt_id) {
          if (!noLoading) {
            dispatch((0, _slice.setIsLoading)({
              isLoading: false
            }));
          }
          return;
        }
      } catch (error) {
        handleAPIError(error, dispatch);
        if (!noLoading) {
          dispatch((0, _slice.setIsLoading)({
            isLoading: false
          }));
        }
      }
    }
    try {
      const attemptData = await (0, _api.fetchExamAttemptsData)(courseId, sequenceId);
      dispatch((0, _slice.setExamState)({
        exam: attemptData.exam,
        activeAttempt: !(0, _helpers.isEmpty)(attemptData.active_attempt) ? attemptData.active_attempt : null
      }));
    } catch (error) {
      handleAPIError(error, dispatch);
    } finally {
      if (!noLoading) {
        dispatch((0, _slice.setIsLoading)({
          isLoading: false
        }));
      }
    }
  };
}
function getExamAttemptsData(courseId, sequenceId) {
  return updateAttemptAfter(courseId, sequenceId);
}
function getLatestAttemptData(courseId) {
  return async dispatch => {
    dispatch((0, _slice.setIsLoading)({
      isLoading: true
    }));
    try {
      const attemptData = await (0, _api.fetchLatestAttempt)(courseId);
      dispatch((0, _slice.setExamState)({
        exam: attemptData.exam,
        activeAttempt: !(0, _helpers.isEmpty)(attemptData.active_attempt) ? attemptData.active_attempt : null
      }));
    } catch (error) {
      handleAPIError(error, dispatch);
    } finally {
      dispatch((0, _slice.setIsLoading)({
        isLoading: false
      }));
    }
  };
}
function getProctoringSettings() {
  return async (dispatch, getState) => {
    const {
      exam
    } = getState().specialExams;
    if (!exam.id) {
      (0, _logging.logError)('Failed to get exam settings. No exam id.');
      handleAPIError({
        message: 'Failed to fetch proctoring settings. No exam id was found.'
      }, dispatch);
      return;
    }
    try {
      const proctoringSettings = await (0, _api.fetchProctoringSettings)(exam.course_id, exam.id);
      dispatch((0, _slice.setProctoringSettings)({
        proctoringSettings
      }));
    } catch (error) {
      handleAPIError(error, dispatch);
    }
  };
}
function examRequiresAccessToken() {
  return async (dispatch, getState) => {
    if (!(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL) {
      return;
    }
    const {
      exam
    } = getState().specialExams;
    if (!exam.id) {
      (0, _logging.logError)('Failed to get exam access token. No exam id.');
      return;
    }
    try {
      const examAccessToken = await (0, _api.fetchExamAccessToken)(exam.id);
      dispatch((0, _slice.setExamAccessToken)({
        examAccessToken
      }));
    } catch (error) {
      (0, _logging.logError)('Exam access token was not granted.');
    }
  };
}

/**
 * Start a timed exam
 */
function startTimedExam() {
  return async (dispatch, getState) => {
    const {
      exam
    } = getState().specialExams;
    if (!exam.id) {
      (0, _logging.logError)('Failed to start exam. No exam id.');
      handleAPIError({
        message: 'Failed to start exam. No exam id was found.'
      }, dispatch);
      return;
    }
    await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.createExamAttempt)(exam.id, exam.use_legacy_attempt_api))(dispatch);
  };
}
function createProctoredExamAttempt() {
  return async (dispatch, getState) => {
    const {
      exam
    } = getState().specialExams;
    if (!exam.id) {
      (0, _logging.logError)('Failed to create exam attempt. No exam id.');
      return;
    }
    await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.createExamAttempt)(exam.id, exam.use_legacy_attempt_api, false, true))(dispatch);
  };
}

/**
 * Start a proctored exam (including onboarding and practice exams)
 */
function startProctoredExam() {
  return async (dispatch, getState) => {
    const {
      exam
    } = getState().specialExams;
    const {
      attempt
    } = exam || {};
    if (!exam.id) {
      (0, _logging.logError)('Failed to start proctored exam. No exam id.');
      return;
    }
    const {
      desktop_application_js_url: workerUrl
    } = attempt || {};
    const useWorker = window.Worker && workerUrl;
    const examHasLtiProvider = !exam.useLegacyAttemptApi;
    if (useWorker) {
      const startExamTimeoutMilliseconds = EXAM_START_TIMEOUT_MILLISECONDS;
      (0, _handlers.workerPromiseForEventNames)(_constants2.default.start, exam.attempt.desktop_application_js_url)(startExamTimeoutMilliseconds, attempt.external_id).then(() => updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.continueAttempt)(attempt.attempt_id, attempt.use_legacy_attempt_api))(dispatch)).catch(error => {
        const message = error?.message || 'Worker failed to respond.';
        (0, _logging.logError)(message, {
          attemptId: attempt.attempt_id,
          attemptStatus: attempt.attempt_status,
          courseId: attempt.course_id,
          examId: exam.id
        });
        handleAPIError({
          message: 'Something has gone wrong starting your exam. Please double-check that the application is running.'
        }, dispatch);
      });
    } else {
      if (examHasLtiProvider) {
        (0, _proctorio.notifyStartExam)();
      }
      await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.continueAttempt)(attempt.attempt_id, attempt.use_legacy_attempt_api))(dispatch);
    }
  };
}
function skipProctoringExam() {
  return async (dispatch, getState) => {
    const {
      exam
    } = getState().specialExams;
    if (!exam.id) {
      (0, _logging.logError)('Failed to skip proctored exam. No exam id.');
      return;
    }
    const attemptId = exam.attempt.attempt_id;
    const useLegacyAttemptApi = exam.use_legacy_attempt_api;
    if (attemptId) {
      await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.declineAttempt)(attemptId, useLegacyAttemptApi))(dispatch);
    } else {
      await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.createExamAttempt)(exam.id, true, false, useLegacyAttemptApi))(dispatch);
    }
  };
}

/**
 * Poll exam active attempt status.
 * @param url - poll attempt url
 */
function pollAttempt(url) {
  return async (dispatch, getState) => {
    const currentAttempt = getState().specialExams.activeAttempt;

    // If the learner is in a state where they've finished the exam
    // and the attempt can be submitted (i.e. they are "ready_to_submit"),
    // don't ping the proctoring app (which action could move
    // the attempt into an error state).
    if (currentAttempt && currentAttempt.attempt_status === _constants.ExamStatus.READY_TO_SUBMIT) {
      return;
    }
    try {
      const {
        exam
      } = getState().specialExams;
      const data = await (0, _api.pollExamAttempt)(url, exam.content_id);
      if (!data) {
        throw new Error('Poll Exam failed to fetch.');
      }
      const updatedAttempt = _objectSpread(_objectSpread({}, currentAttempt), {}, {
        time_remaining_seconds: data.time_remaining_seconds,
        attempt_status: data.status
      });
      dispatch((0, _slice.setActiveAttempt)({
        activeAttempt: updatedAttempt
      }));
      if (data.status === _constants.ExamStatus.SUBMITTED) {
        dispatch((0, _slice.expireExamAttempt)());
      }
    } catch (error) {
      handleAPIError(error, dispatch);
    }
  };
}
function stopExam() {
  return async (dispatch, getState) => {
    const {
      exam,
      activeAttempt
    } = getState().specialExams;
    if (!activeAttempt) {
      (0, _logging.logError)('Failed to stop exam. No active attempt.');
      handleAPIError({
        message: 'Failed to stop exam. No active attempt was found.'
      }, dispatch);
      return;
    }
    const {
      attempt_id: attemptId,
      exam_url_path: examUrl,
      use_legacy_attempt_api: useLegacyAttemptAPI
    } = activeAttempt;
    if (!exam.attempt || attemptId !== exam.attempt.attempt_id) {
      try {
        await (0, _api.stopAttempt)(attemptId, useLegacyAttemptAPI);
        window.location.href = examUrl;
      } catch (error) {
        handleAPIError(error, dispatch);
      }
      return;
    }
    await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.stopAttempt)(attemptId, useLegacyAttemptAPI))(dispatch);
  };
}
function continueExam() {
  return async (dispatch, getState) => {
    const {
      exam
    } = getState().specialExams;
    const attemptId = exam.attempt.attempt_id;
    const useLegacyAttemptAPI = exam.attempt.use_legacy_attempt_api;
    if (!attemptId) {
      (0, _logging.logError)('Failed to continue exam. No attempt id.');
      handleAPIError({
        message: 'Failed to continue exam. No attempt id was found.'
      }, dispatch);
      return;
    }
    await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.continueAttempt)(attemptId, useLegacyAttemptAPI))(dispatch);
  };
}
function resetExam() {
  return async (dispatch, getState) => {
    const {
      exam
    } = getState().specialExams;
    const attemptId = exam.attempt.attempt_id;
    const useLegacyAttemptAPI = exam.attempt.use_legacy_attempt_api;
    if (!attemptId) {
      (0, _logging.logError)('Failed to reset exam attempt. No attempt id.');
      handleAPIError({
        message: 'Failed to reset exam attempt. No attempt id was found.'
      }, dispatch);
      return;
    }
    await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.resetAttempt)(attemptId, useLegacyAttemptAPI))(dispatch);
  };
}
function submitExam() {
  return async (dispatch, getState) => {
    const {
      exam,
      activeAttempt
    } = getState().specialExams;
    const {
      desktop_application_js_url: workerUrl,
      external_id: attemptExternalId
    } = activeAttempt || {};
    const useWorker = window.Worker && activeAttempt && workerUrl;
    const handleBackendProviderSubmission = () => {
      // if a backend provider is being used during the exam
      // send it a message that exam is being submitted
      if (useWorker) {
        (0, _handlers.workerPromiseForEventNames)(_constants2.default.submit, workerUrl)(0, attemptExternalId).catch(() => handleAPIError({
          message: 'Something has gone wrong submitting your exam. Please double-check that the application is running.'
        }, dispatch));
      }
    };
    if (!activeAttempt) {
      (0, _logging.logError)('Failed to submit exam. No active attempt.');
      handleAPIError({
        message: 'Failed to submit exam. No active attempt was found.'
      }, dispatch);
      return;
    }
    const {
      attempt_id: attemptId,
      exam_url_path: examUrl,
      use_legacy_attempt_api: useLegacyAttemptAPI
    } = activeAttempt;
    if (!exam.attempt || attemptId !== exam.attempt.attempt_id) {
      try {
        await (0, _api.submitAttempt)(attemptId, useLegacyAttemptAPI);
        window.location.href = examUrl;
        handleBackendProviderSubmission();
      } catch (error) {
        handleAPIError(error, dispatch);
      }
      return;
    }
    await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.submitAttempt)(attemptId, useLegacyAttemptAPI))(dispatch);
    handleBackendProviderSubmission();
  };
}
function expireExam() {
  return async (dispatch, getState) => {
    const {
      exam,
      activeAttempt
    } = getState().specialExams;
    const {
      desktop_application_js_url: workerUrl,
      attempt_id: attemptId,
      external_id: attemptExternalId,
      use_legacy_attempt_api: useLegacyAttemptAPI
    } = activeAttempt || {};
    const useWorker = window.Worker && activeAttempt && workerUrl;
    if (!attemptId) {
      (0, _logging.logError)('Failed to expire exam. No attempt id.');
      handleAPIError({
        message: 'Failed to expire exam. No attempt id was found.'
      }, dispatch);
      return;
    }

    // this sure looks like a bug
    await updateAttemptAfter(activeAttempt.course_id, exam.content_id, (0, _api.submitAttempt)(attemptId, useLegacyAttemptAPI))(dispatch);
    dispatch((0, _slice.expireExamAttempt)());
    if (useWorker) {
      (0, _handlers.workerPromiseForEventNames)(_constants2.default.submit, workerUrl)(0, attemptExternalId).catch(() => handleAPIError({
        message: 'Something has gone wrong submitting your exam. Please double-check that the application is running.'
      }, dispatch));
    }
  };
}

/**
 * Ping provider application (used for proctored exams).
 * @param timeoutInSeconds - time to wait for worker response before raising an error
 * @param workerUrl - location of the worker from the provider
 */
function pingAttempt(timeoutInSeconds, workerUrl) {
  return async (dispatch, getState) => {
    const {
      exam,
      activeAttempt
    } = getState().specialExams;
    const useLegacyAttemptAPI = exam.attempt.use_legacy_attempt_api;
    await (0, _handlers.pingApplication)(timeoutInSeconds, activeAttempt.external_id, workerUrl).catch(async error => {
      const message = error?.message || 'Worker failed to respond.';
      /**
       * Note: The exam id logged here represents the current section being rendered.
       * This may be different from the exam they are currently attempting
       * if the learner has navigated to other course content during the exam.
       * */
      (0, _logging.logError)(message, {
        attemptId: activeAttempt.attempt_id,
        attemptStatus: activeAttempt.attempt_status,
        courseId: activeAttempt.course_id,
        examId: exam.id
      });

      // eslint-disable-next-line function-paren-newline
      await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.endExamWithFailure)(activeAttempt.attempt_id, message, useLegacyAttemptAPI))(dispatch);
    });
  };
}
function startProctoringSoftwareDownload() {
  return async (dispatch, getState) => {
    const {
      exam
    } = getState().specialExams;
    const attemptId = exam.attempt.attempt_id;
    const useLegacyAttemptAPI = exam.attempt.use_legacy_attempt_api;
    if (!attemptId) {
      (0, _logging.logError)('Failed to start downloading proctoring software. No attempt id.');
      handleAPIError({
        message: 'Failed to start downloading proctoring software. No attempt id was found.'
      }, dispatch);
      return;
    }
    await updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.softwareDownloadAttempt)(attemptId, useLegacyAttemptAPI))(dispatch);
  };
}
function getExamReviewPolicy() {
  return async (dispatch, getState) => {
    const {
      exam
    } = getState().specialExams;
    if (!exam.id) {
      (0, _logging.logError)('Failed to fetch exam review policy. No exam id.');
      handleAPIError({
        message: 'Failed to fetch exam review policy. No exam id was found.'
      }, dispatch);
      return;
    }
    try {
      const data = await (0, _api.fetchExamReviewPolicy)(exam.id);
      dispatch((0, _slice.setReviewPolicy)({
        policy: data.review_policy
      }));
    } catch (error) {
      handleAPIError(error, dispatch);
    }
  };
}
function getAllowProctoringOptOut(allowProctoringOptOut) {
  return dispatch => {
    dispatch((0, _slice.setAllowProctoringOptOut)({
      allowProctoringOptOut
    }));
  };
}

/**
 * Check if we are allowed to enter an exam where proctoring has started.
 * There is no support for reentry with LTI. The exam must be completed
 * in the proctored window. If a non-proctored window is opened, the exam will
 * be ended with an error.
 *
 * This check is necessary to prevent using a second browser to access the exam
 * content unproctored.
 */
function checkExamEntry() {
  return async (dispatch, getState) => {
    const {
      exam
    } = getState().specialExams;
    const useLegacyAttemptAPI = exam.attempt.use_legacy_attempt_api;
    // Check only applies to LTI exams
    if (!exam?.attempt || exam.attempt.exam_type !== _constants.ExamType.PROCTORED || exam.attempt.use_legacy_attempt_api) {
      return;
    }
    if ((0, _constants.IS_PROCTORED_STATUS)(exam.attempt.attempt_status)) {
      Promise.race([(0, _proctorio.checkAppStatus)(), new Promise((resolve, reject) => {
        setTimeout(() => reject(), EXAM_START_TIMEOUT_MILLISECONDS);
      })]).catch(() => {
        dispatch((0, _slice.setApiError)({
          errorMsg: 'Something has gone wrong with your exam. Proctoring application not detected.'
        }));
        updateAttemptAfter(exam.course_id, exam.content_id, (0, _api.endExamWithFailure)(exam.attempt.attempt_id, 'exam reentry disallowed', useLegacyAttemptAPI))(dispatch);
      });
    }
  };
}
//# sourceMappingURL=thunks.js.map