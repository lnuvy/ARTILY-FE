import React from "react";
import { RadioButtonChecked, RadioButtonUnchecked } from "../assets/icons";
import { Flex, Image, Text } from "../elements";

const ProfileCard = ({ onClick, current }) => {
  return (
    <Flex
      bc="white"
      borderTop="1px solid #ddd"
      onClick={onClick}
      jc="space-between"
    >
      <Flex>
        <Image margin="16px" circle src="" size="48" />
        <Text>유저명</Text>
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
