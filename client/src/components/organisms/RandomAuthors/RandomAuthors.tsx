import styles from "./RandomAuthors.module.scss";
import { ContentContainer } from "../ContentContainer";
import { useContext, useEffect, useState } from "react";
import Preloader from "../../atoms/Preloader/Preloader";
import Error from "../../atoms/Error/Error";
import RandomUserCard, {
  NewUser,
} from "../../molecules/RandomUserCard/RandomUserCard";
import { prepareAuthors } from "../../../utils/prepareAuthors";
import { RandomAuthorsContext } from "../../../context/RandomAuthorsContext";

const RandomAuthors = () => {
  const [shuffledWithTitles, setShuffledWithTitles] = useState<NewUser[]>([]);
  const { authors, randomIssuesError, loading } =
    useContext(RandomAuthorsContext);

  useEffect(() => {
    if (authors.length > 0) {
      setShuffledWithTitles(prepareAuthors(authors));
    }
  }, [authors]);

  return (
    <div>
      {randomIssuesError && (
        <Error child={randomIssuesError} className={styles.errorContent} />
      )}

      {!randomIssuesError && !loading ? (
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
