// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InAppCreditSystem {
    struct UserInfo {
        string userAddr;
        bytes32 hashedPassword;
        uint credits;
    }

    mapping(string => UserInfo) private users;

    event UserRegistered(string username);
    event UserLoggedIn(string username, bool success);
    event CreditsUpdated(string username, uint credits);

    function register(string memory username, string memory password, string memory userAddr) public {
        require(users[username].hashedPassword == 0, "User already exists");

        users[username] = UserInfo({
            userAddr: userAddr,
            hashedPassword: keccak256(abi.encodePacked(password)),
            credits: 0
        });

        emit UserRegistered(username);
    }

    function login(string memory username, string memory password) public returns (bool) {
        bytes32 hashedPassword = keccak256(abi.encodePacked(password));
        bool isValid = users[username].hashedPassword == hashedPassword;

        emit UserLoggedIn(username, isValid);
        return isValid;
    }

    function updateCredits(string memory username, uint creditsToAdd) public payable {
        require(msg.value == creditsToAdd * 0.05 ether, "Incorrect ETH sent");
        require(users[username].hashedPassword != 0, "User does not exist");

        users[username].credits += creditsToAdd;
        emit CreditsUpdated(username, users[username].credits);
    }

    function getBalance(string memory username) public view returns (uint) {
        require(users[username].hashedPassword != 0, "User does not exist");
        return users[username].credits;
    }
}
