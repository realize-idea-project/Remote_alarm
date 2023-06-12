import { FC } from "react";
import styled from "styled-components";

interface Props {
  onAgree: () => void;
}

export const Agree: FC<Props> = ({ onAgree }) => {
  return (
    <Container>
      <Content>
        <ContentText>
          <Heading>고기차맨 키카</Heading>
          <div>무인 키카에 온 것 환영~ </div>
          <div>지금부터 2시간 이용 가능하시고</div>
          <div>이용중 발생한 문제는 손님책임 동의?</div>
        </ContentText>
        <OKButton onClick={onAgree}>ok염 ㄹㄱ</OKButton>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContentText = styled.div`
  font-size: 1.5rem;
  font-weight: lighter;
  font-family: Arial, Helvetica, sans-serif;
`;

const Heading = styled.div`
  margin-bottom: 2rem;
  font-weight: 700;
`;

const OKButton = styled.button`
  margin-top: 3rem;
  height: 2rem;
`;
