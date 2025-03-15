import styles from "./RandomAuthors.module.scss";
import { ContentContainer } from "../ContentContainer";
import useSearchService from "../../../servises/useSearchService";
import { useEffect, useState } from "react";
import Preloader from "../../atoms/Preloader/Preloader";
import Error from "../../atoms/Error/Error";
import RandomUserCard from "../../molecules/RandomUserCard/RandomUserCard";
import { randomShuffledArray } from "../../../utils/randomShuffledArray";
import { User } from "../../../types/userTypes";
const RandomAuthors = () => {
  const { getUsers, authors, error, clearError, loading } = useSearchService();
  const [shuffled, setShuffled] = useState<User[]>([]);

  useEffect(() => {
    clearError();
    getUsers();
  }, []);

  useEffect(() => {
    if (authors.length > 0) {
      setShuffled(randomShuffledArray(authors));
    }
  }, [authors]);

  return (
    <div>
      {error && <Error child={error} className={styles.errorContent} />}

      {!error && !loading ? (
        <div className={styles.randomAuthorsContainer}>
          <ContentContainer>
            <div className={styles.randomAuthors}>
              {shuffled.map((author) => (
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
