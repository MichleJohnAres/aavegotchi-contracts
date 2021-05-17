const { LedgerSigner } = require('@ethersproject/hardware-wallets')

function getSelectors (contract) {
  const signatures = Object.keys(contract.interface.functions)
  const selectors = signatures.reduce((acc, val) => {
    if (val !== 'init(bytes)') {
      acc.push(contract.interface.getSighash(val))
    }
    return acc
  }, [])
  return selectors
}

function getSelector (func) {
  const abiInterface = new ethers.utils.Interface([func])
  return abiInterface.getSighash(ethers.utils.Fragment.from(func))
}

async function main () {
  const diamondAddress = '0x86935F11C86623deC8a25696E1C19a8659CbF95d'
  let signer
  let facet
  let owner = await (await ethers.getContractAt('OwnershipFacet', diamondAddress)).owner()
  const testing = ['hardhat', 'localhost'].includes(hre.network.name)

  if (testing) {
    await hre.network.provider.request({
      method: 'hardhat_impersonateAccount',
      params: [owner]
    })
    signer = await ethers.getSigner(owner)
  } else if (hre.network.name === 'matic') {
    signer = new LedgerSigner(ethers.provider)
  } else {
    throw Error('Incorrect network selected')
  }

  const daoFacet = await ethers.getContractFactory('contracts/Aavegotchi/facets/DAOFacet.sol:DAOFacet')
  const svgFacet=  await ethers.getContractFactory('contracts/Aavegotchi/facets/SvgFacet.sol:SvgFacet')
  facet1 = await daoFacet.deploy()
  facet2= await svgFacet.deploy()
  await facet1.deployed()
  await facet2.deployed()
  console.log('Deployed daofacet:', facet1.address)
  console.log('Deployed svgFacet:', facet2.address)

  const newDaoFuncs = [
    getSelector('function addItemManagers(address[] calldata _newItemManagers) external'),
    getSelector('function removeItemManagers(address[] calldata _itemManagers) external ') 
    ]

   let existingDaoFuncs = getSelectors(facet1)
   let existingSvgFuncs = getSelectors(facet2)

  existingDaoFuncs = existingDaoFuncs.filter(selector => !newDaoFuncs.includes(selector))

  const FacetCutAction = { Add: 0, Replace: 1, Remove: 2 }

  const cut = [
    {
      facetAddress: facet1.address,
      action: FacetCutAction.Add,
      functionSelectors: newDaoFuncs
    },
    {
      facetAddress: facet1.address,
      action: FacetCutAction.Replace,
      functionSelectors: existingDaoFuncs
    },
   
    {
      facetAddress: facet2.address,
      action: FacetCutAction.Replace,
      functionSelectors: existingSvgFuncs
      
    },
  ]
  console.log(cut)

  const diamondCut = (await ethers.getContractAt('IDiamondCut', diamondAddress)).connect(signer)
  let tx
  let receipt


  if(testing) {
    console.log('Diamond cut');
    tx = await diamondCut.diamondCut(cut, ethers.constants.AddressZero, '0x', { gasLimit: 8000000 });
    console.log('Diamond cut tx:', tx.hash)
    receipt = await tx.wait();
    if (!receipt.status) {
       throw Error(`Diamond upgrade failed: ${tx.hash}`)
     }
    console.log('Completed diamond cut: ', tx.hash);

  } else {
     console.log('Diamond cut');
     tx = await diamondCut.populateTransaction.diamondCut(cut, ethers.constants.AddressZero, '0x', { gasLimit: 800000 });
     await sendToMultisig(process.env.DIAMOND_UPGRADER, signer, tx);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })

  exports.itemManager = main;
