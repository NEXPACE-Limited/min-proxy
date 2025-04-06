"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployTx = void 0;
function deployTx(code) {
    return {
        data: code,
        to: undefined,
    };
}
exports.deployTx = deployTx;
