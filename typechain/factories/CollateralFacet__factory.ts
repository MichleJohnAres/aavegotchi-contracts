/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  CollateralFacet,
  CollateralFacetInterface,
} from "../CollateralFacet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_reduceAmount",
        type: "uint256",
      },
    ],
    name: "DecreaseStake",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_fromTokenId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "uint256",
        name: "_toTokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "experience",
        type: "uint256",
      },
    ],
    name: "ExperienceTransfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_stakeAmount",
        type: "uint256",
      },
    ],
    name: "IncreaseStake",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
    ],
    name: "collateralBalance",
    outputs: [
      {
        internalType: "address",
        name: "collateralType_",
        type: "address",
      },
      {
        internalType: "address",
        name: "escrow_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_collateralId",
        type: "uint256",
      },
    ],
    name: "collateralInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "collateralType",
            type: "address",
          },
          {
            components: [
              {
                internalType: "int16[6]",
                name: "modifiers",
                type: "int16[6]",
              },
              {
                internalType: "bytes3",
                name: "primaryColor",
                type: "bytes3",
              },
              {
                internalType: "bytes3",
                name: "secondaryColor",
                type: "bytes3",
              },
              {
                internalType: "bytes3",
                name: "cheekColor",
                type: "bytes3",
              },
              {
                internalType: "uint8",
                name: "svgId",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "eyeShapeSvgId",
                type: "uint8",
              },
              {
                internalType: "uint16",
                name: "conversionRate",
                type: "uint16",
              },
              {
                internalType: "bool",
                name: "delisted",
                type: "bool",
              },
            ],
            internalType: "struct AavegotchiCollateralTypeInfo",
            name: "collateralTypeInfo",
            type: "tuple",
          },
        ],
        internalType: "struct AavegotchiCollateralTypeIO",
        name: "collateralInfo_",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "collaterals",
    outputs: [
      {
        internalType: "address[]",
        name: "collateralTypes_",
        type: "address[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_toId",
        type: "uint256",
      },
    ],
    name: "decreaseAndDestroy",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_reduceAmount",
        type: "uint256",
      },
    ],
    name: "decreaseStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getCollateralInfo",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "collateralType",
            type: "address",
          },
          {
            components: [
              {
                internalType: "int16[6]",
                name: "modifiers",
                type: "int16[6]",
              },
              {
                internalType: "bytes3",
                name: "primaryColor",
                type: "bytes3",
              },
              {
                internalType: "bytes3",
                name: "secondaryColor",
                type: "bytes3",
              },
              {
                internalType: "bytes3",
                name: "cheekColor",
                type: "bytes3",
              },
              {
                internalType: "uint8",
                name: "svgId",
                type: "uint8",
              },
              {
                internalType: "uint8",
                name: "eyeShapeSvgId",
                type: "uint8",
              },
              {
                internalType: "uint16",
                name: "conversionRate",
                type: "uint16",
              },
              {
                internalType: "bool",
                name: "delisted",
                type: "bool",
              },
            ],
            internalType: "struct AavegotchiCollateralTypeInfo",
            name: "collateralTypeInfo",
            type: "tuple",
          },
        ],
        internalType: "struct AavegotchiCollateralTypeIO[]",
        name: "collateralInfo_",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_tokenId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_stakeAmount",
        type: "uint256",
      },
    ],
    name: "increaseStake",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_collateralToken",
        type: "address",
      },
      {
        internalType: "uint8",
        name: "_svgId",
        type: "uint8",
      },
    ],
    name: "setCollateralEyeShapeSvgId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611c99806100206000396000f3fe608060405234801561001057600080fd5b50600436106100885760003560e01c806349aa1f271161005b57806349aa1f27146100f55780634cd5d1f714610108578063a3ea00f11461012a578063bec10cde1461013d57610088565b806324a6665e1461008d57806324d86f00146100b65780632e0bcb43146100cb5780634113e5ca146100e0575b600080fd5b6100a061009b366004611512565b610150565b6040516100ad9190611b7a565b60405180910390f35b6100c96100c4366004611542565b61029a565b005b6100d3610486565b6040516100ad91906116fb565b6100e86106f6565b6040516100ad91906116ae565b6100c9610103366004611542565b61075b565b61011b610116366004611512565b610d72565b6040516100ad9392919061168a565b6100c96101383660046114a3565b610e46565b6100c961014b366004611542565b610ede565b6101586113b3565b600080601901838154811061017d57634e487b7160e01b600052603260045260246000fd5b60009182526020808320909101546040805180820182526001600160a01b039092168083528085528484529381902081516101c081019092529394509092918301918161010081018260068282826020028201916000905b82829054906101000a900460010b60010b815260200190600201906020826001010492830192600103820291508084116101d55790505050509183525050600191909101546001600160e81b031960e882811b8216602085015263010000008304811b8216604085015266010000000000008304901b16606083015260ff600160481b820481166080840152600160501b8204811660a084015261ffff600160581b83041660c0840152600160681b90910416151560e0909101529052915050919050565b6000828152600d60205260409020600a01548290600160d01b900460ff16156102de5760405162461bcd60e51b81526004016102d590611a18565b60405180910390fd5b6000838152600d60205260409020600a015483906001600160a01b0316610303610fd4565b6001600160a01b0316146103295760405162461bcd60e51b81526004016102d590611a6c565b6000848152600d60205260409020600b01546001600160a01b0316806103615760405162461bcd60e51b81526004016102d59061193a565b6000858152600d60205260408082206009015490516370a0823160e01b81526001600160a01b03909116919082906370a08231906103a3908690600401611676565b60206040518083038186803b1580156103bb57600080fd5b505afa1580156103cf573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f3919061152a565b6000888152600d6020526040902060060154909150806104138884611bb0565b10156104315760405162461bcd60e51b81526004016102d5906119c6565b877f43c2f51b091d7988a9b26b7a0f304df6ca31ce05c86ac8ff6cb581529598b636886040516104619190611b8f565b60405180910390a261047c8385610476610fd4565b8a611031565b5050505050505050565b60606000806019018054806020026020016040519081016040528092919081815260200182805480156104e257602002820191906000526020600020905b81546001600160a01b031681526001909101906020018083116104c4575b50505050509050805167ffffffffffffffff81111561051157634e487b7160e01b600052604160045260246000fd5b60405190808252806020026020018201604052801561054a57816020015b6105376113b3565b81526020019060019003908161052f5790505b50915060005b81518110156106f157600082828151811061057b57634e487b7160e01b600052603260045260246000fd5b60200260200101519050808483815181106105a657634e487b7160e01b600052603260045260246000fd5b6020908102919091018101516001600160a01b03928316905290821660009081529081905260409081902081516101c081019092528161010081018260068282826020028201916000905b82829054906101000a900460010b60010b815260200190600201906020826001010492830192600103820291508084116105f15790505050509183525050600191909101546001600160e81b031960e882811b8216602085015263010000008304811b8216604085015266010000000000008304901b16606083015260ff600160481b820481166080840152600160501b8204811660a084015261ffff600160581b83041660c0840152600160681b90910416151560e09091015284518590849081106106ce57634e487b7160e01b600052603260045260246000fd5b6020026020010151602001819052505080806106e990611c32565b915050610550565b505090565b6060600060190180548060200260200160405190810160405280929190818152602001828054801561075157602002820191906000526020600020905b81546001600160a01b03168152600190910190602001808311610733575b5050505050905090565b6000828152600d60205260409020600a01548290600160d01b900460ff16156107965760405162461bcd60e51b81526004016102d590611a18565b6000838152600d60205260409020600a015483906001600160a01b03166107bb610fd4565b6001600160a01b0316146107e15760405162461bcd60e51b81526004016102d590611a6c565b6000848152600d60205260409020600b01546001600160a01b0316806108195760405162461bcd60e51b81526004016102d59061193a565b838514610897576000858152600d602052604090819020600501549051859087907fdf6a3b0443afce6d49c4e3983c00bd5f97d9dbce878fe8794403702665f7b4c290610867908590611b8f565b60405180910390a36000858152600d602052604081206005018054839290610890908490611b98565b9091555050505b6000858152600d60205260408120600a0180546001600160a01b03191690556108be610fd4565b6001600160a01b0381166000818152600f602090815260408083208b8452825280832054938352600e90915281205492935090916108fe90600190611bb0565b9050808214610a07576001600160a01b0383166000908152600e6020526040812080548390811061093f57634e487b7160e01b600052603260045260246000fd5b90600052602060002090600891828204019190066004029054906101000a900463ffffffff169050806000600e016000866001600160a01b03166001600160a01b0316815260200190815260200160002084815481106109af57634e487b7160e01b600052603260045260246000fd5b600091825260208083206008830401805460079093166004026101000a63ffffffff8181021990941695841602949094179093556001600160a01b0387168252600f8352604080832094909116825292909152208290555b6001600160a01b0383166000908152600e60205260409020805480610a3c57634e487b7160e01b600052603160045260246000fd5b60008281526020808220600860001990940193840401805463ffffffff600460078716026101000a0219169055919092556001600160a01b038086168352600f825260408084208c8552835280842084905560139092529120541615610aee5760008881526013602052604080822080546001600160a01b0319169055518991906001600160a01b038616907f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925908390a45b60405188906000906001600160a01b038616907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef908390a46000888152600d60205260408082206009015490516370a0823160e01b81526001600160a01b03909116919082906370a0823190610b68908990600401611676565b60206040518083038186803b158015610b8057600080fd5b505afa158015610b94573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610bb8919061152a565b9050897f43c2f51b091d7988a9b26b7a0f304df6ca31ce05c86ac8ff6cb581529598b63682604051610bea9190611b8f565b60405180910390a2610bfe82878784611031565b60008a8152600d602052604081206003018054610c1a90611bf7565b80601f0160208091040260200160405190810160405280929190818152602001828054610c4690611bf7565b8015610c935780601f10610c6857610100808354040283529160200191610c93565b820191906000526020600020905b815481529060010190602001808311610c7657829003601f168201915b50505050509050600081511115610cd4576014610caf82611112565b604051610cbc919061165a565b908152604051908190036020019020805460ff191690555b60008b8152600d6020526040812090610ced82826113db565b610cfb6001830160006113db565b610d096002830160006113db565b610d176003830160006113e2565b50600060048201819055600582018190556006820181905560078201819055600882018190556009820155600a810180546001600160d81b0319169055600b0180546001600160a01b03191690555050505050505050505050565b6000818152600d60205260408120600b01546001600160a01b03168181610dab5760405162461bcd60e51b81526004016102d59061193a565b6000848152600d6020526040908190206009015490516370a0823160e01b81526001600160a01b03909116935083906370a0823190610dee908590600401611676565b60206040518083038186803b158015610e0657600080fd5b505afa158015610e1a573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610e3e919061152a565b929491935050565b6000610e50610fd4565b601d549091506001600160a01b0380831691161480610e875750610e726112f4565b6001600160a01b0316816001600160a01b0316145b610ea35760405162461bcd60e51b81526004016102d5906117c2565b506001600160a01b039091166000908152602081905260409020600101805460ff909216600160501b0260ff60501b19909216919091179055565b6000828152600d60205260409020600a015482906001600160a01b0316610f03610fd4565b6001600160a01b031614610f295760405162461bcd60e51b81526004016102d590611a6c565b6000838152600d60205260409020600b01546001600160a01b031680610f615760405162461bcd60e51b81526004016102d59061193a565b6000848152600d6020526040908190206009015490516001600160a01b039091169085907fc83f4a4f2f86ecba3c60063e8d252c488091c40d8b484a301223e0fd1c9f6af390610fb2908790611b8f565b60405180910390a2610fcd81610fc6610fd4565b8487611031565b5050505050565b60003330141561102b57600080368080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050503601516001600160a01b0316915061102e9050565b50335b90565b833b806110505760405162461bcd60e51b81526004016102d590611803565b600080866001600160a01b03166323b872dd60e01b87878760405160240161107a9392919061168a565b60408051601f198184030181529181526020820180516001600160e01b03166001600160e01b03199094169390931790925290516110b8919061165a565b6000604051808303816000865af19150503d80600081146110f5576040519150601f19603f3d011682016040523d82523d6000602084013e6110fa565b606091505b50915091506111098282611310565b50505050505050565b6060600082604051602001611127919061165a565b60408051601f198184030181529190528051909150806111595760405162461bcd60e51b81526004016102d590611982565b601a81106111795760405162461bcd60e51b81526004016102d590611b1d565b60008260008151811061119c57634e487b7160e01b600052603260045260246000fd5b0160209081015160f81c91508114156111c75760405162461bcd60e51b81526004016102d59061189d565b826111d3600184611bb0565b815181106111f157634e487b7160e01b600052603260045260246000fd5b0160209081015160f81c915081141561121c5760405162461bcd60e51b81526004016102d590611771565b60005b828110156112ea5783818151811061124757634e487b7160e01b600052603260045260246000fd5b016020015160f81c9150601f821180156112615750607f82105b61127d5760405162461bcd60e51b81526004016102d590611ac9565b605b8210801561128d5750604082115b156112d85761129d826020611b98565b60f81b8482815181106112c057634e487b7160e01b600052603260045260246000fd5b60200101906001600160f81b031916908160001a9053505b806112e281611c32565b91505061121f565b5091949350505050565b60006112fe61138f565b600401546001600160a01b0316919050565b81156113525780511561134d578080602001905181019061133191906114eb565b61134d5760405162461bcd60e51b81526004016102d59061184c565b61138b565b805115611373578060405162461bcd60e51b81526004016102d5919061173e565b60405162461bcd60e51b81526004016102d5906118ef565b5050565b7fc8fcad8db84d3cc18b4c41d551ea0ee66dd599cde068d998e57d5e09332c131c90565b604051806040016040528060006001600160a01b031681526020016113d6611421565b905290565b5060009055565b5080546113ee90611bf7565b6000825580601f10611400575061141e565b601f01602090049060005260206000209081019061141e919061146c565b50565b604051806101000160405280611435611485565b815260006020820181905260408201819052606082018190526080820181905260a0820181905260c0820181905260e09091015290565b5b80821115611481576000815560010161146d565b5090565b6040518060c001604052806006906020820280368337509192915050565b600080604083850312156114b5578182fd5b82356001600160a01b03811681146114cb578283fd5b9150602083013560ff811681146114e0578182fd5b809150509250929050565b6000602082840312156114fc578081fd5b8151801515811461150b578182fd5b9392505050565b600060208284031215611523578081fd5b5035919050565b60006020828403121561153b578081fd5b5051919050565b60008060408385031215611554578182fd5b50508035926020909101359150565b15159052565b6001600160e81b0319169052565b80516001600160a01b03168252602080820151805160008386015b60068210156115b4578251600190810b82529285019291909101908401611592565b50505090810151906115c960e0850183611569565b604081015191506115de610100850183611569565b606081015191506115f3610120850183611569565b60808101519150611608610140850183611653565b60a0810151915061161d610160850183611653565b60c0810151915061163261018085018361164b565b60e0015190506116466101a0840182611563565b505050565b61ffff169052565b60ff169052565b6000825161166c818460208701611bc7565b9190910192915050565b6001600160a01b0391909116815260200190565b6001600160a01b039384168152919092166020820152604081019190915260600190565b6020808252825182820181905260009190848201906040850190845b818110156116ef5783516001600160a01b0316835292840192918401916001016116ca565b50909695505050505050565b6020808252825182820181905260009190848201906040850190845b818110156116ef5761172a838551611577565b928401926101c09290920191600101611717565b600060208252825180602084015261175d816040850160208701611bc7565b601f01601f19169190910160400192915050565b60208082526031908201527f4c696241617665676f746368693a206c6173742063686172206f66206e616d656040820152702063616e2774206265206120737061636560781b606082015260800190565b60208082526021908201527f4c696241707053746f726167653a20446f206e6f7420686176652061636365736040820152607360f81b606082015260800190565b60208082526029908201527f4c696245524332303a20455243323020746f6b656e206164647265737320686160408201526873206e6f20636f646560b81b606082015260800190565b60208082526031908201527f4c696245524332303a207472616e73666572206f72207472616e7366657246726040820152706f6d2072657475726e65642066616c736560781b606082015260800190565b60208082526032908201527f4c696241617665676f746368693a2066697273742063686172206f66206e616d604082015271652063616e2774206265206120737061636560701b606082015260800190565b6020808252602b908201527f4c696245524332303a207472616e73666572206f72207472616e73666572467260408201526a1bdb481c995d995c9d195960aa1b606082015260800190565b60208082526028908201527f436f6c6c61746572616c46616365743a20446f6573206e6f74206861766520616040820152676e20657363726f7760c01b606082015260800190565b60208082526024908201527f4c696241617665676f746368693a206e616d652063616e2774206265203020636040820152636861727360e01b606082015260800190565b60208082526032908201527f436f6c6c61746572616c46616365743a2043616e6e6f74207265647563652062604082015271656c6f77206d696e696d756d207374616b6560701b606082015260800190565b60208082526034908201527f4c696241707053746f726167653a204f6e6c792063616c6c61626c65206f6e20604082015273756e6c6f636b65642041617665676f746368697360601b606082015260800190565b6020808252603b908201527f4c696241707053746f726167653a204f6e6c792061617665676f74636869206f60408201527f776e65722063616e2063616c6c20746869732066756e6374696f6e0000000000606082015260800190565b60208082526034908201527f4c696241617665676f746368693a20696e76616c6964206368617261637465726040820152731034b71020b0bb32b3b7ba31b434903730b6b29760611b606082015260800190565b60208082526037908201527f4c696241617665676f746368693a206e616d652063616e27742062652067726560408201527f61746572207468616e2032352063686172616374657273000000000000000000606082015260800190565b6101c08101611b898284611577565b92915050565b90815260200190565b60008219821115611bab57611bab611c4d565b500190565b600082821015611bc257611bc2611c4d565b500390565b60005b83811015611be2578181015183820152602001611bca565b83811115611bf1576000848401525b50505050565b600281046001821680611c0b57607f821691505b60208210811415611c2c57634e487b7160e01b600052602260045260246000fd5b50919050565b6000600019821415611c4657611c46611c4d565b5060010190565b634e487b7160e01b600052601160045260246000fdfea26469706673582212206643cca5044455de4532d792323e6ba4ef08eb7df247d04214ad8418b79988be64736f6c63430008010033";

export class CollateralFacet__factory extends ContractFactory {
  constructor(signer?: Signer) {
    super(_abi, _bytecode, signer);
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<CollateralFacet> {
    return super.deploy(overrides || {}) as Promise<CollateralFacet>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): CollateralFacet {
    return super.attach(address) as CollateralFacet;
  }
  connect(signer: Signer): CollateralFacet__factory {
    return super.connect(signer) as CollateralFacet__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): CollateralFacetInterface {
    return new utils.Interface(_abi) as CollateralFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): CollateralFacet {
    return new Contract(address, _abi, signerOrProvider) as CollateralFacet;
  }
}
