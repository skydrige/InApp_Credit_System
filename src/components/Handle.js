export const getCurrentWalletConnected = async () => {
    if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
            return accounts.length > 0 ? accounts[0] : 'Connect to MetaMask using the connect button.';
        } catch (err) {
            console.error(err);
            return 'Error connecting.';
        }
    } else {
        return 'Please install MetaMask.';
    }
};

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


export function HandleLogin(username, password) {
    const validUsername = "skydrige";
    const validPassword = "reboot";
    if (username === validUsername && password === validPassword) {
        return true;
    }
}