import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components";
import { Flex, Image, Text, Wrap, Button } from "../elements";
import { priceComma } from "../shared/utils";
import { useHistory } from "react-router-dom";
// key 값은 따로 props로 안주셔도 에러가 안나서 뺐고, 명세서대로 변수명 일치시켰습니당 4/29 한울
const ArtCard = (props) => {
  const history = useHistory();
  // ArtCard
  const location = useLocation();

  // const postList = useSelector((state) => state.store.list);
  // console.log(postList);

  const {
    onClick,
    user,
    postTitle,
    price,
    category,
    transaction,
    imageUrl,
    mystore,
    sellLabel,
    buylist,
  } = props;
  const { userId, nickname, profileUrl, address } = user;

  //5.5 영경_마이페이지 -> 판매작품 관리하기에서 사용될 Artcard 추가
  if (mystore) {
    return (
      <>
        <Card onClick={onClick}>
          <Flex>
            <Image height="120px" src={imageUrl[0]} margin="0 10px 0 10px" />

            <Wrap>
              <Flex>
                <Image circle size="20" src={profileUrl} />
                <Text margin="0 0 0 4px">{nickname}</Text>
              </Flex>
              <Text>{postTitle}</Text>
              <Text>
                {transaction} ∙ {address}
              </Text>
              <Text bold>{priceComma(price)}원</Text>
            </Wrap>
          </Flex>
        </Card>
        <Sell>
          <Flex>
            <p
              onClick={() => {
                //일단 넣어둠
                history.push("/store/write");
              }}
            >
              수정하기
            </p>
            <p
              onClick={() => {
                window.confirm(
                  "삭제 후에는 복구가 불가능 합니다. 정말 삭제하시겠습니까?"
                );
              }}
            >
              삭제하기
            </p>
            {/* 판매중인 상품을 보고있을때 */}
            <p
              onClick={() => {
                window.confirm("정말 판매완료로 변경하시겠어요?");
              }}
            >
              판매완료로 변경
            </p>
            {/* 판매완료 상품을 보고 있을때는 판매중으로 변경이 있어야함 */}
          </Flex>
        </Sell>
      </>
    );
  } else if (buylist) {
    //마이페이지=> 구매내역 조회
    return (
      <>
        <Card onClick={onClick}>
          <Flex>
            <Image width="120px" src={imageUrl[0]} margin="0 10px 0 10px" />
            <Wrap width="60%">
              <Text>{postTitle}</Text>
              <Flex>
                <Image circle size="20" src={profileUrl} />
                <Text margin="0 0 0 4px">{nickname}</Text>
              </Flex>
            </Wrap>
            <Button margin="0 10px 0 0" padding="10px" width="30vw">
              리뷰 쓰기
            </Button>
          </Flex>
        </Card>
      </>
    );
  } else if (sellLabel) {
    //마이페이지 하단 판매목록
    //일단 여기에 조건 걸어서 넣었는데 더 좋은 방법이 있다면 바꿔도 좋을 것 같습니다. -영경
    return (
      <Card onClick={onClick}>
        <Label>
          {/* 판매중인 상품과 판매완료된 상품을 구별할 라벨입니다. */}
          <p className="selling">판매중</p>
          {/* <p className="complete">판매완료</p> */}

          <Image height="120px" src={imageUrl[0]} />
        </Label>
        <Flex margin="8px 0 0">
          <Image circle size="20" src={profileUrl} />
          <Text margin="0 0 0 4px">{nickname}</Text>
        </Flex>
        <Text>{postTitle}</Text>
        <Text>
          {transaction} ∙ {address}
        </Text>
        <Text bold>{priceComma(price)}원</Text>
      </Card>
    );
  }
  return (
    <Card onClick={onClick}>
      <Image height="120px" src={imageUrl[0]} />
      <Flex margin="8px 0 0">
        <Image circle size="20" src={profileUrl} />
        <Text margin="0 0 0 4px">{nickname}</Text>
      </Flex>
      <Text>{postTitle}</Text>
      <Text>
        {transaction} ∙ {address}
      </Text>
      <Text bold>{priceComma(price)}원</Text>
    </Card>
  );
};
const Sell = styled.div`
  margin: 10px 0;
  border-top: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  height: 50px;
  p {
    border-right: 1px solid #ddd;
    /* width: 33%; */
    /* text-align: center; */
    height: 50px;
    line-height: 50px;
    font-weight: bold;
    cursor: pointer;
  }
  p:nth-of-type(1),
  p:nth-of-type(2) {
    padding: 0 1em;
  }
  //판매완료로 변경 버튼 전체영역이 눌렸으면 좋겠는데 아직 해결 못함
  p:nth-of-type(3) {
    border-right: none;
    margin: auto;
  }
`;

const Label = styled.div`
  position: relative;
  //판매완료 label
  .complete {
    position: absolute;
    top: 7px;
    left: 7px;
    height: 30px;
    padding: 5px;
    color: #fff;
    border-radius: 8px;
    background-color: ${({ theme }) => `${theme.color.brandColor}`};
  }
  //판매중 label
  .selling {
    position: absolute;
    top: 7px;
    left: 7px;
    height: 30px;
    padding: 5px;
    color: ${({ theme }) => `${theme.color.brandColor}`};
    border-radius: 8px;
    box-shadow: 1px 1px 1px gray;
    background-color: #fff;
  }
`;

export default ArtCard;
