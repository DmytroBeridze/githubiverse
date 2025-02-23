import { Route, Routes } from "react-router-dom";
import { Homepage } from "./components/pages/Homepage";
import { DevFinder } from "./components/pages/DevFinder";
import { RepoFinder } from "./components/pages/RepoFinder";
import { IssueFinder } from "./components/pages/IssueFinder";
import { ComponentContainer } from "./components/organisms/ComponentContainer";
import { Header } from "./components/organisms/Header";

function App() {
  return (
    <div className="App">
      <ComponentContainer>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="devfinder" element={<DevFinder />}></Route>
          <Route path="repofinder" element={<RepoFinder />}></Route>
          <Route path="issuefinder" element={<IssueFinder />}></Route>
        </Routes>
      </ComponentContainer>
    </div>
  );
}

export default App;
