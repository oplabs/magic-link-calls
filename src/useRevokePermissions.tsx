import { BigNumber } from "ethers";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export const useRevokeTokenPermissions = (targetAddress: `0x${string}`) => {
  const { config } = usePrepareContractWrite({
    address: targetAddress,
    abi: [
      {
        inputs: [
          {
            internalType: "address",
            name: "spender",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        name: "approve",
        outputs: [
          {
            internalType: "bool",
            name: "",
            type: "bool",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    args: ["0x1e0049783f008a0085193e00003d00cd54003c71", BigNumber.from(0)],
    functionName: "approve",
  });

  return useContractWrite(config);
};
