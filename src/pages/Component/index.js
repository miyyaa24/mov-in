import React from "react";
import { Button, Carousel, CheckBox, Input, Toggle } from "../../components";
import styles from "./components.module.scss";

const Component = () => {
    return (
        <main>
            <section className={styles.wrapper}>
                <header>
                    <h1>컴포넌트</h1>
                </header>

                <article>
                    <div>
                        <h2>버튼</h2>
                        <div className={styles.buttons}>
                            <Button>저장</Button>
                            <Button color="secondary">취소</Button>
                            <Button color="pink">탈퇴</Button>
                            <Button color="yellow">보기</Button>
                        </div>
                            <Button color="indigo">♡ 2,200</Button>
                        <div className={styles.buttons}>
                            <Button color="selectTag">태그</Button>
                            <Button color="miniTag">태그</Button>
                        </div>
                            <Button color="login">로그인</Button>
                    </div>
                    <div>
                        <h2>체크박스</h2>
                        <CheckBox />
                    </div>
                    <div>
                        <h2>입력창</h2>
                        <Input />
                    </div>
                    <div>
                        <h2>토글</h2>
                        <Toggle />
                    </div>
                    <div>
                        <h2>캐러셀</h2>
                        {/* 실제 작업 페이지에서 title 구현해야 됨! */}
                        <div className={styles.title}>
                            <h3>인기 10위</h3>
                            <p>더보기</p>
                        </div>
                        <Carousel />
                    </div>
                </article>
            </section>
        </main>
    );
};

export default Component;