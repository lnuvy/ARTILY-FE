import React from "react";
import { Text } from "../elements";
import theme from "../styles/theme";

const FollowCheck = (props) => {
  const { text = false, btn = false, follow = false } = props;

  console.log("followCheck 안", follow);

  if (text)
    return (
      <>
        {follow ? (
          <Text body1 color={theme.pallete.primary900}>
            언팔로우
          </Text>
        ) : (
          <Text body1 color={theme.pallete.primary900}>
            팔로우
          </Text>
        )}
      </>
    );
  if (btn) return <></>;
};

export default FollowCheck;
