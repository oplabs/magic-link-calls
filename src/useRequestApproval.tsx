import { useContractWrite, usePrepareContractWrite } from "wagmi";

export const useRequestApproval = (
  targetAddress: `0x${string}`,
  permissions: boolean
) => {
  const { config } = usePrepareContractWrite({
    address: targetAddress,
    abi: [
      {
        inputs: [
          { internalType: "address", name: "operator", type: "address" },
          { internalType: "bool", name: "approved", type: "bool" },
        ],
        name: "setApprovalForAll",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    args: ["0x1E0049783F008A0085193E00003D00cd54003c71", permissions],
    functionName: "setApprovalForAll",
  });

  return useContractWrite(config);
};
