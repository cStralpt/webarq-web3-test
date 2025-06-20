// SPDX-License-Identifier: GPL-3.0
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
pragma solidity >=0.8.2 <0.9.0;

contract Storage is ReentrancyGuard {

    uint256 number;
    address owner;
    constructor(){
        owner= msg.sender;
        _reentrancyGuardEntered(); // detailed implementation can used on better real world use case
    }

    modifier onlyOwner(){
        require(msg.sender==owner);
        _;
    }

    function storeValue(uint256 num) public onlyOwner {
        number = num;
    }
    function getValue() public view returns (uint256){
        return number;
    }
}