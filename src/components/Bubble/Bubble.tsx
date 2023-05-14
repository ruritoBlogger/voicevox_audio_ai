import { css } from "@emotion/css";

export const Bubble = (): JSX.Element => {
  return (
    <>
      <div style={{ position: "relative" }}>
        <div className={largeBubbleStyle} />
        <div className={middleBubbleStyle} />
        <div className={smallBubbleStyle} />
      </div>
    </>
  );
};

const largeBubbleStyle = css`
  @keyframes largeBubble {
    0%,
    66% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }

  && {
    animation-name: largeBubble;
    animation-duration: 3s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: skyblue;
    position: absolute;
    top: 0;
    left: 20px;
  }
`;

const middleBubbleStyle = css`
  @keyframes middleBubble {
    0%,
    33% {
      opacity: 0;
    }

    66%,
    100% {
      opacity: 1;
    }
  }

  && {
    animation-name: middleBubble;
    animation-duration: 3s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: skyblue;
    position: absolute;
    top: 35px;
    left: 10px;
  }
`;

const smallBubbleStyle = css`
  @keyframes smallBubble {
    0% {
      opacity: 0;
    }

    33%,
    100% {
      opacity: 1;
    }
  }

  && {
    animation-name: smallBubble;
    animation-duration: 3s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: skyblue;
    position: absolute;
    top: 70px;
    left: 0;
  }
`;
