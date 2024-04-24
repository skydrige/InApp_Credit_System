// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InAppCreditSystem {
    // Structure to hold user information
    struct UserInfo {
        string password;
        uint credits;
    }

    // Mapping from usernames to their information
    mapping(string => UserInfo) private users;

    // Event declarations
    event UserRegistered(string username);
    event CreditsUpdated(string username, uint credits);
    event UserLoggedIn(string username, uint credits);

    // Function to register a new user
    function Register(string memory _username, string memory _password) public {
        require(bytes(users[_username].password).length == 0, "User already exists");

        users[_username] = UserInfo({
            password: _password,
            credits: 0
        });

        emit UserRegistered(_username);
    }

    // Function to login a user and view credits
    function Login(string memory _username, string memory _password) public returns (uint) {
        require(keccak256(abi.encodePacked(users[_username].password)) == keccak256(abi.encodePacked(_password)), "Invalid username or password");

        emit UserLoggedIn(_username, users[_username].credits);
        return users[_username].credits;
    }

    // Function to update user's credits
    function UpdateCredits(string memory _username, uint _creditsToAdd) public payable{
        require(msg.value == _creditsToAdd * 0.05 ether, "Incorrect ETH sent");
        require(keccak256(abi.encodePacked(users[_username].password)) != keccak256(abi.encodePacked("")), "User does not exist");

        users[_username].credits += _creditsToAdd;
        emit CreditsUpdated(_username, users[_username].credits);
    }

    // Function to check the balance (ETH) of the contract
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }
}