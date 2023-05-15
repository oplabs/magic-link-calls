import { BidModal } from "@reservoir0x/reservoir-kit-ui";
import { useEffect } from "react";
import {
  useAccount,
  useConnect,
  useNetwork,
  useSignMessage,
  useSwitchNetwork,
} from "wagmi";
import { Button } from "./Button";
import { magicConnector } from "./Wagmi";
import { useRequestApproval } from "./useRequestApproval";
import { truncate } from "./utils/truncate";

export const ConnectWithWagmi = () => {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { connect } = useConnect({ chainId: 137, connector: magicConnector });
  const { switchNetwork } = useSwitchNetwork();

  const { writeAsync: setApproval } = useRequestApproval(
    "0xf37c1a9C39D2E8F29D4bB74B999ebf6Bb9c14bb9",
    true
  );

  const { signMessageAsync } = useSignMessage();

  useEffect(() => {
    if (address && chain?.id !== 137) {
      switchNetwork?.(137);
    }
  }, [address, chain?.id, switchNetwork]);

  return (
    <div className="flex flex-col p-4 border rounded w-1/2 text-center">
      <div>Connect</div>
      <Button onClick={connect}>Connect wallet</Button>
      <div className="mt-2">
        Connected account: {truncate(address as string, 8, "...")}
      </div>
      <Button
        onClick={async () => {
          await setApproval?.();
        }}
      >
        Set approval
      </Button>
      <Button
        onClick={async () => {
          await signMessageAsync({ message: "test" });
        }}
      >
        Sign
      </Button>
      <Button
        onClick={async () => {
          await setApproval?.();
          await new Promise((f) => setTimeout(f, 3000));
          await signMessageAsync({ message: "test" });
        }}
      >
        Set approval and sign
      </Button>
      {address && (
        <BidModal
          trigger={<Button onClick={() => {}}>Place a bid</Button>}
          collectionId="0x0b5cfed5efb6f831468b8b5b5321b71825a2aee0"
        />
      )}
    </div>
  );
};
