"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useIsExam = exports.useFetchExamAccessToken = exports.useExamAccessToken = void 0;
var _reactRedux = require("react-redux");
var _data = require("./data");
const useIsExam = () => {
  const {
    exam
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  return !!exam?.id;
};
exports.useIsExam = useIsExam;
const useExamAccessToken = () => {
  const {
    exam,
    examAccessToken
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  if (!exam) {
    return '';
  }
  return examAccessToken.exam_access_token;
};
exports.useExamAccessToken = useExamAccessToken;
const useFetchExamAccessToken = () => {
  const {
    exam
  } = (0, _reactRedux.useSelector)(state => state.specialExams);
  const dispatch = (0, _reactRedux.useDispatch)();
  if (!exam) {
    return Promise.resolve();
  }
  return () => dispatch((0, _data.examRequiresAccessToken)());
};
exports.useFetchExamAccessToken = useFetchExamAccessToken;
//# sourceMappingURL=api.js.map