"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.beaconProxyCode = exports.proxyCode = void 0;
const MinProxy_json_1 = __importDefault(require("./bytecodes/MinProxy.json"));
const MinBeaconProxy_json_1 = __importDefault(require("./bytecodes/MinBeaconProxy.json"));
const hexAddrPattern = /^0x?(?<hexPart>[0-9A-Fa-f]{40})$/;
function hexAddr(inputAddr) {
    const match = inputAddr.match(hexAddrPattern);
    if (!match)
        throw new Error("invalid address");
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return match.groups.hexPart.toLowerCase();
}
function proxyCode(implementationAddress) {
    const segments = MinProxy_json_1.default;
    return `0x${segments[0]}${hexAddr(implementationAddress)}${segments[1]}`;
}
exports.proxyCode = proxyCode;
function beaconProxyCode(beaconAddress) {
    const segments = MinBeaconProxy_json_1.default;
    return `0x${segments[0]}${hexAddr(beaconAddress)}${segments[1]}`;
}
exports.beaconProxyCode = beaconProxyCode;
