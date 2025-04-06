// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import { MinProxy } from "../MinProxy.sol";

contract MockProxyFactory {
    event Deployed(address contractAddress);

    function createProxy(address impl) external {
        emit Deployed(MinProxy.createProxy(impl));
    }

    function createBeaconProxy(address beacon) external {
        emit Deployed(MinProxy.createBeaconProxy(beacon));
    }

    function proxyCode(address impl) external pure returns (bytes memory) {
        return MinProxy.proxyCode(impl);
    }

    function beaconProxyCode(address beacon) external pure returns (bytes memory) {
        return MinProxy.beaconProxyCode(beacon);
    }
}
