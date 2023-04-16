import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import {
  createReviewsLike,
  deleteReviews,
  deleteReviewsLike,
  getMovieMyReview,
  getReviewsMovie,
} from "../../../../api/Review";
import { useRecoilState, useRecoilValue } from "recoil";
import { spoilerState, userState } from "../../../../state";
import { Tag, Toast } from "../../../../components";
import CommentModal from "../../_shared/CommentModal";
import {
  BsFillHeartFill,
  BsHeart,
  BsPencilSquare,
  BsStarFill,
  BsTrash,
} from "react-icons/bs";
import { TfiCommentAlt } from "react-icons/tfi";
import { ImageProfile1 } from "../../../../assets";
import cx from "classnames";
import styles from "./comment.module.scss";
import { msgList } from "../../_shared/toastMsg";

const Comment = ({
  comment,
  profileImage,
  className,
  onGetCommentDetail,
  onGetMovieComments,
  ...props
}) => {
  const navigate = useNavigate();
  const [myComment, setMyComment] = useState();
  const [isLiked, setIsLiked] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [modal, setModal] = useState(false);
  const [toastFloat, setToastFloat] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const enjoyPoints = comment?.enjoyPoints ? comment?.enjoyPoints : [];
  const tensions = comment?.tensions ? comment?.tensions : [];
  const user = useRecoilValue(userState);
  const isAuthor = comment?.user?.id === user?.id;

  const onClickNavigate = (path) => {
    return () => {
      navigate(path);
    };
  };

  const toast = (msg) => {
    if (!toastFloat) {
      setToastFloat(true);
      setToastMsg(msgList[msg]);
    }
  };

  const onGetMyComment = async () => {
    const response = await getMovieMyReview(comment?.movie?.id);
    if (response.status === 200) {
      if (response.data) setMyComment(response.data);
    }
  };

  const onClickNotUser = () => {
    if (!user) {
      setToastFloat(true);
      toast("loginRequired");
    }
  };

  const checkIsLiked = async () => {
    if (user) {
      setIsLiked(comment?.isLiked);
    } else {
      setIsLiked(false);
    }
  };

  const onClickCommentLike = async () => {
    onClickNotUser();
    try {
      if (isLiked) {
        await deleteReviewsLike(comment?.id);
        onGetCommentDetail();
      } else {
        await createReviewsLike(comment?.id);
        onGetCommentDetail();
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(error);
    }
  };

  const onClickDelete = async () => {
    await deleteReviews(comment?.id);
    const currentPathname = window.location.pathname;
    if (currentPathname.startsWith("/commentDetail")) {
      navigate(-1);
    }
    setToastFloat(true);
    toast("delete");
    onGetMovieComments();
  };

  const onClickModify = () => {
    setModal(true);
    setIsModified(true);
  };

  useEffect(() => {
    checkIsLiked();
    onGetMyComment();
  }, [comment?.id]);

  useEffect(() => {
    if (toastFloat) {
      setTimeout(() => {
        setToastFloat(false);
      }, 2000);
    }
  }, [toastFloat]);

  if (!comment) {
    return null;
  }

  return (
    <section className={styles.wrapper} onClick={props.onClick}>
      <Toast float={toastFloat} children={toastMsg} />
      <div className={styles.commentHeader}>
        <div className={styles.userInfo}>
          <img
            src={ImageProfile1}
            alt="userProfileImage"
            className={styles.profileImage}
          />
          <p className={styles.username}>
            {comment.user?.nickname ?? comment.user?.name}
          </p>
          <p className={cx(styles.points, className)}>
            {enjoyPoints?.map((point, index) => (
              <span key={index}>{point}</span>
            ))}
            {tensions?.map((point, index) => (
              <span key={index}>긴장감 {point}</span>
            ))}
          </p>
        </div>

        <p className={styles.userScore}>
          평점
          <BsStarFill className={styles.star} />
          <span>{comment.score?.toFixed(1)}</span>
        </p>
      </div>
      <div className={styles.commentBody}>
        <div className={styles.content}>
          <p onClick={onClickNavigate(`/commentDetail/${comment.id}`)}>
            {comment?.content}
          </p>
        </div>
        {isAuthor && (
          <div className={styles.bodyBtnWrapper}>
            <button className={styles.modifyBtn} onClick={onClickModify}>
              <BsPencilSquare className={styles.iconModify} />
            </button>
            <button className={styles.deleteBtn} onClick={onClickDelete}>
              <BsTrash className={styles.iconDelete} />
            </button>
          </div>
        )}

        <CommentModal
          title={comment.movie?.title}
          comment={comment}
          modal={modal}
          isModified={isModified}
          setModal={setModal}
          myComment={myComment}
          onGetCommentDetail={onGetCommentDetail}
          onGetMovieComments={onGetMovieComments}
        />
      </div>
      <div className={styles.commentFooter}>
        {/* {toastFloat && <Toast>로그인 후 이용 가능합니다.</Toast>} */}
        <div className={styles.footerBtnWrapper}>
          <button className={styles.likeBtn} onClick={onClickCommentLike}>
            {isLiked ? (
              <BsFillHeartFill className={styles.IconFillLike} />
            ) : (
              <BsHeart className={styles.IconLike} />
            )}
            <span>좋아요 {comment?.likeCount ?? "0"}</span>
          </button>
          <button
            type="button"
            className={styles.commentBtn}
            onClick={onClickNavigate(`/commentDetail/${comment.id}`)}
          >
            <TfiCommentAlt className={styles.iconReply} />
            <span>댓글 {comment?.comments?.length ?? "0"}</span>
          </button>
        </div>
        <p className={styles.date}>
          {dayjs(comment?.updatedAt).format("YYYY.MM.DD")}
        </p>
      </div>
    </section>
  );
};

export default Comment;
