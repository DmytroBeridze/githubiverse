import "overlayscrollbars/overlayscrollbars.css";
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
import {
  decorElements,
  footerDecorElements,
} from "./components/atoms/constants";
import ScrollUp from "./components/molecules/ScrollUp/ScrollUp";
import AppRoutes from "./Routes/Routes";
import useSearchService from "./servises/useSearchService";
import { RandomAuthorsContext } from "./context/RandomAuthorsContext";
import { Footer } from "./components/organisms/Footer";

function App() {
  const [theme, setTheme] = useState<boolean>(true);
  const [isOpenPopup, setIsOpenPopup] = useState<boolean>(false);
  const [formType, setFormType] = useState<"signup" | "login" | "">("");
  const [nickName, setNickName] = useState<string | null>("");

  const {
    getRandomUsers,
    authors,
    clearError,
    loading,
    randomIssuesError,
    setRandomIssuesError,
  } = useSearchService();

  useEffect(() => {
    clearError();
    setRandomIssuesError(null);
    getRandomUsers();
  }, []);

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
                <RandomAuthorsContext.Provider
                  value={{ authors, randomIssuesError, loading }}
                >
                  <Header />
                  <DecorationPannel decorElements={decorElements} />
                  <AppRoutes />
                  <DecorationPannel
                    decorElements={footerDecorElements}
                    type="footer"
                  />
                  <RegistrationPopup
                    isOpenBurger={isOpenPopup}
                    popupHandler={popupHandler}
                    formType={formType}
                  />
                  <Footer />
                </RandomAuthorsContext.Provider>
                <ScrollUp />
              </FormTypeContext.Provider>
            </NickNameContext.Provider>
          </PopupContext.Provider>
        </ThemeContext.Provider>
      </ComponentContainer>
    </div>
  );
}

export default App;
