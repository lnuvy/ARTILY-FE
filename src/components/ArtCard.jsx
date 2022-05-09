import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { Card } from "../components";
import { Flex, Image, Text, Wrap, Button } from "../elements";
import { priceComma } from "../shared/utils";
import { useHistory } from "react-router-dom";
import { myPageDummy } from "../shared/Dummy";
import { AiOutlineHeart } from "react-icons/ai";
// key 값은 따로 props로 안주셔도 에러가 안나서 뺐고, 명세서대로 변수명 일치시켰습니당 4/29 한울

const ArtCard = (props) => {
  console.log(props);
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
    nickname,
    likeCnt,
    markupCnt,
    mystore,
    sellLabel,
    buylist,
    review,
    markup,
    reviewTitle,
    reviewContent,
    done,
    userId,
    profileImage,
    address,
  } = props;
  // const { userId, profileImage, address } = user;

  //5.5 영경_마이페이지 -> 판매작품 관리하기에서 사용될 Artcard 추가
  if (mystore) {
    return (
      <>
        <Card onClick={onClick}>
          <Flex>
            <Image width="35%" src={imageUrl[0]} margin="0 10px 0 10px" />

            <Wrap>
              <Flex>
                <Text fg="1">{postTitle}</Text>
                <SmallLabel>
                  {done === "true" ? (
                    <p className="complete">판매완료</p>
                  ) : (
                    <p className="selling">판매중</p>
                  )}
                </SmallLabel>
              </Flex>
              {price ? (
                <Text fg="1" bold>
                  {priceComma(price)}원
                </Text>
              ) : (
                ""
              )}
              <Wrap fg="0" padding="10px 0 0 0">
                <AiOutlineHeart color="#FD6A00" />
                {markupCnt}
              </Wrap>
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
            {done === "true" ? (
              <p
                onClick={() => {
                  window.confirm("정말 판매중으로 변경하시겠어요?");
                  //done이 false로 바뀌어야 함. 아직 구현 못함
                }}
              >
                판매중으로 변경
              </p>
            ) : (
              <p
                onClick={() => {
                  window.confirm("정말 판매완료로 변경하시겠어요?");
                  //done이 false로 바뀌어야 함. 아직 구현 못함
                }}
              >
                판매완료로 변경
              </p>
            )}
            {/* 판매완료 상품을 보고 있을때는 판매중으로 변경이 있어야함 */}
          </Flex>
        </Sell>
      </>
    );
  } else if (buylist) {
    //마이페이지=> 구매내역 조회 / 리뷰 작성
    return (
      <>
        <Card onClick={onClick}>
          <Border>
            <Flex>
              <Image width="140px" src={imageUrl[0]} margin="0 10px 0 10px" />
              <Wrap width="60%">
                <Text bold>{postTitle}</Text>
                <Text body2 margin="8px 0 0 0">
                  {nickname}
                </Text>
              </Wrap>
              <Button margin="0 15px 0 0" padding="10px" width="30vw">
                리뷰 쓰기
              </Button>
            </Flex>
          </Border>
        </Card>
      </>
    );
  } else if (sellLabel) {
    //마이페이지 하단 판매목록
    return (
      <Card onClick={onClick}>
        <Label>
          {/* 판매중인 상품과 판매완료된 상품을 구별할 라벨입니다. */}
          {done === "true" ? (
            <p className="complete">판매완료</p>
          ) : (
            <p className="selling">판매중</p>
          )}
          <Image height="120px" src={imageUrl[0]} />
        </Label>
        <Flex margin="8px 0 0">
          <Image circle size="20" src={profileImage} />
          <Text margin="0 0 0 4px">{nickname}</Text>
        </Flex>
        <Text>{postTitle}</Text>
        <Flex>
          {/* 에러가 나서 삼항연산자 걸어놨습니당 -영경 */}
          {price ? (
            <Text fg="1" bold>
              {priceComma(price)}원
            </Text>
          ) : (
            ""
          )}
          <Wrap fg="0">
            <AiOutlineHeart color="#FD6A00" />
            {markupCnt}
          </Wrap>
        </Flex>
      </Card>
    );
  } else if (review) {
    //리뷰목록
    return (
      <Card onClick={onClick}>
        <Image height="120px" src={imageUrl[0]} />
        <Text bold>{reviewTitle}</Text>
        <Text body2>{reviewContent}</Text>
        <Flex margin="8px 0 0">
          <Image circle size="20" src={user.profileImage} />
          <Text fg="1" margin="0 0 0 4px">
            {user.nickname}
          </Text>
          <Wrap fg="0">
            <AiOutlineHeart color="#FD6A00" />
            {likeCnt}
          </Wrap>
        </Flex>
      </Card>
    );
  } else if (markup) {
    //관심목록
    return (
      <Card onClick={onClick}>
        <Label>
          {/* 판매중인 상품과 판매완료된 상품을 구별할 라벨입니다. */}
          {/* {/* <p className="selling">판매중</p> */}
          {done === "true" ? ( //판매완료일 경우
            <p className="complete">판매완료</p>
          ) : (
            <p className="selling">판매중</p>
          )}
          <Image height="120px" src={imageUrl[0]} />
        </Label>
        <Text>{postTitle}</Text>
        <Flex>
          {price ? (
            <Text fg="1" bold>
              {priceComma(price)}원
            </Text>
          ) : (
            ""
          )}

          <Wrap fg="0">
            <AiOutlineHeart color="#FD6A00" />
            {markupCnt}
          </Wrap>
        </Flex>
      </Card>
    );
  } else {
    return (
      <Card onClick={onClick}>
        <Image height="120px" src={imageUrl[0]} />
        <Flex margin="8px 0 0">
          <Image circle size="20" src={user.profileImage} />
          <Text margin="0 0 0 4px">{user.nickname}</Text>
        </Flex>
        <Text>{postTitle}</Text>
        <Text>
          {transaction} ∙ {address}
        </Text>
        <Text bold>{priceComma(price)}원</Text>
        <Text>{reviewContent}</Text>
      </Card>
    );
  }
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

const SmallLabel = styled.div`
  /* position: relative; */
  //판매완료 label
  .complete,
  .selling {
    height: 28px;
    padding: 5px;
    font-size: 13px;
    margin-left: 10px;
    border-radius: 5px;
  }
  .complete {
    color: #fff;
    background-color: ${({ theme }) => `${theme.color.brandColor}`};
  }
  .selling {
    color: ${({ theme }) => `${theme.color.brandColor}`};
    border: 1px solid ${({ theme }) => `${theme.color.brandColor}`};
    background-color: #fff;
  }
`;
const Label = styled.div`
  position: relative;
  //판매완료 label
  .complete,
  .selling {
    position: absolute;
    top: 7px;
    left: 7px;
    height: 30px;
    padding: 5px;
    color: #fff;
    border-radius: 8px;
    font-size: 14px;
  }
  //판매완료 label
  .complete {
    background-color: ${({ theme }) => `${theme.color.black}`};
  }
  //판매중 label
  .selling {
    background-color: #fff;
    background-color: ${({ theme }) => `${theme.color.brandColor}`};
  }
`;
const Border = styled.div`
  padding-top: 10px;
  border-top: 1px solid #ddd;
`;
export default ArtCard;
