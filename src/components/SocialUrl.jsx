import React from "react";
import { Flex, Text } from "../elements";

const SocialUrl = ({ snsUrl }) => {
  const insta =
    snsUrl?.find((url) => {
      return url.includes("instagram");
    }) || "";

  const behance =
    snsUrl?.find((url) => {
      return url.includes("behance");
    }) || "";

  let other = "";
  // 조건 더줘야함 아마도
  if (snsUrl?.length) {
    other = snsUrl[2];
  }

  console.log(`insta ${insta} behance ${behance} other ${other}`);

  return (
    <>
      {(insta || behance || other) && (
        <Flex padding="0.5em 0">
          {insta && (
            <Flex margin="0 30px 0 0">
              <img src="/images/instagram.svg" alt="인스타" />
              <Text className="site" margin="0 0 0 5px">
                {insta && (
                  <a href={insta} target="_blank" rel="noreferrer">
                    instagram
                  </a>
                )}
              </Text>
            </Flex>
          )}

          {behance && (
            <Flex margin="0 30px 0 0">
              <img src="/images/Behance.svg" alt="비핸스" />

              <Text className="site" margin="0 0 0 5px">
                {behance && (
                  <a href={behance} target="_blank" rel="noreferrer">
                    Behance
                  </a>
                )}
              </Text>
            </Flex>
          )}

          {other && (
            <Flex margin="0 30px 0 0">
              <img src="/images/web.svg" alt="포트폴리오" />

              <Text className="site" margin="0 0 0 5px">
                {other && (
                  <a href={other} target="_blank" rel="noreferrer">
                    Website
                  </a>
                )}
              </Text>
            </Flex>
          )}
        </Flex>
      )}
    </>
  );
};

export default SocialUrl;
