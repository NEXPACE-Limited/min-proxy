import { proxyCode, beaconProxyCode } from "./code";
import { deployTx } from "./tx";

export function deployProxy(implementationAddress: string) {
  return deployTx(proxyCode(implementationAddress));
}

export function deployBeaconProxy(beaconAddress: string) {
  return deployTx(beaconProxyCode(beaconAddress));
}

export { proxyCode, beaconProxyCode };
