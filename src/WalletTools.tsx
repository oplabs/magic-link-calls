import React from "react";
import { useRevokeTokenPermissions } from "./useRevokePermissions";
import { Button } from "./Button";
import { useAccount } from "wagmi";
import { MagicConnectConnector } from "@origin/wagmi-magic-connector";
import { useRequestApproval } from "./useRequestApproval";

const WalletTools = () => {
  const { write } = useRevokeTokenPermissions(
    "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270"
  );

  const { write: removeApproval } = useRequestApproval(
    "0xf37c1a9C39D2E8F29D4bB74B999ebf6Bb9c14bb9",
    false
  );

  const { connector } = useAccount();
  const magicConnect = connector as MagicConnectConnector;

  return (
    <div className="flex flex-col p-4 border rounded w-1/2 text-center">
      <div>Wallet tools</div>
      <Button
        onClick={() => {
          removeApproval?.();
        }}
      >
        Revoke DEFY Loot
      </Button>
      <Button
        onClick={() => {
          write?.();
        }}
      >
        Revoke WMATIC
      </Button>
      <Button
        onClick={() => {
          magicConnect.magicSDK?.wallet.showUI();
        }}
      >
        Open Wallet
      </Button>
    </div>
  );
};

export default WalletTools;
