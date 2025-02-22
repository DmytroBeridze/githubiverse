import { ComponentContainer } from "./components/ComponentContainer";
import { DevFinder } from "./components/DevFinder";
import { Homepage } from "./components/Homepage";
import { IssueFinder } from "./components/IssueFinder";
import { RepoFinder } from "./components/RepoFinder";

import ReactDOM from "react-dom/client";
function App() {
  return (
    <div className="App">
      <ComponentContainer>
        <Homepage />
        <DevFinder />
        <RepoFinder />
        <IssueFinder />
      </ComponentContainer>
    </div>
  );
}

export default App;
