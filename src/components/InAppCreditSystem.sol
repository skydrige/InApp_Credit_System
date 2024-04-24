// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract InAppCreditSystem {
    struct User {
        string password;
        uint credits;
    }

    mapping(string => User) public users;
    uint256 public creditValue = 0.05 ether;

    function register(string memory username, string memory password) public {
        require(bytes(users[username].password).length == 0, "User already exists");
        users[username] = User(password, 0);
    }

    function login(string memory username, string memory password) public view returns (uint) {
        require(keccak256(bytes(users[username].password)) == keccak256(bytes(password)), "Invalid credentials");
        return users[username].credits;
    }

    function updateCredits(string memory username, uint credits) public payable {
        require(msg.value == credits * creditValue, "Sent value does not match the required value");
        users[username].credits += credits;
    }
}