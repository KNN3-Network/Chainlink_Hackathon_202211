// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";

contract KNN3ProfileClient is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    struct PageRankInfo {
        uint256 rank;
        string score;
        uint256 blockNumber;
    }

    mapping(address => PageRankInfo) public PageRankObject;

    uint256 private constant ORACLE_PAYMENT = 1 * 10 ** 1; // 1 * 10**1

    error InvalidArrayData();

    event RequestPageRankFulfilled(bytes32 indexed requestId, address[] addr, uint256[] rank, string[] score);

    constructor(address linkAddress) ConfirmedOwner(msg.sender) {
        setChainlinkToken(linkAddress);
    }

    /**
     * @notice request PageRankInfo
     * @param oracle oracle address
     * @param jobId node generated jobId
     */
    function requestPageRankInfo(address oracle, string memory jobId) public onlyOwner {
        Chainlink.Request memory req = buildChainlinkRequest(
            stringToBytes32(jobId),
            address(this),
            this.fulfillPageRankInfo.selector
        );
        sendChainlinkRequestTo(oracle, req, ORACLE_PAYMENT);
    }

    /**
     * @notice request PageRankInfo params
     * @param oracle oracle address
     * @param jobId node generated jobId
     * @param params string params array
     */
    function requestPageRankInfoParams(address oracle, string memory jobId, string[] memory params) public onlyOwner {
        Chainlink.Request memory req = buildChainlinkRequest(
            stringToBytes32(jobId),
            address(this),
            this.fulfillPageRankInfo.selector
        );

        req.addStringArray("params", params);
        sendChainlinkRequestTo(oracle, req, ORACLE_PAYMENT);
    }

    function fulfillPageRankInfo(
        bytes32 _requestId,
        address[] memory addr,
        uint256[] memory rank,
        string[] memory score
    ) public recordChainlinkFulfillment(_requestId) {
        // check length
        if (addr.length != rank.length) revert InvalidArrayData();
        if (addr.length != score.length) revert InvalidArrayData();

        for (uint256 i; i < addr.length; i++) {
            PageRankObject[addr[i]] = PageRankInfo(rank[i], score[i], block.number);
        }

        emit RequestPageRankFulfilled(_requestId, addr, rank, score);
    }

    function getChainlinkToken() public view returns (address) {
        return chainlinkTokenAddress();
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(chainlinkTokenAddress());
        require(link.transfer(msg.sender, link.balanceOf(address(this))), "Unable to transfer");
    }

    function cancelRequest(
        bytes32 _requestId,
        uint256 _payment,
        bytes4 _callbackFunctionId,
        uint256 _expiration
    ) public onlyOwner {
        cancelChainlinkRequest(_requestId, _payment, _callbackFunctionId, _expiration);
    }

    function stringToBytes32(string memory source) private pure returns (bytes32 result) {
        bytes memory tempEmptyStringTest = bytes(source);
        if (tempEmptyStringTest.length == 0) {
            return 0x0;
        }

        assembly {
            result := mload(add(source, 32))
        }
    }
}
