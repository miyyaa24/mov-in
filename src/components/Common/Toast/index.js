import React, { useState, useEffect, memo } from "react";
import { CSSTransition } from "react-transition-group";
import cx from "classnames";
import styles from "./toast.module.scss";
import { IconGreenCheck } from "../../../assets/icon";
import { IconClose } from "../../../assets/icon";

const transitionStyle = {
  entering: {
    opacity: 1,
    //위치 조정
    transform: "translate(-50%, 140%)",
    //애니메이션 조정
    transition: "opacity 500ms ease-in-out",
  },

  exiting: {
    opacity: 0,
    //위치 조정
    transform: "translate(-50%, 140%)",
    //애니메이션 조정
    transition: "opacity 500ms ease-in-out",
  },

  exited: {
    opacity: 0,
    transform: "translate(-50%, 140%)",
    transition: "opacity 500ms ease-in-out",
  },
};

const Toast = ({ className, type, children, func, float, ...props }) => {
  return (
    <CSSTransition in={float} timeout={3000} unmountOnExit>
      {(state) => (
        <section
          style={{ ...transitionStyle[state] }}
          className={cx(styles.toast, className, styles[type])}
        >
          <figure className={cx(styles.circle)}>
            <IconGreenCheck />
          </figure>
          {children}
          {/* <button onClick={func}>
              <IconClose />
            </button> */}
        </section>
      )}
    </CSSTransition>
  );
};

export default memo(Toast);
