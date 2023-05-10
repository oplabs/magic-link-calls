import { ReservoirKitProvider } from "@reservoir0x/reservoir-kit-ui";
import React from "react";

const reservoirClientConfig = {
  chains: [
    {
      id: 137,
      default: false,
      baseApiUrl: "https://api-polygon.reservoir.tools",
      apiKey: "28fee9b1-53a7-5c3b-b065-374b97d5ecaa",
    },
  ],
  source: "story.xyz",
};

export const ReservoirClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <ReservoirKitProvider options={{ ...reservoirClientConfig }}>
      {children}
    </ReservoirKitProvider>
  );
};
