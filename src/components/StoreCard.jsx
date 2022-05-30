import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Favorite, FavoriteFilled } from "../assets/icons";
import { Flex, Icon, Image, Text } from "../elements";
import { priceComma } from "../shared/utils";
import theme from "../styles/theme";
import Card from "./Card";
import { getMyPostLikeDB } from "../redux/modules/store";
import { history } from "../redux/configureStore";
import _ from "lodash";
import styled from "styled-components";

// TODO: 아이콘 색깔채운거 받아야하나 ?
import { IoMdHeart } from "react-icons/io";

const StoreCard = (props) => {
  const {
    user,
    postId,
    postTitle,
    transaction,
    price,
    imageUrl,
    changeAddress,
    markupCnt,
    onClick,
    myLike,
    isHome = false, // 홈에서 이미지 24로 바꾸기
  } = props;
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user?.user);
  const likeThisPostList = useSelector((state) => state.store.myPostLikeList);

  useEffect(() => {
    // if (currentUser) {
    // dispatch(getMyPostLikeDB());
    // }
  }, []);

  const isMyMarkup = likeThisPostList?.find((v) => v === postId);
  // console.log(likeThisPostList);

  return (
    <Card onClick={onClick}>
      <Image height="168px" br="8px" src={imageUrl} />
      <Flex margin="8px 0">
        {isHome ? (
          <Image circle size="24" src={user?.profileImage} />
        ) : (
          <Image circle size="32" src={user?.profileImage} />
        )}

        <Text h3 margin="0 0 0 8px">
          {user?.nickname}
        </Text>
      </Flex>
      <WrapTitle>
        <Text h3 medium>
          {postTitle ? postTitle : "-"}
        </Text>
      </WrapTitle>
      <Text body2 color={theme.pallete.gray3}>
        {transaction ? transaction : "-"}

        {changeAddress &&
          (changeAddress.length > 10
            ? ` ∙ ${changeAddress.substring(0, 10)}...`
            : ` ∙ ${changeAddress}`)}
      </Text>
      <Flex>
        <Text fg="1">{price ? `${priceComma(price)}` : `0`} 원</Text>
        <Icon width="fit-content">
          <Flex>
            {isMyMarkup ? (
              <FavoriteFilled size="16" color={theme.color.brandColor} />
            ) : (
              <Favorite size="16" color={theme.color.brandColor} />
            )}

            <Text body2 margin="0 0 0 2px">
              {markupCnt}
            </Text>
          </Flex>
        </Icon>
      </Flex>
    </Card>
  );
};
const WrapTitle = styled.div`
  //말줄임 효과 추가. 높이 지정
  overflow: hidden;
  height: 22px;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
export default StoreCard;
