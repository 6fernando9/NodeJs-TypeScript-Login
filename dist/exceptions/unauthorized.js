"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = void 0;
const root_1 = require("./root");
class UnauthorizedException extends root_1.HttpException {
    constructor(mensaje, errorCode) {
        super(mensaje, errorCode, 404, null);
    }
}
exports.UnauthorizedException = UnauthorizedException;
