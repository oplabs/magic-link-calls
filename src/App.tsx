import "./App.css";
import Connect from "./Connect";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          width: "100%",
        }}
      >
        <Connect />
      </div>
    </div>
  );
}

export default App;
