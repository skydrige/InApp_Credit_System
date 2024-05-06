import Web3 from 'web3';
import abi from '../abis/InAppCreditSystemABI.json';

let web3 = new Web3(window.ethereum);
let contractAddress = '0xA4a783B1B0332064A9E2A774d2b27232a160F2ef';
let contract = new web3.eth.Contract(abi, contractAddress);

let walletAddress = null;
let user = '';

export const getCurrentWalletConnected = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            walletAddress = accounts.length > 0 ? accounts[0] : null;
            return walletAddress;
        } catch (err) {
            console.error(err);
            return null;
        }
    } else {
        return null;
    }
};

export const useWalletAddress = () => {
    return walletAddress;
}

export const getUsername = () => {
    return user;
}

export const addWalletListener = (setWalletAddress) => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        window.ethereum.on('accountsChanged', (accounts) => {
            setWalletAddress(accounts[0] || '');
        });
    }
};

export const connectWallet = async (setWalletAddress) => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            setWalletAddress(accounts[0]);
            console.log(accounts[0]);
        } catch (err) {
            console.error(err.message);
        }
    } else {
        console.log('Please install MetaMask');
    }
};


export async function HandleLogin(username, password) {
    // Call the login function from the contract
    const waddr = useWalletAddress();
    let result =  await contract.methods.login(username, password, waddr).call();
    console.log(result);
    if (result) {
        user = username;
    }
    return result;
}

export async function HandleRegister(username, password) {
    const waddr = useWalletAddress();
    try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const account = accounts[0];
        const gas = await contract.methods.register(username, password, waddr).estimateGas({ from: account });
        const response = await contract.methods.register(username, password, waddr).send({ from: account, gas });
        console.log(response.events.UserRegistered);
        return true;
    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function HandleCredits(creditsToAdd) {
    try {
        const username = getUsername();
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        const account = accounts[0];
        const ethAmount = creditsToAdd * 0.0005 * 1e18; // Convert credits to ETH and then to wei
        const gas = await contract.methods.updateCredits(username, creditsToAdd).estimateGas({ from: account, value: ethAmount });
        const response = await contract.methods.updateCredits(username, creditsToAdd).send({ from: account, gas, value: ethAmount });
        console.log(response.events.CreditsUpdated);
        return true;
    } catch (err) {
        console.error('Error in HandleCredits:', err);
        return false;
    }
}

export async function getCreditBalance() {
    try {
        const username = getUsername();
        return await contract.methods.getBalance(username).call();
    } catch (err) {
        console.error('Error in getBalance:', err);
        return 0;
    }
}