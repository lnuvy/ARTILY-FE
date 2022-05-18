import React from "react";
import styled from "styled-components";

const SellLabel = (props) => {
  const {
    done = false,
    manageLabel = null,
    pageLabel = null,
    storeLabel = null,
  } = props;

  if (manageLabel) {
    //마이페이지 판매작품 관리하기 탭
    return (
      <>
        {done ? (
          <SmallLabel>
            <p className="complete">판매완료</p>
          </SmallLabel>
        ) : (
          <SmallLabel>
            <p className="selling">판매중</p>
          </SmallLabel>
        )}
      </>
    );
  } else if (pageLabel) {
    //마이페이지 하단 판매목록
    return (
      <>
        {done ? (
          <Label>
            <p className="complete">판매완료</p>
          </Label>
        ) : (
          <Label>
            <p className="selling">판매중</p>
          </Label>
        )}
      </>
    );
  } else if (storeLabel) {
    //스토어 상세
    return (
      <>
        {done ? (
          <StoreLabel>
            <p className="complete">판매완료</p>
          </StoreLabel>
        ) : (
          <StoreLabel>
            <p className="selling">판매중</p>
          </StoreLabel>
        )}
      </>
    );
  } else {
    return null;
  }
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
