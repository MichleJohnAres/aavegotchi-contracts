/* global ethers hre */
const { getH2Collaterals } = require("./collateralTypesHaunt2.js");
const collateralsSvgs = require("../svgs/collateralsH2.js");
const { eyeShapeSvgs } = require("../svgs/eyeShapesH2.js");
const { addPayload } = require("./upgrades/upgrade-hauntPayload.js");

let signer, daoFacet;
async function main() {
  console.log("upgrading");
  await addPayload();
  const aavegotchiDiamondAddress = "0x86935F11C86623deC8a25696E1C19a8659CbF95d";
  const itemManager = "0xa370f2ADd2A9Fba8759147995d6A0641F8d7C119";

  const testing = ["hardhat", "localhost"].includes(hre.network.name);
  if (testing) {
    await hre.network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [itemManager],
    });

    signer = await ethers.provider.getSigner(itemManager);
  } else if (hre.network.name === "matic") {
    signer = new LedgerSigner(ethers.provider);
  } else {
    throw Error("Incorrect network selected");
  }

  let svg, svgTypesAndSizes;
  function setupSvg(...svgData) {
    const svgTypesAndSizes = [];
    const svgItems = [];
    for (const [svgType, svg] of svgData) {
      svgItems.push(svg.join(""));
      svgTypesAndSizes.push([
        ethers.utils.formatBytes32String(svgType),
        svg.map((value) => value.length),
      ]);
    }
    return [svgItems.join(""), svgTypesAndSizes];
  }

  // eslint-disable-next-line no-unused-vars
  function printSizeInfo(svgTypesAndSizes) {
    console.log("------------- SVG Size Info ---------------");
    let sizes = 0;
    for (const [svgType, size] of svgTypesAndSizes) {
      console.log(ethers.utils.parseBytes32String(svgType) + ":" + size);
      for (const nextSize of size) {
        sizes += nextSize;
      }
    }
    console.log("Total sizes:" + sizes);
  }

  const _hauntMaxSize = 15000;
  const portalPrice = 0; //GBM
  const _bodyColor = 0x1f; //test color
  const _collateralTypes = getH2Collaterals();
  const H2Svgs = collateralsSvgs;

  [svg, svgTypesAndSizes] = setupSvg(["collaterals", collateralsSvgs]);
  printSizeInfo(svgTypesAndSizes);
  const _collTypes = [];
  _collTypes.push(svg, svgTypesAndSizes);

  const eyeShapes = eyeShapeSvgs;
  [svg, svgTypesAndSizes] = setupSvg(["eyeShapesH2", eyeShapeSvgs]);
  printSizeInfo(svgTypesAndSizes);
  const eyeShapesTypes = [];
  eyeShapesTypes.push(svg, svgTypesAndSizes);

  const totalPayload = [];

  totalPayload.push(
    _hauntMaxSize,
    portalPrice,
    _bodyColor,
    _collateralTypes,
    H2Svgs,
    _collTypes,
    eyeShapes,
    eyeShapesTypes
  );
  daoFacet = (
    await ethers.getContractAt("DAOFacet", aavegotchiDiamondAddress)
  ).connect(signer);

  if (testing) {
    const tx = await daoFacet.createHauntPayload(totalPayload, {
      gasLimit: 15000000,
    });
    const receipt = await tx.wait();
    if (!receipt.status) {
      throw Error(`Error creating haunt: ${tx.hash}`);
    }
    console.log("Haunt created:", tx.hash);
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
