import { ethers } from "ethers";
import { Magic } from "magic-sdk";
import React, { useState } from "react";
import { Contract1155ABI } from "./ABI";
import { BidModal } from "@reservoir0x/reservoir-kit-ui";

const magic = new Magic("pk_live_1CA33C5CC97F6D00", {
  network: {
    rpcUrl: "https://polygon-rpc.com/", // or https://matic-mumbai.chainstacklabs.com for testnet
    chainId: 137, // or 80001 for polygon testnet
  },
});

const Connect = () => {
  const [account, setAccount] = useState<string>();
  const [sign, setSign] = useState<ethers.Signer>();

  async function connect() {
    const accounts = await magic.wallet.connectWithUI();
    setAccount(accounts[0]);
  }

  async function setApproval() {
    const provider = new ethers.providers.Web3Provider(
      magic.rpcProvider as any
    );
    const polygonSigner = await provider.getSigner();
    setSign(polygonSigner);

    const contract = new ethers.Contract(
      "0xf37c1a9C39D2E8F29D4bB74B999ebf6Bb9c14bb9",
      Contract1155ABI,
      polygonSigner
    );

    const txn = await contract.setApprovalForAll(
      "0x1E0049783F008A0085193E00003D00cd54003c71",
      true
    );

    await txn.wait();
  }

  async function requestSignature() {
    await sign?.signMessage("test");
  }

  return (
    <div className="flex space-x-2">
      <div className="flex flex-col justify-normal items-center border p-4 rounded">
        <Button onClick={() => connect()}>Connect wallet</Button>
        <button
          disabled={!account}
          onClick={async () => {
            await setApproval();
            await requestSignature();
          }}
          className="bg-white-500 p-2 mt-1 border border-black disabled:opacity-30 rounded cursor-not-allowed"
        >
          Set Approval
        </button>
        <div className="mt-2">Connected account: {account}</div>
      </div>
      <div className="flex flex-col p-4 border rounded"></div>
    </div>
  );
};

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  onClick: () => void;
}

const Button = ({ children, ...props }: ButtonProps) => {
  return (
    <button
      className="bg-white-500 p-2 mt-1 border border-black disabled:opacity-30 rounded cursor-not-allowed"
      {...props}
    >
      {children}
    </button>
  );
};

export default Connect;
