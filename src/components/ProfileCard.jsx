import React from "react";
import { RadioButtonChecked, RadioButtonUnchecked } from "../assets/icons";
import { Flex, Image, Text } from "../elements";

const ProfileCard = ({ onClick, current, nickname, profileImage }) => {
  return (
    <Flex
      bc="white"
      borderTop="1px solid #ddd"
      onClick={onClick}
      jc="space-between"
    >
      <Flex>
        <Image margin="16px" circle size="48" src={profileImage} />
        <Text>{nickname}</Text>
      </Flex>

      {current ? (
        <Flex margin="28px 16px">
          <RadioButtonChecked />
        </Flex>
      ) : (
        <Flex margin="28px 16px">
          <RadioButtonUnchecked />
        </Flex>
      )}
    </Flex>
  );
};

export default ProfileCard;
