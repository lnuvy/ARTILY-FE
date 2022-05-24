import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Flex, Grid, Text, Wrap } from "../../../elements";
import { closeModal } from "../../../redux/modules/modal";

import styled from "styled-components";
import theme from "../../../styles/theme";
import { useHistory } from "react-router-dom";

const cate = [
  "회화",
  "도자",
  "가구",
  "패션/주얼리",
  "사진/포스터",
  "조각",
  "기타",
];

const CategoryModal = ({ setReceiveCategory, receiveCategory }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [current, setCurrent] = useState(receiveCategory);

  const divClickChange = (c) => {
    setCurrent(c);
  };

  const submitCategory = () => {
    console.log(current);
    setReceiveCategory(current);
    dispatch(closeModal());
  };
  const closeCategory = () => {
    dispatch(closeModal());
  };
  return (
    <Wrap padding="0" bc="white">
      <Text h1 medium textAlign="center" margin="40px 0 40px">
        카테고리 선택
      </Text>

      <Grid rg="0" height="fit-content" cg="0px" bc="white">
        {cate.map((c, i) => {
          return (
            <Wrapcate key={`${c}_type_idx${i}`}>
              <Flex
                jc="space-between"
                height="fit-content"
                // margin="0 20px"
                onClick={() => divClickChange(c)}
                className="wrap"
              >
                <label htmlFor={c} style={{ margin: "0 0 0 16px" }}>
                  {c}
                </label>

                <Radio
                  type="radio"
                  value={c}
                  checked={current === c}
                  onChange={(e) => setCurrent(e.target.value)}
                />
              </Flex>{" "}
            </Wrapcate>
          );
        })}
      </Grid>

      <SubmitDiv>
        <Flex>
          <Button
            width="100%"
            margin="20px 5px 20px 0 "
            onClick={submitCategory}
          >
            선택 완료
          </Button>
          <Button width="100%" margin="20px 0 20px 0" onClick={closeCategory}>
            취소
          </Button>
        </Flex>
      </SubmitDiv>
    </Wrap>
  );
};

const Radio = styled.input`
  appearance: none;
  outline: none;
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 100%;
  border: 1px solid gray;
  margin-right: 0.1rem;
  margin: 16px;
  background-color: white;

  // TODO: 보더 살리면서 안쪽 쪼끔만 색칠하기
  &[type="radio"]:checked {
    border: none;
    background-color: #fd6a00;
  }

  border-bottom: 1px solid gray;
`;

const SubmitDiv = styled.div`
  width: calc(100% - 32px);
  position: absolute;
  bottom: 16px;
`;
const Wrapcate = styled.div`
  &:nth-of-type(1) {
    border-top: 1px solid ${({ theme }) => theme.pallete.gray1};
  }
  border-bottom: 1px solid ${({ theme }) => theme.pallete.gray1}; ;
`;
export default CategoryModal;
