import React from "react";
import { Text } from "../elements";
import theme from "../styles/theme";
import styled from "styled-components";
const FollowCheck = (props) => {
  const { text = false, btn = false, follow = false } = props;

  // console.log("followCheck 안", follow);

  if (text)
    return (
      <>
        {follow ? (
          <Unfollow body1 color={theme.pallete.primary900}>
            언팔로우
          </Unfollow>
        ) : (
          <Follow body1 color={theme.pallete.primary900}>
            팔로우
          </Follow>
        )}
      </>
    );
  if (btn) return <></>;
};

const Unfollow = styled.p`
  cursor: pointer;
  color: ${({ theme }) => theme.pallete.primary900};
`;
const Follow = styled.p`
  cursor: pointer;
  color: ${({ theme }) => theme.pallete.primary900};
`;
export default FollowCheck;
