import { Route, Routes } from "react-router-dom";
import { Homepage } from "./components/pages/Homepage";
import { DevFinder } from "./components/pages/DevFinder";
import { RepoFinder } from "./components/pages/RepoFinder";
import { IssueFinder } from "./components/pages/IssueFinder";
import { ComponentContainer } from "./components/organisms/ComponentContainer";
import { Header } from "./components/organisms/Header";
import { DecorationPannel } from "./components/molecules/DecorationPannel";
import { useEffect, useState } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { scrollUtils } from "./utils/scrollUtils";
import { PopupContext } from "./context/PopupContext";
import { FormTypeContext } from "./context/FormTypeContext";
import { RegistrationPopup } from "./components/organisms/RegistrationPopup";
import { NickNameContext } from "./context/NickNameContext";
import "overlayscrollbars/overlayscrollbars.css";

function App() {
  const [theme, setTheme] = useState<boolean>(false);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [formType, setFormType] = useState<"signup" | "login" | "">("");
  const [nickName, setNickName] = useState<string | null>("");

  const popupHandler = () => {
    const newState = !isOpenPopup;
    setIsOpenPopup(newState);
    scrollUtils(newState);
  };

  useEffect(() => {
    const res = localStorage.getItem("user");
    if (res) {
      setNickName(res);
    }
  }, []);

  return (
    <div className="App">
      <ComponentContainer>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <PopupContext.Provider value={{ isOpenPopup, popupHandler }}>
            <NickNameContext.Provider value={{ setNickName, nickName }}>
              <FormTypeContext.Provider value={{ setFormType, formType }}>
                <Header />
                <DecorationPannel />
                <Routes>
                  <Route path="/" element={<Homepage />} />
                  <Route path="devfinder" element={<DevFinder />}></Route>
                  <Route path="repofinder" element={<RepoFinder />}></Route>
                  <Route path="issuefinder" element={<IssueFinder />}></Route>
                </Routes>
                <RegistrationPopup
                  isOpenBurger={isOpenPopup}
                  popupHandler={popupHandler}
                  formType={formType}
                />
              </FormTypeContext.Provider>
            </NickNameContext.Provider>
          </PopupContext.Provider>
        </ThemeContext.Provider>
      </ComponentContainer>
    </div>
  );
}

export default App;
