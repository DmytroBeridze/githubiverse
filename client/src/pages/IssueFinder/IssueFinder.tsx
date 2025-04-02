import styles from "./IssueFinder.module.scss";
import { useEffect, useState } from "react";
import { ContentContainer } from "../../components/organisms/ContentContainer";
import useOpenSourceRepo from "../../servises/useOpenSourceRepo";
import SearchRepositoriesList from "../../components/molecules/SearchRepositoriesList/SearchRepositoriesList";
import LanguageDropdown from "../../components/molecules/Dropdown/Dropdown";
import { useScrollToTop } from "../../hooks/useScrollToTop";

export const IssueFinder = () => {
  const [language, setLanguage] = useState<string | number>("JavaScript");
  const {
    loading,
    getOpenSourceRepo,
    extendedRepo,
    extendedRepoError,
    setExtendedRepoError,
  } = useOpenSourceRepo();

  useEffect(() => {
    // getOpenSourceRepo("TypeScript");
    setExtendedRepoError(null);
  }, []);

  const onChange = (option: string | number) => {
    setLanguage(option);
  };

  useEffect(() => {
    if (typeof language === "string") {
      getOpenSourceRepo(language);
    }
  }, [language]);

  const languages = [
    "TypeScript",
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "C#",
    "Go",
    "Ruby",
    "Swift",
    "Kotlin",
    "PHP",
    "Rust",
    "Dart",
    "Scala",
    "Objective-C",
    "Haskell",
    "Lua",
    "Perl",
    "Elixir",
    "Clojure",
    "Shell",
    "R",
    "Groovy",
  ];

  useScrollToTop();

  return (
    <div className={styles.issueFinder}>
      <ContentContainer>
        <LanguageDropdown
          option={languages}
          onChange={onChange}
          selected={language}
        ></LanguageDropdown>

        <SearchRepositoriesList
          repo={extendedRepo}
          loading={loading}
          error={extendedRepoError}
        />
      </ContentContainer>
    </div>
  );
};
