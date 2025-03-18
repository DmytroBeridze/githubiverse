import styles from "./Footer.module.scss";
import Text from "../../atoms/Text/Text";
import { ContentContainer } from "../ContentContainer";
import { dateFormatter } from "../../../utils/dateFormatter";
import Logo from "../../atoms/Logo/Logo";
import FooterNavigation from "../../molecules/FooterNavigation/FooterNavigation";
import SocialLinks from "../../molecules/SocialLinks/SocialLinks";

const Footer = () => {
  const date = new Date("2025-03-18");

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
          <SocialLinks />
        </div>
      </ContentContainer>
    </div>
  );
};

export default Footer;
