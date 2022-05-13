import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

const SellLabel = (props) => {
  const { done, complete1, complete2, complete3, selling1, selling2 } = props;

  if (complete1) {
    //마이페이지 판매작품 관리하기 탭
    return (
      <>
        <SmallLabel>
          <p className="complete">판매완료</p>
        </SmallLabel>
      </>
    );
  } else if (selling1) {
    return (
      <SmallLabel>
        <p className="selling">판매중</p>
      </SmallLabel>
    );
  } else if (complete2) {
    //마이페이지 하단 판매목록
    return (
      <Label>
        <p className="complete">판매완료</p>
      </Label>
    );
  } else if (selling2) {
    return (
      <Label>
        <p className="selling">판매중</p>
      </Label>
    );
  } else if (complete3) {
    //스토어 상세
    return (
      <StoreLabel>
        <p className="complete">판매완료</p>
      </StoreLabel>
    );
  } else {
    return null;
  }
};

SellLabel.defaultProps = {
  done: false,
};

//마이페이지=> 판매작품 관리하기에서 사용되는 라벨
const SmallLabel = styled.div`
  /* position: relative; */
  //판매완료 label
  .complete,
  .selling {
    height: 28px;
    padding: 0 5px;
    font-size: 13px;
    margin: 10px 0 0 8px;
    border-radius: 5px;
    line-height: 28px;
  }
  .complete {
    color: #fff;
    background-color: ${({ theme }) => `${theme.pallete.primary850}`};
  }
  .selling {
    color: ${({ theme }) => `${theme.pallete.primary850}`};
    border: 1px solid ${({ theme }) => `${theme.pallete.primary850}`};
    background-color: #fff;
  }
`;

//마이페이지 하단 판매목록에 사용되는 라벨
const Label = styled.div`
  position: relative;
  .complete,
  .selling {
    position: absolute;
    top: 7px;
    left: 7px;
    height: 30px;
    padding: 0 8px;
    line-height: 30px;
    color: #fff;
    border-radius: 8px;
    font-size: 14px;
  }
  //판매완료 label
  .complete {
    background-color: ${({ theme }) => `${theme.pallete.gray3}`};
  }
  //판매중 label
  .selling {
    background-color: #fff;
    background-color: ${({ theme }) => `${theme.pallete.primary850}`};
  }
`;

//판매글 조회시 판매완료 글일 때 사용되는 라벨
const StoreLabel = styled.div`
  .complete {
    height: 25px;
    padding: 0 8px;
    font-size: 13px;
    margin: 0 0 0 8px;
    border-radius: 5px;
    line-height: 25px;
    color: #fff;
    background-color: ${({ theme }) => `${theme.pallete.primary850}`};
  }
`;
export default SellLabel;
