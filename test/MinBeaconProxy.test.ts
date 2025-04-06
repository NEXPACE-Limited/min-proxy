import { expect } from "chai";
import { ethers } from "hardhat";
import { ContractTransaction } from "ethers";
import { IBeacon, IIncGet } from "../typechain-types";
import { DeployedEvent } from "../typechain-types/contracts/test/MockProxyFactory";
import { beaconProxyCode, deployBeaconProxy } from "../lib";

async function deployed(tx: ContractTransaction | PromiseLike<ContractTransaction>) {
  const events = (await (await tx).wait()).events ?? [];
  const event = events.find((e) => e.event === "Deployed");
  if (!event) throw new Error("no contract deployed");
  return (event as DeployedEvent).args.contractAddress;
}

describe("MinBeaconProxy", () => {
  const expectGet = async (proxy: IIncGet, value: bigint) => expect((await proxy.get()).toBigInt()).to.eq(value);

  it("code", async () => {
    const test = await (await ethers.getContractFactory("MockProxyFactory")).deploy();
    const impl1 = await (await ethers.getContractFactory("DummyImpl1")).deploy();
    expect(await test.beaconProxyCode(impl1.address)).to.eq(beaconProxyCode(impl1.address));
  });

  it("should work", async () => {
    const test = await (await ethers.getContractFactory("MockProxyFactory")).deploy();
    const deploy = async (impl: IBeacon) =>
      await ethers.getContractAt("IIncGet", await deployed(test.createBeaconProxy(impl.address)));

    const impl1 = await (await ethers.getContractFactory("DummyImpl1")).deploy();
    const impl2 = await (await ethers.getContractFactory("DummyImpl2")).deploy();
    const beacon = await (await ethers.getContractFactory("UpgradeableBeacon")).deploy(impl1.address);

    const proxy1 = await deploy(beacon);
    await expectGet(proxy1, 35n);
    await proxy1.inc();
    await expectGet(proxy1, 36n);

    const proxy2 = await deploy(beacon);
    await expectGet(proxy2, 35n);
    await proxy2.inc();
    await proxy2.inc();
    await expectGet(proxy2, 37n);
    await expectGet(proxy1, 36n);

    await beacon.upgradeTo(impl2.address);
    await expectGet(proxy1, 22n);
    await expectGet(proxy2, 23n);

    const proxy3 = await deploy(beacon);
    await expectGet(proxy3, 21n);
    await proxy3.inc();
    await expectGet(proxy3, 23n);
  });

  it("manual deploy", async () => {
    const [signer] = await ethers.getSigners();
    const impl1 = await (await ethers.getContractFactory("DummyImpl1")).deploy();
    const beacon = await (await ethers.getContractFactory("UpgradeableBeacon")).deploy(impl1.address);
    const receipt = await (await signer.sendTransaction(deployBeaconProxy(beacon.address))).wait();
    expect(receipt).to.have.property("status", 1);
    const proxy1 = await ethers.getContractAt("IIncGet", receipt.contractAddress);
    await expectGet(proxy1, 35n);
    await proxy1.inc();
    await expectGet(proxy1, 36n);
  });
});
