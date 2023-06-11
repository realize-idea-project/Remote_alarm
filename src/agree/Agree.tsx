import React, { FC } from "react";
import "./Agree.css";

interface Props {
  onAgree: () => void;
}

const Agree: FC<Props> = ({ onAgree }) => {
  return (
    <div className="board">
      <div className="content">
        <div className="content_text">
          <div style={{ marginBottom: "2rem", fontWeight: 700 }}>
            고기차맨 키카
          </div>
          <div>무인 키카에 온 것 환영~ </div>
          <div>지금부터 2시간 이용 가능하시고</div>
          <div>이용중 발생한 문제는 손님책임 동의?</div>
        </div>
        <button className="button_ok" onClick={onAgree}>
          ok염 ㄹㄱ
        </button>
      </div>
    </div>
  );
};

export default Agree;
