"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setReviewPolicy = exports.setProctoringSettings = exports.setIsLoading = exports.setExamState = exports.setExamAccessToken = exports.setApiError = exports.setAllowProctoringOptOut = exports.setActiveAttempt = exports.expireExamAttempt = exports.examSlice = exports.default = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _helpers = require("../helpers");
/* eslint-disable no-param-reassign */
const examSlice = exports.examSlice = (0, _toolkit.createSlice)({
  name: 'exam',
  initialState: {
    isLoading: true,
    timeIsOver: false,
    activeAttempt: null,
    // has the same structure as attempt in exam object
    allowProctoringOptOut: false,
    proctoringSettings: {
      exam_proctoring_backend: {
        download_url: '',
        instructions: [],
        name: '',
        rules: {}
      },
      provider_tech_support_email: '',
      provider_tech_support_phone: '',
      provider_tech_support_url: '',
      provider_name: '',
      learner_notification_from_email: '',
      integration_specific_email: ''
    },
    exam: {
      id: null,
      course_id: '',
      content_id: '',
      external_id: '',
      exam_name: '',
      time_limit_mins: null,
      is_proctored: false,
      is_practice_exam: false,
      is_active: true,
      due_date: null,
      hide_after_due: false,
      backend: '',
      prerequisite_status: {
        are_prerequisites_satisifed: true,
        satisfied_prerequisites: [],
        failed_prerequisites: [],
        pending_prerequisites: [],
        declined_prerequisites: []
      },
      attempt: {
        in_timed_exam: true,
        taking_as_proctored: true,
        exam_type: '',
        exam_display_name: '',
        exam_url_path: '',
        time_remaining_seconds: null,
        course_id: '',
        attempt_id: null,
        attempt_status: '',
        exam_started_poll_url: '',
        desktop_application_js_url: '',
        ping_interval: null,
        attempt_code: '',
        external_id: '',
        use_legacy_attempt_api: true
      },
      type: ''
    },
    apiErrorMsg: '',
    examAccessToken: {
      exam_access_token: '',
      exam_access_token_expiration: ''
    }
  },
  reducers: {
    setAllowProctoringOptOut: (state, _ref) => {
      let {
        payload
      } = _ref;
      state.allowProctoringOptOut = payload.allowProctoringOptOut;
    },
    setIsLoading: (state, _ref2) => {
      let {
        payload
      } = _ref2;
      state.isLoading = payload.isLoading;
    },
    setExamState: (state, _ref3) => {
      let {
        payload
      } = _ref3;
      state.exam = payload.exam;
      state.activeAttempt = (0, _helpers.appendTimerEnd)(payload.activeAttempt);
    },
    setActiveAttempt: (state, _ref4) => {
      let {
        payload
      } = _ref4;
      state.activeAttempt = (0, _helpers.appendTimerEnd)(payload.activeAttempt);
      state.apiErrorMsg = '';
    },
    setProctoringSettings: (state, _ref5) => {
      let {
        payload
      } = _ref5;
      state.proctoringSettings = payload.proctoringSettings;
    },
    setExamAccessToken: (state, _ref6) => {
      let {
        payload
      } = _ref6;
      state.examAccessToken = payload.examAccessToken;
    },
    expireExamAttempt: state => {
      state.timeIsOver = true;
    },
    setReviewPolicy: (state, _ref7) => {
      let {
        payload
      } = _ref7;
      state.exam.reviewPolicy = payload.policy;
    },
    setApiError: (state, _ref8) => {
      let {
        payload
      } = _ref8;
      state.apiErrorMsg = payload.errorMsg;
    }
  }
});
const {
  setIsLoading,
  setExamState,
  expireExamAttempt,
  setActiveAttempt,
  setProctoringSettings,
  setExamAccessToken,
  setReviewPolicy,
  setApiError,
  setAllowProctoringOptOut
} = examSlice.actions;
exports.setAllowProctoringOptOut = setAllowProctoringOptOut;
exports.setApiError = setApiError;
exports.setReviewPolicy = setReviewPolicy;
exports.setExamAccessToken = setExamAccessToken;
exports.setProctoringSettings = setProctoringSettings;
exports.setActiveAttempt = setActiveAttempt;
exports.expireExamAttempt = expireExamAttempt;
exports.setExamState = setExamState;
exports.setIsLoading = setIsLoading;
var _default = exports.default = examSlice.reducer;
//# sourceMappingURL=slice.js.map