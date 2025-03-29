import { FC, useEffect, useState } from "react";
import useAuthForm from "../../../hooks/useAuthForm";
import Icon from "../../atoms/Icon/Icon";
import { PrimaryButton } from "../../atoms/PrimaryButton";
import { PrimaryInput } from "../../atoms/PrimaryInput";
import styles from "./SearchPanel.module.scss";
import useUserSearch from "../../../servises/useUserSearch";
import Preloader from "../../atoms/Preloader/Preloader";

interface SearchPanelProps {
  onSubmit: (name: string) => void;
  validationError: {
    [key: string]: string | null;
  };
  error: string | null;
  loading: boolean;
  placeholder?: string;
}

const SearchPanel: FC<SearchPanelProps> = ({
  onSubmit,
  validationError,
  error,
  loading,
  placeholder,
}) => {
  // const loading = true;
  const { handleNameChange, name } = useAuthForm();

  const hendleSubmit = () => {
    onSubmit(name);
  };

  return (
    <div className={styles.searchPanel}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          hendleSubmit();
          // console.log(e.currentTarget.user.value);
        }}
      >
        <Icon name="search" size="30" />

        <PrimaryInput
          name="user"
          className={styles.input}
          placeholder={placeholder || "name..."}
          // placeholder="author name..."
          onChange={(e) => handleNameChange(e)}
          error={!!validationError.name}
          autoComplete="off"
        />

        <PrimaryButton type="submit">Search</PrimaryButton>
      </form>
      {loading && <Preloader className={styles.loader} />}
      {validationError.name && (
        <span className={styles.error}>{validationError.name}</span>
      )}

      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default SearchPanel;
