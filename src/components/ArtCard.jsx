import React from "react";
import styledComponents from "styled-components";
import { Card } from "../components";
import { Flex, Image, Text } from "../elements/index";
import { history } from "../redux/configureStore";

const ArtCard = (props) => {
  const { key, artist, title, method, region, price, onClick } = props;

  const cardClick = () => {
    console.log("hi");
    history.push("/store/:1");
  };
  return (
    <Card key={key ? key : null} onClick={cardClick}>
      <Image height="120px" />
      <Flex margin="8px 0 0 0">
        <Image shape="circle" size="20" />
        <Text margin="0 0 0 4px">{artist ? artist : null}</Text>
      </Flex>
      <Text>{title ? title : null}</Text>
      <Text>
        {method ? method : null} ∙ {region ? region : null}
      </Text>
      <Text bold>{price ? price : null}원</Text>
    </Card>
  );
};

export default ArtCard;
