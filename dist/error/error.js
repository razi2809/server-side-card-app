"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myError = void 0;
class myError extends Error {
    constructor(message, status) {
        super(message);
        this.name = this.constructor.name;
        this.status = status;
    }
}
exports.myError = myError;
