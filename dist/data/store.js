"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _toolkit = require("@reduxjs/toolkit");
var _slice = _interopRequireDefault(require("./slice"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = exports["default"] = (0, _toolkit.configureStore)({
  reducer: {
    examState: _slice["default"]
  }
});
//# sourceMappingURL=store.js.map