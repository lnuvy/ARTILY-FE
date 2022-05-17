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
      <Wrap textAlign="center">
        <img src="/images/artily.svg" alt="logo" />
        <Text body1 color="#999">
          내 프로필을 완성해주세요!
        </Text>
      </Wrap>
      <Wrapprofile>
        <Flex jc="center">
          <Image
            alt="profile"
            width="120px"
            height="120px"
            br="60px"
            border="1px solid #eee"
            shadow="1px 1px 3px #ddd"
            src={
              getProfile && getProfile.profileImage && getProfile.profileImage
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
        <Flex padding="10px 0 5px">
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
          <Flex padding="10px 0 10px">
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
          <Flex padding="5px 0 10px">
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
        margin="20px"
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
    </>
  );
};

const Wrapprofile = styled.div`
  position: relative;
  margin: auto;
  width: 120px;
`;

const ImgBox = styled.div`
  label {
    position: absolute;
    bottom: 0;
    right: -1em;
    display: inline-block;
    padding: 0.5em 0.75em;
    color: #666;
    line-height: normal;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border: 1px solid #666;
    border-radius: 50%;
  }
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export default DetailProfile;
