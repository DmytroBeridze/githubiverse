import styles from "./Footer.module.scss";
import Text from "../../atoms/Text/Text";
import { ContentContainer } from "../ContentContainer";
import { dateFormatter } from "../../../utils/dateFormatter";
import Logo from "../../atoms/Logo/Logo";
import FooterNavigation from "../../molecules/FooterNavigation/FooterNavigation";

const Footer = () => {
  const date = new Date();

  return (
    <div className={styles.footer}>
      <ContentContainer>
        <div className={styles.footerContainer}>
          <div className={styles.logoContainer}>
            <Logo />
            <div className={styles.date}>
              {dateFormatter(date, "en-Us", {
                day: "numeric",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
            <Text as="p" variant="body" className={styles.apiCredit}>
              Data provided GitHub API
            </Text>
          </div>
          <FooterNavigation />
        </div>
      </ContentContainer>
    </div>
  );
};

export default Footer;
