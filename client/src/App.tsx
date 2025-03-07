import { Route, Routes } from "react-router-dom";
import { Homepage } from "./components/pages/Homepage";
import { DevFinder } from "./components/pages/DevFinder";
import { RepoFinder } from "./components/pages/RepoFinder";
import { IssueFinder } from "./components/pages/IssueFinder";
import { ComponentContainer } from "./components/organisms/ComponentContainer";
import { Header } from "./components/organisms/Header";
import { DecorationPannel } from "./components/molecules/DecorationPannel";
import { useState } from "react";
import { ThemeContext } from "./context/ThemeContext";

function App() {
  const [theme, setTheme] = useState<boolean>(false);

  return (
    <div className="App">
      <ComponentContainer>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <Header />
          <DecorationPannel />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="devfinder" element={<DevFinder />}></Route>
            <Route path="repofinder" element={<RepoFinder />}></Route>
            <Route path="issuefinder" element={<IssueFinder />}></Route>
          </Routes>
        </ThemeContext.Provider>
      </ComponentContainer>
    </div>
  );
}

export default App;
