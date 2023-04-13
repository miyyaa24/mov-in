import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovie } from "../../../api/Movie";
import { getReviewsMovie } from "../../../api/Review";
import { formatRuntime } from "../_shared/formatRuntime";
import Comment from "./Comment";
import styles from "./commentList.module.scss";

const CommentList = ({}) => {
  const { id } = useParams();
  const [comments, setComments] = useState();
  const [movie, setMovie] = useState();
  const formattedRuntime = formatRuntime(movie?.runtime || 0);
  console.log(movie);

  const onGetMovieDetail = async () => {
    try {
      const response = await getMovie(id);
      if (response.status === 200) {
        setMovie(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onGetReviewsMovie = async () => {
    try {
      const response = await getReviewsMovie(id);
      if (response.status === 200) {
        const sortedComments = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setComments(sortedComments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    onGetReviewsMovie();
    onGetMovieDetail();
  }, [id]);

  if (!comments) {
    return null;
  }

  return (
    <main>
      <div className={styles.backgroundWrapper}>
        <img
          className={styles.backgroundImg}
          src={movie?.postImage}
          alt="thumbnail"
        />
        <div className={styles.backgroundGradient} />
      </div>
      <section className={styles.wrapper}>
        <article className={styles.infoWrapper}>
          <div className={styles.title}>
            <h1>{movie?.title}</h1>
          </div>
          <div className={styles.info}>
            <p>{formattedRuntime}</p>
            <p>{movie?.genres.map((genre) => genre.name).join(", ")}</p>
            <p>{dayjs(movie?.releasedAt, "YYYYMMDD").format("YYYY.MM.DD")}</p>
          </div>
        </article>
        <article className={styles.detailInfoWrapper}>
          <div className={styles.commentWrapper}>
            <h2>코멘트</h2>
            <div className={styles.innerWrapper}>
              <ul className={styles.commentList}>
                {comments.map((comment) => (
                  <li key={comment.id} className={styles.comment}>
                    <Comment
                      comment={comment}
                      onGetReviewsMovie={onGetReviewsMovie}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      </section>
    </main>
  );
};

export default CommentList;

// return (
//   <article className={styles.wrapper}>
//     <h2>코멘트</h2>
//     <ul className={styles.commentList}>
//       {comments.map((comment) => (
//         <li key={comment.id} className={styles.comment}>
//           <Comment comment={comment} onGetReviewsMovie={onGetReviewsMovie} />
//         </li>
//       ))}
//     </ul>
//   </article>
// );
