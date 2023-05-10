import "./App.css";
import { ConnectWithWagmi } from "./ConnectWithWagmi";
import { ReservoirClient } from "./ReservoirClient";
import { Wagmi } from "./Wagmi";
import WalletTools from "./WalletTools";

function App() {
  return (
    <ReservoirClient>
      <Wagmi>
        <div className="App">
          <header className="App-header"></header>
          <div className="flex flex-col justify-center items-center w-full h-full p-4 space-y-4">
            <div className="flex space-x-4 w-1/2">
              <ConnectWithWagmi />
              <WalletTools />
            </div>
          </div>
        </div>
      </Wagmi>
    </ReservoirClient>
  );
}

export default App;
