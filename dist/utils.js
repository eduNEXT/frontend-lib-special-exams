"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
// Helper, that is used to forcibly finalize all promises
// in thunk before running matcher against state.
const executeThunk = async (thunk, dispatch, getState) => {
  await thunk(dispatch, getState);
  await new Promise(setImmediate);
};
var _default = exports.default = executeThunk;
//# sourceMappingURL=utils.js.map