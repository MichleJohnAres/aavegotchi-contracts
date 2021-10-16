// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

import {LibAppStorage, AppStorage, ERC721BuyOrder} from "./LibAppStorage.sol";
import {LibERC20} from "../../shared/libraries/LibERC20.sol";

import "../../shared/interfaces/IERC721.sol";

library LibBuyOrder {
    function cancelERC721BuyOrderByToken(uint256 _erc721TokenId) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();

        cancelERC721BuyOrder(s.erc721BuyOrderHead[_erc721TokenId]);
    }

    function cancelERC721BuyOrder(uint256 _buyOrderId) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();

        ERC721BuyOrder memory erc721BuyOrder = s.erc721BuyOrders[_buyOrderId];
        if (erc721BuyOrder.timeCreated == 0) {
            return;
        }
        if ((erc721BuyOrder.cancelled == true) || (erc721BuyOrder.timePurchased != 0)) {
            return;
        }

        s.erc721BuyOrderHead[erc721BuyOrder.erc721TokenId] = 0;
        s.erc721BuyOrders[_buyOrderId].cancelled = true;

        // refund GHST to buyer
        LibERC20.transfer(s.ghstContract, erc721BuyOrder.buyer, erc721BuyOrder.priceInWei);

        updateFrens(_buyOrderId);
    }

    function updateFrens(uint256 _buyOrderId) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();

        ERC721BuyOrder memory erc721BuyOrder = s.erc721BuyOrders[_buyOrderId];
        uint256 timePeriod = block.timestamp - erc721BuyOrder.timeCreated;
        s.buyOrderFrens[erc721BuyOrder.buyer] += (erc721BuyOrder.priceInWei * timePeriod) / 24 hours;
        // TODO: Check availability to connect with GHST Staking
    }
}
