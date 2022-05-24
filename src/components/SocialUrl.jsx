import React from "react";
import { Flex, Text } from "../elements";

const SocialUrl = ({ snsUrl }) => {
  //풀 주소가 아닌 ID만 입력해도 링크 연결되도록 바꿨습니다. -영경
  // const insta =
  //   snsUrl?.find((url) => {
  //     return url.includes("instagram");
  //   }) || "";
  const insta = (snsUrl && snsUrl[0]) || "";

  const behance =
    snsUrl?.find((url) => {
      return url.includes("behance");
    }) || "";

  let other = "";
  // 조건 더줘야함 아마도
  if (snsUrl?.length) {
    other = snsUrl[2];
  }
  //5.15 웹사이트를 마이페이지 수정하기에서 수정했을때 바로 아이콘 추가가 안되는 이슈
  // console.log(`insta ${insta} behance ${behance} other ${other}`);

  return (
    <>
      {(insta || behance || other) && (
        <Flex padding="0.5em 0">
          {insta && (
            <Flex margin="0 30px 0 0">
              <img src="/images/instagram.svg" alt="인스타" />
              <Text className="site" margin="0 0 0 5px">
                {insta && (
                  //5.15 앞에 http://를 붙여야 제대로 연결이 되는 것 같습니다.
                  //인스타그램 같은 경우 풀 주소를 받지말고 아이디만 받자
                  <a
                    href={`http://Instagram.com/${snsUrl[0]}`}
                    target="_blank"
                    rel="noreferrer"
                  >
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
          )}

          {other && (
            <Flex margin="0 30px 0 0">
              <img src="/images/web.svg" alt="포트폴리오" />

              <Text className="site" margin="0 0 0 5px">
                {other && (
                  <a href={`http://${other}`} target="_blank" rel="noreferrer">
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
