import { useState } from "react";
import Text from "../../atoms/Text/Text";
import styles from "./LanguageDropdown.module.scss";
import Icon from "../../atoms/Icon/Icon";

interface LanguageDropdownProps<T extends string | number> {
  option: T[];
  onChange: (option: T) => void;
  selected?: T;
}

const LanguageDropdown = <T extends string | number>({
  option,
  onChange,
  selected,
}: LanguageDropdownProps<T>) => {
  const [toggle, setToggle] = useState<boolean>(false);

  const dropdownHandle = (elem: T) => {
    setToggle(false);
    onChange(elem);
  };

  return (
    <div className={styles.dropdown}>
      <div
        className={`${styles.selectContainer} ${toggle ? styles.active : null}`}
        onClick={() => setToggle(!toggle)}
      >
        <Text as="span" variant="body" className={styles.selected}>
          {selected}
        </Text>
        <div
          className={`${styles.iconWrapper} ${toggle ? styles.active : null}`}
        >
          <Icon name="arrowMore" />
        </div>
      </div>

      <ul className={`${styles.options} ${toggle ? styles.active : null}`}>
        {option.map((elem) => (
          <li
            key={String(elem)}
            value={String(elem)}
            onClick={() => dropdownHandle(elem)}
          >
            <Text as="span" variant="body" className={styles.optionsText}>
              {elem}
            </Text>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LanguageDropdown;
