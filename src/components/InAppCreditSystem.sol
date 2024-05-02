// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InAppCreditSystem {
    struct UserInfo {
        string userAddr;
        bytes32 hashedPassword;
        uint credits;
    }

    struct Transaction {
        uint id;
        string userAddr;
        uint creditsPurchased;
        uint timestamp;
    }

    mapping(string => UserInfo) private users;
    Transaction[] private transactions; // An array to store transactions

    // Events to log activities
    event UserRegistered(string username);
    event UserLoggedIn(string username, bool success);
    event CreditsUpdated(string username, uint credits);
    event CreditPurchaseLogged(uint transactionId, string userAddr, uint creditsPurchased, uint timestamp);

    function register(string memory username, string memory password, string memory userAddr) public {
        require(users[username].hashedPassword == 0, "User already exists");
        users[username] = UserInfo({
            userAddr: userAddr,
            hashedPassword: keccak256(abi.encodePacked(password)),
            credits: 0
        });
        emit UserRegistered(username);
    }

    function login(string memory username, string memory password) public view returns (bool) {
        bool isValid = users[username].hashedPassword == keccak256(abi.encodePacked(password));
        return isValid;
    }

    function updateCredits(string memory username, uint creditsToAdd) public payable {
        require(msg.value == creditsToAdd * 0.0005 ether, "Incorrect ETH sent");
        require(users[username].hashedPassword != 0, "User does not exist");
        users[username].credits += creditsToAdd;

        // Log the transaction
        transactions.push(Transaction({
            id: transactions.length,
            userAddr: users[username].userAddr,
            creditsPurchased: creditsToAdd,
            timestamp: block.timestamp
        }));
        emit CreditsUpdated(username, users[username].credits);
        emit CreditPurchaseLogged(transactions.length - 1, users[username].userAddr, creditsToAdd, block.timestamp);
    }

    function getBalance(string memory username) public view returns (uint) {
        require(users[username].hashedPassword != 0, "User does not exist");
        return users[username].credits;
    }

    // Function to retrieve transaction history for a specific address
    function getTransactionsByUserAddr(string memory userAddr) public view returns (Transaction[] memory) {
        Transaction[] memory tempTransactions = new Transaction[](transactions.length);
        uint counter = 0;
        for(uint i = 0; i < transactions.length; i++) {
            if(keccak256(abi.encodePacked(transactions[i].userAddr)) == keccak256(abi.encodePacked(userAddr))) {
                tempTransactions[counter] = transactions[i];
                counter++;
            }
        }

        Transaction[] memory filteredTransactions = new Transaction[](counter);
        for(uint j = 0; j < counter; j++) {
            filteredTransactions[j] = tempTransactions[j];
        }

        return filteredTransactions;
    }
}
