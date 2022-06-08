import React from "react";
import { Flex, Text } from "../elements";
import styled from "styled-components";

const SocialUrl = ({ snsUrl }) => {
  const insta = (snsUrl && snsUrl[0]) || "";
  const behance =
    snsUrl?.find((url) => {
      return url.includes("behance");
    }) || "";

  let other = "";
  if (snsUrl?.length) {
    other = snsUrl[2];
  }

  return (
    <>
      {(insta || behance || other) && (
        <Flex padding="0.5em 0">
          {insta && (
            <WrapInsta>
              <Flex margin="0 30px 0 0">
                <img src="/images/Instagram.svg" alt="인스타" />
                <Text className="site" margin="0 0 0 5px">
                  {insta && (
                    <a
                      href={`http://instagram.com/${snsUrl[0]}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      instagram
                    </a>
                  )}
                </Text>
              </Flex>
            </WrapInsta>
          )}

          {behance && (
            <WrapBehance>
              <Flex margin="0 30px 0 0">
                <img src="/images/Behance.svg" alt="비핸스" />

                <Text className="site" margin="0 0 0 5px">
                  {behance && (
                    <a
                      href={`http://${behance}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Behance
                    </a>
                  )}
                </Text>
              </Flex>
            </WrapBehance>
          )}

          {other && (
            <WrapOther>
              <Flex margin="0 30px 0 0">
                <img src="/images/web.svg" alt="포트폴리오" />

                <Text className="site" margin="0 0 0 5px">
                  {other && (
                    <a
                      href={`http://${other}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Website
                    </a>
                  )}
                </Text>
              </Flex>
            </WrapOther>
          )}
        </Flex>
      )}
    </>
  );
};

const WrapInsta = styled.div`
  cursor: pointer;
`;
const WrapBehance = styled.div`
  cursor: pointer;
`;
const WrapOther = styled.div`
  cursor: pointer;
`;
export default SocialUrl;
