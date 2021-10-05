
//updating IDs 237 (Mythical Cacti) back, and 238 (Godlike Cacti) back 

import { run, ethers, network } from "hardhat";

import {
  wearablesLeftSvgs,
  wearablesRightSvgs,
  wearablesBackSvgs,
} from "../../svgs/wearables-sides";

import { sideViewDimensions6, sideViewDimensions8 } from "../../svgs/sideViewDimensions";

import { UpdateSvgsTaskArgs } from "../../tasks/updateSvgs";
import {
  convertSideDimensionsArrayToString,
  convertDimensionsArrayToString,
  UpdateItemDimensionsTaskArgs,
} from "../../tasks/updateItemDimensions";
import { SideDimensions } from "../itemTypeHelpers";

import { SvgFacet } from "../../typechain";
import { uploadOrUpdateSvg } from "../svgHelperFunctions";
import { Signer } from "@ethersproject/abstract-signer";
import { gasPrice } from "../helperFunctions";

async function main() {
  const diamondAddress = "0x86935F11C86623deC8a25696E1C19a8659CbF95d";
  let itemManager = "0xa370f2ADd2A9Fba8759147995d6A0641F8d7C119";
  let signer: Signer;

  const testing = ["hardhat", "localhost"].includes(network.name);

  if (testing) {
    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [itemManager],
    });
    signer = await ethers.getSigner(itemManager);
  } else if (network.name === "matic") {
    const accounts = await ethers.getSigners();
    signer = accounts[0]; //new LedgerSigner(ethers.provider);

    console.log("signer:", signer);
  } else {
    throw Error("Incorrect network selected");
  }

  console.log("Updating Wearables");
  const itemIds = [
    237, 238,
  ];

 /*  const svgFacet = (await ethers.getContractAt(
    "SvgFacet",
    diamondAddress,
    signer
  )) as SvgFacet; */

  for (let index = 0; index < itemIds.length; index++) {
    const itemId = itemIds[index];

    console.log("Updating SVGs for id: ", itemId);

    const left = wearablesLeftSvgs[itemId];
    const right = wearablesRightSvgs[itemId];
    const back = wearablesBackSvgs[itemId];

    let taskArgsLeft: UpdateSvgsTaskArgs = {
      svgIds: [itemId].join(","),
      svgType: "wearables-left",
      svgs: [left].join("***"),
    }
    await run("updateSvgs", taskArgsLeft);

    let taskArgsRight: UpdateSvgsTaskArgs = {
      svgIds: [itemId].join(","),
      svgType: "wearables-right",
      svgs: [right].join("***"),
    }
    await run("updateSvgs", taskArgsRight); 

    let taskArgsBack: UpdateSvgsTaskArgs = {
      svgIds: [itemId].join(","),
      svgType: "wearables-back",
      svgs: [back].join("***"),
    }
    await run("updateSvgs", taskArgsBack); 

/*     try {
      await uploadOrUpdateSvg(left, "wearables-left", itemId, svgFacet, ethers);
      await uploadOrUpdateSvg(
        right,
        "wearables-right",
        itemId,
        svgFacet,
        ethers
      );
      await uploadOrUpdateSvg(back, "wearables-back", itemId, svgFacet, ethers);
    } catch (error) {
      console.log("error uploading", itemId);
    } */
  }

  //dimensions
/*   const sideViewDimensions = [
    sideViewDimensions6,
    sideViewDimensions8,
  ]; */
  

for (let index = 0; index < sideViewDimensions6.length; index++){
  const itemId = sideViewDimensions6[index];

  const sideDimensionsTaskArgs: UpdateItemDimensionsTaskArgs = {
    itemIds: itemId.toString(),
    side: itemId.side,
    dimensions: convertSideDimensionsArrayToString(itemId.dimensions),
  };
  await run("updateItemDimensions", sideDimensionsTaskArgs);
}

for (let index = 0; index < sideViewDimensions8.length; index++){
  const itemId = sideViewDimensions8[index];

  const sideDimensionsTaskArgs: UpdateItemDimensionsTaskArgs = {
    itemIds: itemId.toString(),
    side: itemId.side,
    dimensions: convertSideDimensionsArrayToString(itemId.dimensions),
  };
  await run("updateItemDimensions", sideDimensionsTaskArgs);
}

  const svgViewsFacet = await ethers.getContractAt(
    "SvgViewsFacet",
    diamondAddress,
    signer
  );

  /* console.log("Update dimensions6");
  let tx = await svgViewsFacet.setSideViewDimensions(sideViewDimensions6, {
    gasPrice: gasPrice,
  });
  let receipt = await tx.wait();
  if (!receipt.status) {
    throw Error(`Error:: ${tx.hash}`);
  }

  console.log("Update dimensions8");
  tx = await svgViewsFacet.setSideViewDimensions(sideViewDimensions8, {
    gasPrice: gasPrice,
  });
  receipt = await tx.wait();
  if (!receipt.status) {
    throw Error(`Error:: ${tx.hash}`);
  }
 */
    // // **** Test ****
  // // BODY = 0;
  // // FACE = 1;
  // // EYES = 2;
  // // HEAD = 3;
  // // RIGHT = 4;
  // // LEFT = 5;
  // // PET = 6;
  // // BG = 7;

  let numTraits1 : [number,number,number,number,number,number]=[99, 99, 99, 99, 12, 9];
  let wearables1 :[
    number,number,number,number,
    number,number,number,number,
    number,number,number,number,
    number,number,number,number
  ]= [0, 0, 0, 0, 0, 0, 237, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const sidePreview = await svgViewsFacet.previewSideAavegotchi(
    "2",
    "0xE0b22E0037B130A9F56bBb537684E6fA18192341",
    numTraits1,
    wearables1
  );
  console.log("Side Preview: ", sidePreview);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

exports.addR5sideViews = main;
