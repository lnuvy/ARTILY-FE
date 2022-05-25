import React from "react";
import { Favorite } from "../assets/icons";
import { Flex, Icon, Image, Text } from "../elements";
import { history } from "../redux/configureStore";
import { priceComma } from "../shared/utils";
import Card from "./Card";
import theme from "../styles/theme";

const StoreMore = (props) => {
  const { postId, images, markupCnt, postTitle, price, onClick } = props;

  if (postId) {
    return (
      <Card onClick={onClick}>
        {console.log(postId)}
        <Image
          height="168px"
          br="8px"
          src={images[0]?.imageUrl}
          shadow="1px 1px 3px #ddd"
        />
        <Text medium h2 margin="8px 0 9px">
          {postTitle}
        </Text>
        <Flex>
          {price ? <Text fg="1">{priceComma(price)} 원</Text> : ""}
          <Icon width="fit-content">
            <Flex jc="center" ai="center">
              <Favorite size="16" color={`${theme.color.brandColor}`} />
              <Text body2 margin="0 0 0 2px">
                {markupCnt}
              </Text>
            </Flex>
          </Icon>
        </Flex>
      </Card>
    );
  } else return null;
};

export default StoreMore;
