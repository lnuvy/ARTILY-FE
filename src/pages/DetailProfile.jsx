//소셜 로그인후 기본 프로필(사진, 닉네임) 설정=> 나머지 프로필 정보 설정하는 페이지

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Flex,
  Input,
  Text,
  Textarea,
  Button,
  Image,
  Wrap,
  Icon,
} from "../elements";
import { history } from "../redux/configureStore";
import { getUserInfo, setProfileDB } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
import { AddBox } from "../assets/icons";
import { LogoBig } from "../assets/images/index";
import theme from "../styles/theme";

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

    // console.log("formData", formData);

    for (var pair of formData.entries()) {
      // console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(setProfileDB(formData));
  };
  const [count, setCount] = useState(2);

  const addressCount = () => {
    setCount(3);
  };
  const introduceCount = () => {
    setCount(4);
  };

  return (
    <>
      <BaseProgress />
      <ProgressBar width={(count / 4) * 100 + "%"} />
      <Outline>
        <div className="box">
          <Wrap margin="120px 0 0 0" textAlign="center">
            <LogoBig />
            <Text body1 color={theme.pallete.gray2} margin="10px 0 0 0">
              내 프로필을 완성해주세요!
            </Text>
            <Wrapprofile>
              <Flex jc="center" margin="40px 0">
                <Image
                  alt="profile"
                  width="120px"
                  height="120px"
                  br="60px"
                  src={
                    getProfile &&
                    getProfile.profileImage &&
                    getProfile.profileImage
                  }
                />
              </Flex>
            </Wrapprofile>
            <Wrap padding="0 20px">
              <Flex>
                <Text textAlign="left" width="80px">
                  닉네임
                </Text>
                <Input
                  square
                  value={nickname}
                  padding="8px"
                  br="6px"
                  border={`1px solid ${theme.pallete.gray1}`}
                  readOnly
                  fg="1"
                />
              </Flex>

              <Flex padding="5px 0 5px 0">
                <Flex width="100%">
                  <Text textAlign="left" width="80px">
                    웹사이트
                  </Text>
                  <Wrap
                    fg="1"
                    onClick={() => {
                      addressCount();
                    }}
                  >
                    <Input
                      square
                      iconRight="4px"
                      padding="8px"
                      br="6px"
                      border={`1px solid ${theme.pallete.gray1}`}
                      type="text"
                      placeholder="instargram ID"
                      value={website1 || ""}
                      icon={
                        <Flex
                          onClick={() => {
                            setVisible1(!visible1);
                          }}
                        >
                          <AddBox color={theme.color.brandColor} />
                        </Flex>
                      }
                      onChange={(e) => setWebsite1(e.target.value)}
                    />
                  </Wrap>
                </Flex>
              </Flex>

              {visible1 && (
                <Flex padding="5px 0 5px 0">
                  <Flex width="100%">
                    <Text textAlign="left" width="80px"></Text>

                    <Wrap fg="1">
                      <Input
                        square
                        fg="1"
                        br="6px"
                        type="text"
                        iconRight="4px"
                        padding="8px"
                        border={`1px solid ${theme.pallete.gray1}`}
                        placeholder="Behance 주소"
                        value={website2 || ""}
                        icon={
                          <Flex
                            onClick={() => {
                              setVisible2(!visible2);
                            }}
                          >
                            <AddBox color={theme.color.brandColor} />
                          </Flex>
                        }
                        onChange={(e) => setWebsite2(e.target.value)}
                      />
                    </Wrap>
                  </Flex>
                </Flex>
              )}
              {visible2 && (
                <Flex padding="5px 0 10px 0">
                  <Flex width="100%">
                    <Text textAlign="left" width="80px"></Text>

                    <Wrap fg="1">
                      <Input
                        square
                        br="6px"
                        fg="1"
                        iconRight="4px"
                        padding="8px"
                        border={`1px solid ${theme.pallete.gray1}`}
                        type="text"
                        placeholder="other website"
                        value={website3 || ""}
                        onChange={(e) => setWebsite3(e.target.value)}
                      />
                    </Wrap>
                  </Flex>
                </Flex>
              )}
              <Flex padding="10px 0">
                <Text align-items="start" textAlign="left" width="80px" fg="0">
                  소개
                </Text>

                <Wrap
                  fg="1"
                  onClick={() => {
                    introduceCount();
                  }}
                >
                  <Textarea
                    width="100%"
                    value={introduce || ""}
                    padding="8px"
                    onChange={(e) => setIntroduce(e.target.value)}
                    maxLength="50"
                    border={`1px solid ${theme.pallete.gray1}`}
                    br="6px"
                  />
                </Wrap>
              </Flex>
            </Wrap>
            <BottomWrap>
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
                  // console.log("스킵");
                  history.push("/");
                }}
              >
                <Text body3 textDeco="underline">
                  다음에 할래요
                </Text>
              </Flex>
            </BottomWrap>
          </Wrap>
        </div>
      </Outline>
    </>
  );
};

const BottomWrap = styled.div`
  position: fixed;
  bottom: 16px;
  width: 100%;
  max-width: ${theme.view.maxWidth};
`;
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
    /* position: absolute; */
    /* top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); translate(x축,y축) */
    //요소의 가장 좌측과 상단을 기준으로 50%를 이동하는 것이므로, 요소 자체를 마이너스 값을 통해 다시 절반을 좌측, 상단으로 당겨오는 것.
    //translate 값을 적용하기 전에는 왼쪽 위 꼭짓점이 정 중앙에 배치된 상태.
  }
`;
const ProgressBar = styled.div`
  width: ${(props) => props.width};
  height: 5px;
  background-color: ${({ theme }) => theme.pallete.primary850};
  transition: width 1s;
  position: absolute;
  top: 0px;
  left: 0;
  z-index: 1;
`;
const BaseProgress = styled.div`
  width: 100%;
  height: 5px;
  background-color: ${({ theme }) => theme.pallete.gray1};
  position: absolute;
  top: 0px;
  left: 0;
`;
export default DetailProfile;
