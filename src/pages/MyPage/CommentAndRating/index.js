import React, { useEffect, useState } from "react";
import { getReviewMe } from "../../../api/Review";
import Card from "../../../components/Common/Card";
import Paging from "../../../components/Common/Pagination";
import styles from "./commentAndRating.module.scss";

const POST_PER_PAGE = 10;

const CommentAndRating = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const onChange = (page) => {
    setPage(page);
  };

  const onGetMovies = async () => {
    const response = await getReviewMe();
    if (response.status === 200) {
      const movie = [...response.data];
      setMovies(movie);
    }
  };

  const onGetMoviesCount = async () => {
    const response = await getReviewMe();
    if (response.status === 200) {
      setTotalCount(response.data.length);
    }
  };

  useEffect(() => {
    onGetMovies();
    onGetMoviesCount();
  }, []);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>
        <span>{totalCount}</span>개의 영화를 '좋아요' 했어요 !
      </h2>
      <div className={styles.gridContainer}>
        {movies.map((movie) => (
            <Card movie={movie} />
        ))}
      </div>
      <Paging
        totalCount={totalCount}
        page={page}
        postPerPage={POST_PER_PAGE}
        pageRangeDisplayed={5}
        onChange={onChange}
      />
    </section>
  );
};

export default CommentAndRating;
