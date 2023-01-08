import { task } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import {
  gasPrice,
  maticDiamondAddress,
  propType,
  xpRelayerAddress,
} from "../scripts/helperFunctions";
import { Signer } from "@ethersproject/abstract-signer";
import { DAOFacet } from "../typechain";
import { ContractReceipt, ContractTransaction } from "@ethersproject/contracts";

import { getPolygonAndMainnetGotchis } from "../scripts/query/queryAavegotchis";
import request from "graphql-request";
import { getRelayerSigner } from "../scripts/helperFunctions";
import { snapshotGraphUrl } from "../helpers/constants";

export const currentOverrides: string[] = [
  "0x4d6e3Ff00F77F6e746eBF7f6827800eB99e36910",
];

export interface GrantXPSnapshotTaskArgs {
  proposalId: string;
  batchSize: string;
}

export interface ProposalDetails {
  id: string;
  title: string;
  votes: number;
}

interface Voter {
  voter: string;
}

const graphqlRequest = (proposalId: string) => {
  return `
  {first1000: votes(first:1000, where:{proposal_in:["${proposalId}"]}) {
    voter
  }
    second1000:votes(skip:1000, first:1000, where:{proposal_in:["${proposalId}"]}) {
      voter
  }
     third1000:votes(skip: 2000, first:1000, where:{proposal_in:["${proposalId}"]}) {
      voter
  }
    fourth1000:votes(skip: 3000, first:1000, where:{proposal_in:["${proposalId}"]}) {
      voter
  }
    fifth1000:votes(skip: 4000, first:1000, where:{proposal_in:["${proposalId}"]}) {
      voter
    }
  }
  `;
};

async function getVotingAddresses(proposalId: string) {
  let votingAddresses: string[] = [];
  const addresses = await request(snapshotGraphUrl, graphqlRequest(proposalId));

  addresses.first1000.forEach((voter: Voter) => {
    votingAddresses.push(voter.voter);
  });

  addresses.second1000.forEach((voter: Voter) => {
    if (!votingAddresses.includes(voter.voter))
      votingAddresses.push(voter.voter);
  });

  addresses.third1000.forEach((voter: Voter) => {
    if (!votingAddresses.includes(voter.voter))
      votingAddresses.push(voter.voter);
  });

  addresses.fourth1000.forEach((voter: Voter) => {
    if (!votingAddresses.includes(voter.voter))
      votingAddresses.push(voter.voter);
  });

  addresses.fifth1000.forEach((voter: Voter) => {
    if (!votingAddresses.includes(voter.voter))
      votingAddresses.push(voter.voter);
  });

  console.log("Found voting addresses:", votingAddresses.length);
  return votingAddresses;
}

async function getProposalDetails(proposalId: string) {
  const query = `
  {proposal(id:"${proposalId}") {
    id
    votes
    title
  }}
  `;

  const res = await request(snapshotGraphUrl, query);

  return res.proposal;
}

task("grantXP_snapshot", "Grants XP to Gotchis by addresses")
  .addParam("proposalId", "ID of the Snapshot proposal")
  .addParam(
    "batchSize",
    "How many Aavegotchis to send at a time. Default is 500"
  )

  .setAction(
    async (
      taskArgs: GrantXPSnapshotTaskArgs,
      hre: HardhatRuntimeEnvironment
    ) => {
      const proposalId: string = taskArgs.proposalId;
      const exceptions = currentOverrides;
      const batchSize: number = Number(taskArgs.batchSize);

      const addresses = await (
        await getVotingAddresses(proposalId)
      ).concat(exceptions);

      if (addresses.includes(exceptions[0])) {
        console.log("exception added!");
      }

      const propDetails: ProposalDetails = await getProposalDetails(proposalId);
      const proposalType = await propType(propDetails.title);

      console.log("Proposal type:", proposalType);

      const xpAmount: number = proposalType === "sigprop" ? 10 : 20;

      if (propDetails.votes + exceptions.length !== addresses.length) {
        throw new Error("Proposal voter count doesn't match");
      }

      const diamondAddress = maticDiamondAddress;
      const gameManager = xpRelayerAddress;
      console.log(gameManager);
      let signer: Signer;
      const testing = ["hardhat", "localhost"].includes(hre.network.name);
      if (testing) {
        await hre.network.provider.request({
          method: "hardhat_impersonateAccount",
          params: [gameManager],
        });
        signer = await hre.ethers.provider.getSigner(gameManager);
      } else if (hre.network.name === "matic") {
        //  const accounts = await hre.ethers.getSigners();
        signer = getRelayerSigner(); /* new LedgerSigner(
          hre.ethers.provider,
          "hid",
          "m/44'/60'/2'/0/0"
        ); */
      } else {
        throw Error("Incorrect network selected");
      }

      const { tokenIds, finalUsers } = await getPolygonAndMainnetGotchis(
        addresses,
        hre
      );

      const batches = Math.ceil(tokenIds.length / batchSize);

      console.log(`Deploying ${proposalType}: ${propDetails.title}!!!`);

      console.log(
        `Sending ${xpAmount} XP to ${tokenIds.length} Aavegotchis in ${finalUsers.length} addresses!`
      );

      const dao = (
        await hre.ethers.getContractAt("DAOFacet", diamondAddress)
      ).connect(signer) as DAOFacet;

      for (let index = 0; index < batches; index++) {
        console.log("Current batch id:", index);

        const offset = batchSize * index;
        const sendTokenIds = tokenIds.slice(offset, offset + batchSize);

        console.log(
          `Sending ${xpAmount} XP to ${sendTokenIds.length} Aavegotchis `
        );

        const tx: ContractTransaction = await dao.grantExperience(
          sendTokenIds,
          Array(sendTokenIds.length).fill(xpAmount)
        );
        console.log("tx:", tx.hash);
        // const receipt: ContractReceipt = await tx.wait();
        // console.log("Gas used:", strDisplay(receipt.gasUsed.toString()));
        // if (!receipt.status) {
        //   throw Error(`Error:: ${tx.hash}`);
        // }
        console.log(
          "Airdropped XP to Aaavegotchis. Last tokenID:",
          sendTokenIds[sendTokenIds.length - 1]
        );
      }
    }
  );
