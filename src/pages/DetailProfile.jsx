//소셜 로그인후 기본 프로필(사진, 닉네임) 설정=> 나머지 프로필 정보 설정하는 페이지

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Textarea, Button, Image, Wrap } from "../elements";
import { history } from "../redux/configureStore";
import { getUserInfo, setProfileDB } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { AddBox } from "../assets/icons";

const DetailProfile = () => {
  const dispatch = useDispatch();
  const getProfile = useSelector((state) => state.user.user);

  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  const [nickname, setNickname] = useState(getProfile?.nickname || "");
  const [website1, setWebsite1] = useState("");
  const [website2, setWebsite2] = useState("");
  const [website3, setWebsite3] = useState("");
  const [introduce, setIntroduce] = useState("");

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  // 닉네임 인풋에 보여주기
  useEffect(() => {
    setNickname(getProfile.nickname);
  }, [getProfile.nickname]);

  const editUser = () => {
    // const file = fileInput.current.files[0];
    // console.log(file);
    //새로운 객체 생성
    const formData = new FormData();

    formData.append("snsUrl", [website1]);
    formData.append("snsUrl", [website2]);
    formData.append("snsUrl", [website3]);
    formData.append("introduce", introduce);

    console.log("formData", formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(setProfileDB(formData));
  };

  return (
    <>
      <Outline>
        <div className="box">
          <Wrap textAlign="center">
            <img src="/images/artily.png" alt="logo" />
            <Text body1 color="#999" margin="20px 0 30px 0">
              내 프로필을 완성해주세요!
            </Text>
            <Wrapprofile>
              <Flex jc="center">
                <Image
                  alt="profile"
                  width="120px"
                  height="120px"
                  br="60px"
                  shadow="1px 1px 3px #888"
                  src={
                    getProfile &&
                    getProfile.profileImage &&
                    getProfile.profileImage
                  }
                />
              </Flex>
            </Wrapprofile>
            <Wrap padding="20px 20px">
              <Flex padding="10px 0">
                <Flex width="100%">
                  <Flex width="30%">
                    <Text>닉네임</Text>
                  </Flex>
                  <Flex width="70%">
                    <Input square br="6px" fg="1" value={nickname} readOnly />
                  </Flex>
                </Flex>
              </Flex>
              <Flex padding="5px 0 5px 0">
                <Flex width="100%">
                  <Flex width="30%">
                    <Text>웹사이트</Text>
                  </Flex>
                  <Flex width="70%">
                    <Input
                      fg="1"
                      square
                      br="6px"
                      type="text"
                      placeholder="instargram ID"
                      value={website1 || ""}
                      icon={
                        <Flex
                          onClick={() => {
                            setVisible1(!visible1);
                          }}
                        >
                          <AddBox />
                        </Flex>
                      }
                      onChange={(e) => setWebsite1(e.target.value)}
                    />
                  </Flex>
                </Flex>
              </Flex>

              {visible1 && (
                <Flex padding="5px 0 5px 0">
                  <Flex width="100%">
                    <Flex width="30%">
                      <Text></Text>
                    </Flex>
                    <Flex width="70%">
                      <Input
                        square
                        fg="1"
                        br="6px"
                        type="text"
                        placeholder="Behance 주소"
                        value={website2 || ""}
                        icon={
                          <Flex
                            onClick={() => {
                              setVisible2(!visible2);
                            }}
                          >
                            <AddBox />
                          </Flex>
                        }
                        onChange={(e) => setWebsite2(e.target.value)}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              )}
              {visible2 && (
                <Flex padding="5px 0 10px 0">
                  <Flex width="100%">
                    <Flex width="30%">
                      <Text></Text>
                    </Flex>
                    <Flex width="70%">
                      <Input
                        square
                        br="6px"
                        fg="1"
                        type="text"
                        placeholder="other website"
                        value={website3 || ""}
                        onChange={(e) => setWebsite3(e.target.value)}
                      />
                    </Flex>
                  </Flex>
                </Flex>
              )}
              <Flex padding="10px 0">
                <Flex width="100%">
                  <Flex width="30%">
                    <Text>소개</Text>
                  </Flex>
                  <Flex width="70%">
                    <Textarea
                      width="100%"
                      fg="1"
                      value={introduce || ""}
                      onChange={(e) => setIntroduce(e.target.value)}
                      maxLength="50"
                      br="6px"
                    />
                  </Flex>
                </Flex>
              </Flex>
            </Wrap>
            <Button
              width="90%"
              type="submit"
              margin="0 20px 20px 20px"
              onClick={() => {
                editUser();
              }}
            >
              프로필 저장하기
            </Button>
            <Flex
              jc="center"
              onClick={() => {
                console.log("스킵");
                history.push("/");
              }}
            >
              <Text body3 textDeco="underline">
                다음에 할래요
              </Text>
            </Flex>
          </Wrap>
        </div>
      </Outline>
    </>
  );
};

const Wrapprofile = styled.div`
  position: relative;
  margin: auto;
  width: 120px;
`;
const Outline = styled.div`
  height: 100vh;
  position: relative;
  .box {
    /* background-color: #ddd; */
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* translate(x축,y축) */
    //요소의 가장 좌측과 상단을 기준으로 50%를 이동하는 것이므로, 요소 자체를 마이너스 값을 통해 다시 절반을 좌측, 상단으로 당겨오는 것.
    //translate 값을 적용하기 전에는 왼쪽 위 꼭짓점이 정 중앙에 배치된 상태.
  }
`;

export default DetailProfile;
