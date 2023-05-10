import React from "react";
import { MagicConnectConnector } from "@origin/wagmi-magic-connector";
import { polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig, configureChains, createClient, mainnet } from "wagmi";
import { ConnectWithWagmi } from "./ConnectWithWagmi";
import { EthNetworkConfiguration } from "magic-sdk";
import { ReservoirClient } from "./ReservoirClient";

const polygonConfiguration: EthNetworkConfiguration = {
  rpcUrl: "https://polygon-rpc.com/",
  chainId: 137,
};

const { provider } = configureChains([polygon], [publicProvider()]);

export const magicConnector = new MagicConnectConnector({
  options: {
    apiKey: "pk_live_1CA33C5CC97F6D00",
    magicSdkConfiguration: {
      network: polygonConfiguration,
    },
  },
  chains: [mainnet, polygon as any],
});

const client = createClient({
  autoConnect: true,
  provider,
  connectors: [magicConnector as any],
});

export const Wagmi = ({ children }: { children: React.ReactNode }) => {
  return <WagmiConfig client={client}>{children}</WagmiConfig>;
};
