"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.continueAttempt = continueAttempt;
exports.createExamAttempt = createExamAttempt;
exports.declineAttempt = declineAttempt;
exports.endExamWithFailure = endExamWithFailure;
exports.fetchExamAccessToken = fetchExamAccessToken;
exports.fetchExamAttemptsData = fetchExamAttemptsData;
exports.fetchExamReviewPolicy = fetchExamReviewPolicy;
exports.fetchLatestAttempt = fetchLatestAttempt;
exports.fetchProctoringSettings = fetchProctoringSettings;
exports.pollExamAttempt = pollExamAttempt;
exports.resetAttempt = resetAttempt;
exports.softwareDownloadAttempt = softwareDownloadAttempt;
exports.stopAttempt = stopAttempt;
exports.submitAttempt = submitAttempt;
exports.updateAttemptStatus = updateAttemptStatus;
var _frontendPlatform = require("@edx/frontend-platform");
var _auth = require("@edx/frontend-platform/auth");
var _constants = require("../constants");
var _helpers = require("../helpers");
const BASE_API_URL = '/api/edx_proctoring/v1/proctored_exam/attempt';
async function fetchActiveAttempt() {
  // fetch 'active' (timer is running) attempt if it exists
  const activeAttemptUrl = new URL(`${(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL}/api/v1/exams/attempt/latest`);
  const activeAttemptResponse = await (0, _auth.getAuthenticatedHttpClient)().get(activeAttemptUrl.href);
  return activeAttemptResponse.data;
}
async function fetchAttemptForExamSequnceId(sequenceId) {
  const attemptUrl = new URL(`${(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL}/api/v1/exams/attempt/latest`);
  // the calls the same endpoint as fetchActiveAttempt but it behaves slightly different
  // with an exam's section specified. The attempt for that requested exam is always returned
  // even if it is not 'active' (timer is not running)
  attemptUrl.searchParams.append('content_id', sequenceId);
  const attemptResponse = await (0, _auth.getAuthenticatedHttpClient)().get(attemptUrl.href);
  return attemptResponse.data;
}
async function fetchExamAttemptsData(courseId, sequenceId) {
  let data;
  if (!(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL) {
    const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}${BASE_API_URL}/course_id/${courseId}`);
    url.searchParams.append('content_id', sequenceId);
    url.searchParams.append('is_learning_mfe', true);
    const urlResponse = await (0, _auth.getAuthenticatedHttpClient)().get(url.href);
    data = urlResponse.data;
  } else {
    const examUrl = new URL(`${(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL}/api/v1/student/exam/attempt/course_id/${courseId}/content_id/${sequenceId}`);
    const examResponse = await (0, _auth.getAuthenticatedHttpClient)().get(examUrl.href);
    data = examResponse.data;

    // humanize total time if response is from edx-exams
    data.exam.total_time = Number.isInteger(data.exam.total_time) ? (0, _helpers.generateHumanizedTime)(data.exam.total_time * 60) : data.exam.total_time;
    const attemptData = await fetchActiveAttempt();
    data.active_attempt = attemptData;
  }
  return data;
}
async function fetchLatestAttempt(courseId) {
  let data;
  if (!(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL) {
    const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}${BASE_API_URL}/course_id/${courseId}`);
    url.searchParams.append('is_learning_mfe', true);
    const urlResponse = await (0, _auth.getAuthenticatedHttpClient)().get(url.href);
    data = urlResponse.data;
  } else {
    // initialize data dictionary to be similar to what edx-proctoring returns
    data = {
      exam: {}
    };
    const attemptData = await fetchActiveAttempt();
    data.active_attempt = attemptData;
  }
  return data;
}
async function pollExamAttempt(pollUrl, sequenceId) {
  let data;

  // sites configured with only edx-proctoring must have pollUrl set
  if (pollUrl) {
    const edxProctoringURL = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}${pollUrl}`);
    const urlResponse = await (0, _auth.getAuthenticatedHttpClient)().get(edxProctoringURL.href);
    data = urlResponse.data;
    return data;

    // exams configured with edx-exams expect sequenceId if pollUrl is not set when viewing the exam sequence
  }
  if (sequenceId) {
    data = await fetchAttemptForExamSequnceId(sequenceId);
    // outside the exam sequence, we can't get the sequenceId easily, so here we just call the last active attempt
  } else {
    data = await fetchActiveAttempt();
  }

  // Update dictionaries returned by edx-exams to have correct status key for legacy compatibility
  if (data.attempt_status) {
    data.status = data.attempt_status;
    delete data.attempt_status;
  }
  return data;
}
async function createExamAttempt(examId, legacyAttempt) {
  let startClock = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  let attemptProctored = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  let urlString;
  if (!(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL || legacyAttempt) {
    urlString = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}${BASE_API_URL}`;
  } else {
    urlString = `${(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL}/api/v1/exams/attempt`;
  }
  const url = new URL(urlString);
  const payload = {
    exam_id: examId,
    start_clock: startClock.toString(),
    attempt_proctored: attemptProctored.toString()
  };
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().post(url.href, payload);
  return data;
}
async function updateAttemptStatus(attemptId, action, legacyAttempt) {
  let detail = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  let urlString;
  if (!(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL || legacyAttempt) {
    urlString = `${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}${BASE_API_URL}/${attemptId}`;
  } else {
    urlString = `${(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL}/api/v1/exams/attempt/${attemptId}`;
  }
  const url = new URL(urlString);
  const payload = {
    action
  };
  if (detail) {
    payload.detail = detail;
  }
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().put(url.href, payload);
  return data;
}
async function stopAttempt(attemptId) {
  let legacyAttempt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return updateAttemptStatus(attemptId, _constants.ExamAction.STOP, legacyAttempt);
}
async function continueAttempt(attemptId) {
  let legacyAttempt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return updateAttemptStatus(attemptId, _constants.ExamAction.START, legacyAttempt);
}
async function submitAttempt(attemptId) {
  let legacyAttempt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return updateAttemptStatus(attemptId, _constants.ExamAction.SUBMIT, legacyAttempt);
}
async function resetAttempt(attemptId) {
  let legacyAttempt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return updateAttemptStatus(attemptId, _constants.ExamAction.RESET, legacyAttempt);
}
async function endExamWithFailure(attemptId, error) {
  let legacyAttempt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  return updateAttemptStatus(attemptId, _constants.ExamAction.ERROR, legacyAttempt, error);
}
async function softwareDownloadAttempt(attemptId) {
  let legacyAttempt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return updateAttemptStatus(attemptId, _constants.ExamAction.CLICK_DOWNLOAD_SOFTWARE, legacyAttempt);
}
async function declineAttempt(attemptId) {
  let legacyAttempt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return updateAttemptStatus(attemptId, _constants.ExamAction.DECLINE, legacyAttempt);
}
async function fetchExamReviewPolicy(examId) {
  const url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/edx_proctoring/v1/proctored_exam/review_policy/exam_id/${examId}/`);
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url.href);
  return data;
}
async function fetchProctoringSettings(courseId, examId) {
  let url;
  if (!(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL) {
    url = new URL(`${(0, _frontendPlatform.getConfig)().LMS_BASE_URL}/api/edx_proctoring/v1/proctored_exam/settings/exam_id/${examId}/`);
  } else {
    url = new URL(`${(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL}/api/v1/exam/provider_settings/course_id/${courseId}/exam_id/${examId}`);
  }
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url.href);
  return data;
}
async function fetchExamAccessToken(examId) {
  const url = new URL(`${(0, _frontendPlatform.getConfig)().EXAMS_BASE_URL}/api/v1/access_tokens/exam_id/${examId}/`);
  const {
    data
  } = await (0, _auth.getAuthenticatedHttpClient)().get(url.href);
  return data;
}
//# sourceMappingURL=api.js.map