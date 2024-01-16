"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordPattern = void 0;
const passwordPattern = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])[A-Za-z\d!@#$%^&*-]{6,}$/);
exports.passwordPattern = passwordPattern;
