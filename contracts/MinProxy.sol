// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import { MinProxyGetCode } from "./gen/MinProxy.sol";
import { MinBeaconProxyGetCode } from "./gen/MinBeaconProxy.sol";

library MinProxy {
    function proxyCode(address impl) internal pure returns (bytes memory) {
        return MinProxyGetCode.getCode(impl);
    }

    function beaconProxyCode(address beacon) internal pure returns (bytes memory) {
        return MinBeaconProxyGetCode.getCode(beacon);
    }

    function createProxy(address impl) internal returns (address) {
        return _create(proxyCode(impl));
    }

    function createBeaconProxy(address beacon) internal returns (address) {
        return _create(beaconProxyCode(beacon));
    }

    function _create(bytes memory code) private returns (address deployed) {
        assembly {
            deployed := create(0, add(code, 0x20), mload(code))
        }
        require(deployed != address(0), "MinProxy/zeroAddress: create failed");
    }
}
