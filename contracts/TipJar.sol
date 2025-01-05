// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TipJar {
    struct Tip {
        address sender;
        uint256 amount;
        string message;
        uint256 timestamp;
    }

    address public owner;
    Tip[] public tips;
    uint256 public totalTips;

    event TipReceived(address indexed sender, uint256 amount, string message, uint256 timestamp);
    event Withdrawn(address indexed owner, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    function sendTip(string memory _message) external payable {
        require(msg.value > 0, "Tip amount must be greater than 0");
        
        tips.push(Tip({
            sender: msg.sender,
            amount: msg.value,
            message: _message,
            timestamp: block.timestamp
        }));
        
        totalTips += msg.value;
        
        emit TipReceived(msg.sender, msg.value, _message, block.timestamp);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        
        (bool sent, ) = owner.call{value: balance}("");
        require(sent, "Failed to withdraw");
        
        emit Withdrawn(owner, balance);
    }

    function getTips() external view returns (Tip[] memory) {
        return tips;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }
}