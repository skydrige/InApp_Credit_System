// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InAppCreditSystem {
    // Structure to hold user information securely
    struct UserInfo {
        string userAddr;
        bytes32 hashedPassword;
        uint credits;
    }

    // Mapping from usernames to their secure information
    mapping(string => UserInfo) private users;

    // Event declarations for monitoring actions
    event UserRegistered(string username);
    event CreditsUpdated(string username, uint newCreditBalance);
    event UserLoggedIn(string username);

    // Function to register a new user with hashed password
    function register(string memory username, string memory password, string memory userAddr) public {
        require(users[username].hashedPassword == bytes32(0), "User already exists");

        users[username] = UserInfo({
            userAddr: userAddr,
            hashedPassword: keccak256(abi.encodePacked(password)),
            credits: 0
        });

        emit UserRegistered(username);
    }

    // Function to login a user and emit only necessary info
    function login(string memory username, string memory password) public returns (uint) {
        require(users[username].hashedPassword == keccak256(abi.encodePacked(password)), "Invalid username or password");

        emit UserLoggedIn(username);
        return users[username].credits;
    }

    // Function to update user's credits securely
    function updateCredits(string memory username, uint creditsToAdd) public payable {
        require(msg.value == creditsToAdd * 0.05 ether, "Incorrect ETH sent");
        require(users[username].hashedPassword != bytes32(0), "User does not exist");

        users[username].credits += creditsToAdd;
        emit CreditsUpdated(username, users[username].credits);
    }


    // Function to check the credit balance of a specific user by username
    function getBalance(string memory username) public view returns (uint) {
        require(users[username].hashedPassword != bytes32(0), "User does not exist");
        return users[username].credits;
    }

}
