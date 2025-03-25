import styles from "./RandomAuthors.module.scss";
import { ContentContainer } from "../ContentContainer";
import useSearchService from "../../../servises/useSearchService";
import { useEffect, useState } from "react";
import Preloader from "../../atoms/Preloader/Preloader";
import Error from "../../atoms/Error/Error";
import RandomUserCard, {
  NewUser,
} from "../../molecules/RandomUserCard/RandomUserCard";
import { randomShuffledArray } from "../../../utils/randomShuffledArray";
import { prepareAuthors } from "../../../utils/prepareAuthors";
const RandomAuthors = () => {
  const { getRandomUsers, authors, error, clearError, loading } =
    useSearchService();
  const [shuffledWithTitles, setShuffledWithTitles] = useState<NewUser[]>([]);

  useEffect(() => {
    clearError();
    getRandomUsers();
  }, []);

  useEffect(() => {
    if (authors.length > 0) {
      setShuffledWithTitles(prepareAuthors(authors));
    }
  }, [authors]);

  return (
    <div>
      {error && <Error child={error} className={styles.errorContent} />}

      {!error && !loading ? (
        <div className={styles.randomAuthorsContainer}>
          <ContentContainer>
            <div className={styles.randomAuthors}>
              {shuffledWithTitles.map((author) => (
                <RandomUserCard author={author} key={author.login} />
              ))}
            </div>
          </ContentContainer>
        </div>
      ) : (
        <Preloader />
      )}
    </div>
  );
};

export default RandomAuthors;
