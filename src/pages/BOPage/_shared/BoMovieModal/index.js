import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getMovie } from "../../../../api/Movie";

import { Modal, Button } from "../../../../components";

import styles from "./boMovieModal.module.scss";

const BoMovieModal = ({ movie, modal, setModal }) => {
  const onClickModal = () => {
    setModal(!modal);
  };

  const { id } = useParams();

  const [movies, setMovies] = useState([]);

  const onGetMovieDetail = async () => {
    try {
      const response = await getMovie(id);
      if (response.status === 200) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    onGetMovieDetail();
  }, [id]);

  if (!movie) {
    return null;
  }

  return (
    modal && (
      <Modal
        className={styles.boMovieModal}
        movie={movie}
        title={"영화 관리"}
        onClick={onClickModal}
      >
        <form className={styles.wrapper}>
          <section className={styles.postWrapper}>
            <img
              className={styles.postImage}
              src={movie.postImage}
              alt="thumbnail"
            />
            <div className={styles.content}>
              <Button className={styles.likeButton} color={"dark"}>
                <BsFillHeartFill />
                {movie.likeCount}
              </Button>
              {/* <Button
                className={styles.views}
                color="dark"
              ></Button> */}
              <Button className={styles.averageScore} color={"dark"}>
                <h2>평균평점</h2>{" "}
                {movie.averageScore ? (
                  <span className={styles.averageScore}>
                    {<BsStarFill className={styles.IconStar} />}
                    {movie.averageScore.toFixed(1)}
                  </span>
                ) : null}
              </Button>
              <p className={styles.plot}>{movie.plot}</p>
            </div>
          </section>
          <div className={styles.buttonWrapper}>
            <Button
              className={styles.modify}
              color={"primary"}
              children={"수정"}
            />
            <Button
              className={styles.cancel}
              color={"secondary"}
              children={"취소"}
            />
          </div>
        </form>
      </Modal>
    )
  );
};

export default BoMovieModal;