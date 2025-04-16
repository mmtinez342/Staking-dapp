let provider;
let signer;
let contract;

const contractAddress = "YOUR_CONTRACT_ADDRESS_HERE";
const contractABI = [/* PASTE ABI HERE */];

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    signer = provider.getSigner();
    contract = new ethers.Contract(contractAddress, contractABI, signer);

    const address = await signer.getAddress();
    document.getElementById("walletAddress").innerText = `Connected: ${address}`;
  } else {
    alert("Please install MetaMask!");
  }
}

async function stakeTokens() {
  const amount = document.getElementById("stakeAmount").value;
  const tokenDecimals = 18;
  const parsedAmount = ethers.utils.parseUnits(amount, tokenDecimals);

  try {
    const tx = await contract.stake(parsedAmount);
    await tx.wait();
    document.getElementById("status").innerText = "Stake successful!";
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Error staking tokens.";
  }
}

async function withdrawTokens() {
  try {
    const tx = await contract.withdraw();
    await tx.wait();
    document.getElementById("status").innerText = "Withdraw successful!";
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "Error withdrawing tokens.";
  }
}
