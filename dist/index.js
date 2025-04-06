"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.beaconProxyCode = exports.proxyCode = exports.deployBeaconProxy = exports.deployProxy = void 0;
const code_1 = require("./code");
Object.defineProperty(exports, "proxyCode", { enumerable: true, get: function () { return code_1.proxyCode; } });
Object.defineProperty(exports, "beaconProxyCode", { enumerable: true, get: function () { return code_1.beaconProxyCode; } });
const tx_1 = require("./tx");
function deployProxy(implementationAddress) {
    return (0, tx_1.deployTx)((0, code_1.proxyCode)(implementationAddress));
}
exports.deployProxy = deployProxy;
function deployBeaconProxy(beaconAddress) {
    return (0, tx_1.deployTx)((0, code_1.beaconProxyCode)(beaconAddress));
}
exports.deployBeaconProxy = deployBeaconProxy;
