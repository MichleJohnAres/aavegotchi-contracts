import { Signer } from "@ethersproject/abstract-signer";
import { Contract } from "@ethersproject/contracts";
import request from "graphql-request";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { snapshotGraphUrl } from "../helpers/constants";
import { DiamondLoupeFacet, OwnershipFacet } from "../typechain";
import * as fs from "fs";
import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from "defender-relay-client/lib/ethers";

export const gasPrice = 270000000000;

export function delay(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function impersonate(
  address: string,
  contract: any,
  ethers: any,
  network: any
) {
  await network.provider.request({
    method: "hardhat_impersonateAccount",
    params: [address],
  });
  let signer = await ethers.getSigner(address);
  contract = contract.connect(signer);
  return contract;
}

export async function resetChain(hre: any) {
  await hre.network.provider.request({
    method: "hardhat_reset",
    params: [
      {
        forking: {
          jsonRpcUrl: process.env.MATIC_URL,
        },
      },
    ],
  });
}

export function getSighashes(selectors: string[], ethers: any): string[] {
  if (selectors.length === 0) return [];
  const sighashes: string[] = [];
  selectors.forEach((selector) => {
    if (selector !== "") sighashes.push(getSelector(selector, ethers));
  });
  return sighashes;
}

export function getSelectors(contract: Contract) {
  const signatures = Object.keys(contract.interface.functions);
  const selectors = signatures.reduce((acc: string[], val: string) => {
    if (val !== "init(bytes)") {
      acc.push(contract.interface.getSighash(val));
    }
    return acc;
  }, []);
  return selectors;
}

export function getSelector(func: string, ethers: any) {
  const abiInterface = new ethers.utils.Interface([func]);
  return abiInterface.getSighash(ethers.utils.Fragment.from(func));
}

export const maticDiamondAddress = "0x86935F11C86623deC8a25696E1C19a8659CbF95d";

export const maticDiamondUpgrader =
  "0x35fe3df776474a7b24b3b1ec6e745a830fdad351";

export const itemManager = "0xa370f2ADd2A9Fba8759147995d6A0641F8d7C119";

export const itemManagerAlt = "0x8D46fd7160940d89dA026D59B2e819208E714E82";

export const gameManager = "0xa370f2ADd2A9Fba8759147995d6A0641F8d7C119";

export const maticRealmDiamondAddress =
  "0x1D0360BaC7299C86Ec8E99d0c1C9A95FEfaF2a11";

export const maticFakeGotchiCards =
  "0x9f6BcC63e86D44c46e85564E9383E650dc0b56D7";

export const maticFakeGotchiArt = "0xA4E3513c98b30d4D7cc578d2C328Bd550725D1D0";

export async function diamondOwner(address: string, ethers: any) {
  return await (await ethers.getContractAt("OwnershipFacet", address)).owner();
}

export async function getFunctionsForFacet(facetAddress: string, ethers: any) {
  const Loupe = (await ethers.getContractAt(
    "DiamondLoupeFacet",
    maticDiamondAddress
  )) as DiamondLoupeFacet;
  const functions = await Loupe.facetFunctionSelectors(facetAddress);
  return functions;
}

export async function getDiamondSigner(
  hre: HardhatRuntimeEnvironment,
  override?: string,
  useLedger?: boolean
) {
  //Instantiate the Signer
  let signer: Signer;
  const owner = await (
    (await hre.ethers.getContractAt(
      "OwnershipFacet",
      maticDiamondAddress
    )) as OwnershipFacet
  ).owner();
  const testing = ["hardhat", "localhost"].includes(hre.network.name);

  if (testing) {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [override ? override : owner],
    });
    return await hre.ethers.getSigner(override ? override : owner);
  } else if (hre.network.name === "matic") {
    return (await hre.ethers.getSigners())[0];
  } else {
    throw Error("Incorrect network selected");
  }
}

export interface rfRankingScore {
  rfType: string;
  gotchiId: string;
  score: number;
}

export async function getRfSznTypeRanking(rounds: string[][], _rfType: string) {
  console.log("*** " + _rfType + " ***");
  const idsArray: number[] = [];

  let ranking = await setRfTypeObject(rounds[0], _rfType);

  for (let i = 1; i < rounds.length; i++) {
    ranking = await compareScoreArrays(ranking, rounds[i], _rfType);
  }

  const finalRanking: rfRankingScore[] = ranking.sort((a, b) => {
    if (a.score > b.score) {
      return 1;
    } else if (a.score < b.score) {
      return -1;
    } else {
      return 0;
    }
  });
  // console.log(_rfType + " : " + finalRanking);
  for (let x = 0; x < finalRanking.length; x++) {
    idsArray.push(Number(finalRanking[x].gotchiId));
  }
  return idsArray;
}

export async function setRfTypeObject(rnd: string[], _rfType: string) {
  const ranking = [];

  for (let i = 0; i < rnd.length; i++) {
    let score: rfRankingScore = {
      rfType: _rfType,
      gotchiId: rnd[i],
      score: i,
    };
    ranking.push(score);
  }
  return ranking;
}

export async function compareScoreArrays(
  arr1: rfRankingScore[],
  arr2: string[],
  _rfType: string
) {
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i].gotchiId)) {
      arr1[i].score += arr2.indexOf(arr1[i].gotchiId);
    }
  }
  return arr1;
}

export async function getPlaayersIds(round: string[][]) {
  console.log("*** RAANKED ***");
  const array: string[] = round[0];

  for (let i = 0; i < round.length; i++) {
    for (let x = 0; x < round[i].length; x++) {
      if (!array.includes(round[i][x])) {
        array.push(round[i][x]);
      }
    }
  }
  return array;
}

export async function hasDuplicateGotchiIds(_array: string[]) {
  let valuesSoFar = Object.create(null);
  for (let i = 0; i < _array.length; ++i) {
    let value = _array[i];
    if (value in valuesSoFar) {
      return true;
    }
    valuesSoFar[value] = true;
  }
  return false;
}

interface ProposalTitle {
  proposals: [
    {
      title: string;
    }
  ];
}
export function propType(title: string): "coreprop" | "sigprop" {
  const searchString = "\\[AGIP.*]";
  const regex = new RegExp(searchString);
  const match = title.match(regex);
  if (match) {
    return "coreprop";
  } else {
    return "sigprop";
  }
}

export interface RelayerInfo {
  apiKey: string;
  apiSecret: string;
}

export const xpRelayerAddress = "0xb6384935d68e9858f8385ebeed7db84fc93b1420";

export function getRelayerSigner() {
  const credentials: RelayerInfo = {
    apiKey: process.env.DEFENDER_APIKEY!,
    apiSecret: process.env.DEFENDER_SECRET!,
  };

  const provider = new DefenderRelayProvider(credentials);
  return new DefenderRelaySigner(credentials, provider, {
    speed: "fast",
    validForSeconds: 3600,
  });
}

export function logXPRecipients(
  propType: "sigprop" | "coreprop",
  title: string,
  tokenIds: string[],
  addresses: string[]
) {
  const parentDir = `data/XPRecipients/${propType}`;
  const parentFile = `${parentDir}/${title}.json`;
  if (!fs.existsSync(parentDir)) {
    fs.mkdirSync(parentDir, { recursive: true });
  }
  if (!fs.existsSync(parentFile)) {
    const data = {
      tokenIds,
      addresses,
    };

    fs.writeFileSync(parentFile, JSON.stringify(data));
    console.log("finished writing to file");
  }
}
