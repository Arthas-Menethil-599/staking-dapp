import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import RiseOutlined from '@ant-design/icons'
import NumberInput from '@/components/numberInput'
import React, {useState, useEffect} from 'react'
import { Button, Modal } from 'antd'
import { ethers } from 'ethers'
import {useContractRead} from 'wagmi'

const inter = Inter({ subsets: ['latin'] })

const contractAddress="0x263d0F89C2779D71744bd486562cE7919977eAF1";
const tokenAddress="0x9B67a584f15744F8965A71b14A565043807F31E1";


const abi = [{"inputs":[{"internalType":"contract Token","name":"_tokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Claimed","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"Staked","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"addressStaked","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimReward","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"getTokenExpiry","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"interestRate","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"pause","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"planDuration","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"planExpired","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"stakeInfos","outputs":[{"internalType":"uint256","name":"startTS","type":"uint256"},{"internalType":"uint256","name":"endTS","type":"uint256"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"uint256","name":"claimed","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"stakeAmount","type":"uint256"}],"name":"stakeToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"totalStakers","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferToken","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"unpause","outputs":[],"stateMutability":"nonpayable","type":"function"}];
const tokenabi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];

let signer;
let contract;
let token;

if (typeof window !== 'undefined') {
  const provider = new ethers.providers.Web3Provider((window as any).ethereum);
  provider.send("eth_requestAccounts", []).then(() => {
    provider.listAccounts().then((accounts) => {
      signer = provider.getSigner(accounts[0]);
      contract = new ethers.Contract(contractAddress, abi, signer);
      token = new ethers.Contract(tokenAddress, tokenabi, signer);
      console.log(contract);
    });
  });
}

const toWei = (value) => ethers.utils.parseEther(value.toString())

const fromWei = (value) =>
    ethers.utils.formatEther(
        typeof value === "string" ? value : value.toString()
    )

async function approveTokenIn(value : Number) {
  try {

    await token.approve(contract.address, toWei(value));
  }
  catch(e) {
    console.log(e.message);
  }
}

async function stakeTokenIn(value : Number) {
  try {

    await contract.stakeToken(toWei(value));
  }
  catch(e) {
    console.log(e.message);
  }
}



  async function myBalance() {
    console.log(token);
    const balance = await fromWei(token.balanceOf(signer.address));
    return (balance);
  }


export default function Home() {
  const [isModalStakingOpen, setIsModalStakingOpen] = useState(false);
  const [isModalRewardOpen, setisModalRewardOpen] = useState(false);
  const [isModalBalanceOpen, setIsModalBalanceOpen] = useState(false);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    async function updateBalance() {
      const newBalance = await myBalance();
      setBalance(newBalance);
    }
    updateBalance();
  }, [token, signer]);

const showModalStaking = () => {
  setIsModalStakingOpen(true);
};

const handleApprove = () => {
  // document.getElementById()
  // approveTokenIn()
}

const showModalReward = () => {
  setisModalRewardOpen(true);
};

const showModalBalance = () => {
  setIsModalBalanceOpen(true);
};

const handleOkStaking = () => {
  setIsModalStakingOpen(false);
};

const handleOkReward = () => {
  setisModalRewardOpen(false);
};
const handleOkBalance = () => {
  setIsModalBalanceOpen(false);
};

const handleCancel = () => {
  setIsModalStakingOpen(false);
  setisModalRewardOpen(false);
  setIsModalBalanceOpen(false);
};
  return (
    <div style={{
      height: "100vh",
      width: "100vw"
    }}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" cross-origin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></link>
      </Head>
      <div className='nav'>
        <ConnectButton />
      </div>
      <main className={styles.main} style={{backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'row', minHeight: '85vh'}} >
        <div className='check' onClick={showModalStaking}>
        <svg style={{backgroundColor: 'lightblue', borderRadius: '50px', padding: '10%', height: '100%', width: '50%'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M384 160c-17.7 0-32-14.3-32-32s14.3-32 32-32H544c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32s-32-14.3-32-32V205.3L342.6 374.6c-12.5 12.5-32.8 12.5-45.3 0L192 269.3 54.6 406.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l160-160c12.5-12.5 32.8-12.5 45.3 0L320 306.7 466.7 160H384z"/></svg>
        <h2 style={{fontFamily: "'Delicious Handrawn', cursive;"}}>Staking</h2>
        </div>
        <div className='check' onClick={showModalReward}>
        <svg style={{backgroundColor: 'lightgreen', borderRadius: '50px', padding: '10%', height: '100%', width: '50%'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128V384c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V128c0-35.3-28.7-64-64-64H64zm64 320H64V320c35.3 0 64 28.7 64 64zM64 192V128h64c0 35.3-28.7 64-64 64zM448 384c0-35.3 28.7-64 64-64v64H448zm64-192c-35.3 0-64-28.7-64-64h64v64zM288 160a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>
        <h2 style={{fontFamily: "'Delicious Handrawn', cursive;"}}>Get Reward</h2>
        </div>
        <div className='check' onClick={showModalBalance}>
        <svg style={{backgroundColor: 'pink', borderRadius: '50px', padding: '10%', height: '100%', width: '50%'}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M400 96l0 .7c-5.3-.4-10.6-.7-16-.7H256c-16.5 0-32.5 2.1-47.8 6c-.1-2-.2-4-.2-6c0-53 43-96 96-96s96 43 96 96zm-16 32c3.5 0 7 .1 10.4 .3c4.2 .3 8.4 .7 12.6 1.3C424.6 109.1 450.8 96 480 96h11.5c10.4 0 18 9.8 15.5 19.9l-13.8 55.2c15.8 14.8 28.7 32.8 37.5 52.9H544c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32H512c-9.1 12.1-19.9 22.9-32 32v64c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32V448H256v32c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32V416c-34.9-26.2-58.7-66.3-63.2-112H68c-37.6 0-68-30.4-68-68s30.4-68 68-68h4c13.3 0 24 10.7 24 24s-10.7 24-24 24H68c-11 0-20 9-20 20s9 20 20 20H99.2c12.1-59.8 57.7-107.5 116.3-122.8c12.9-3.4 26.5-5.2 40.5-5.2H384zm64 136a24 24 0 1 0 -48 0 24 24 0 1 0 48 0z"/></svg>
        <h2 style={{fontFamily: "'Delicious Handrawn', cursive;"}}>My balance</h2>
        </div>
      </main>
      <Modal footer={[<Button key="Approve" onClick={handleApprove}>
            Approve
          </Button>]} title="Staking" open={isModalStakingOpen} onOk={handleOkStaking} onCancel={handleCancel}>
        <NumberInput/>
      </Modal>
        <Modal title="Reward" open={isModalRewardOpen} onOk={handleOkReward} onCancel={handleCancel}>
        <h1>{balance !== null ? <h1>{balance as any}</h1> : <p>Loading...</p>}</h1>
      </Modal>
      <Modal title="Balance" open={isModalBalanceOpen} onOk={handleOkBalance} onCancel={handleCancel}>
        
      </Modal>
    </div>
  )
}
