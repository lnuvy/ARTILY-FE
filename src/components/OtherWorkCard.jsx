import React from "react";
import styled from "styled-components";
import { Card } from "../components";
import { Image, Text, Wrap } from "../elements/index";
import { priceComma } from "../shared/utils";
const OtherWorkCard = (props) => {
  const { onClick, postTitle, price, src } = props;

  return (
    <Card onClick={onClick}>
      <Image height="168px" src={src} />
      <Wrap margin="0 0 ">
        <Text>{postTitle}</Text>
        <Text>{priceComma(price)}원</Text>
      </Wrap>
    </Card>
  );
};

export default OtherWorkCard;
