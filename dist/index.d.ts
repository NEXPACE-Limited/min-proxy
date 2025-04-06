import { proxyCode, beaconProxyCode } from "./code";
export declare function deployProxy(implementationAddress: string): {
    data: string;
    to: undefined;
};
export declare function deployBeaconProxy(beaconAddress: string): {
    data: string;
    to: undefined;
};
export { proxyCode, beaconProxyCode };
