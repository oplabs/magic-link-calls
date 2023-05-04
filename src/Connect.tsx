import React, { useEffect, useState } from "react";
import { Magic } from "magic-sdk";
import { ethers } from "ethers";
import { Contract1155ABI } from "./ABI";

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
    const provider = new ethers.BrowserProvider(magic.rpcProvider);
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

    const receipt = await txn.wait();
  }

  async function requestSignature() {
    const signature = {
      OrderComponents: {
        Offerer: account,
        Zone: "0x0000000000000000000000000000000000000000",
        Offer: [
          {
            ItemType: 1,
            Token: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            IdentifierOrCriteria: 0,
            StartAmount: 80000000000000000,
            EndAmount: 80000000000000000,
          },
        ],
        Consideration: [
          {
            ItemType: 5,
            Token: "0x212C7ce69c9687860940f8fFDB6587B7ee702EBF",
            IdentifierOrCriteria: 0,
            StartAmount: 1,
            EndAmount: 1,
            Receipient: account,
          },
        ],
        OrderType: 1,
        StartTime: 1682675203,
        EndTime: 1685267262,
        ZoneHash:
          "0x0000000000000000000000000000000000000000000000000000000000000000",
        Salt: "16184194831101861726006543015570503459350911165487179483372145366118019611242",
        ConduitKey:
          "0x0000007b02230091a7ed01230072f7006a004d60a8d4e71d599b8104250f0000",
        Counter: 0,
      },
    };
    const method = "eth_signTypedData_v4";
    const signedMessage = await sign?.signMessage("test");
  }
  useEffect(() => {}, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          background: "white",
          padding: "1rem",
          width: "10rem",
          marginTop: "0.5rem",
        }}
        onClick={() => connect()}
      >
        Connect
      </button>
      <button
        disabled={!account}
        onClick={async () => {
          await setApproval();
          await requestSignature();
        }}
        style={{
          background: "white",
          padding: "1rem",
          width: "10rem",
          marginTop: "0.5rem",
        }}
      >
        Set Approval
      </button>
      <div
        style={{
          marginTop: "2rem",
        }}
      >
        Connected account: {account}
      </div>
    </div>
  );
};

export default Connect;
