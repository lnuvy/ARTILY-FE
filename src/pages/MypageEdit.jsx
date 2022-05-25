//마이페이지에서 수정하기를 눌렀을때 나오는 페이지 입니다
//SetProfile 페이지와 다름
//이미 설정 되어있는 프로필 정보를 불러와야 함
import React, { useRef, useState } from "react";
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
import { setProfileImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Front, Back } from "../shared/NicknameDummy.js";
import { editProfileDB } from "../redux/modules/user";
import { ArrowBack, Refresh } from "../assets/icons";
import { nicknameCheck } from "../shared/regCheck/RegCheck";
const randomnickFront = Front;
const randomnickBack = Back;

const MypageEdit = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const fileInput = useRef();

  const getProfile = useSelector((state) => state.user.user);
  const preview = useSelector((state) => state.image.preview);

  const [nickname, setNickname] = useState(
    getProfile?.nickname ? getProfile.nickname : ""
  );
  const [website1, setWebsite1] = useState(getProfile?.snsUrl[0] || "");
  const [website2, setWebsite2] = useState(getProfile?.snsUrl[1] || "");
  const [website3, setWebsite3] = useState(getProfile?.snsUrl[2] || "");
  const [introduce, setIntroduce] = useState(getProfile?.introduce);

  const renameRandom = () => {
    const addNick =
      randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
      " " +
      randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

    setNickname(addNick);
  };

  const selectFile = (e) => {
    const reader = new FileReader();
    console.log(reader);
    const file = fileInput.current.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(setProfileImage(reader.result));
    };
  };
  const editUser = () => {
    const isValid = nicknameCheck(nickname);
    if (!isValid) return;

    const file = fileInput.current.files[0];
    console.log(file);

    //새로운 객체 생성
    const formData = new FormData();

    formData.append("profileImage", file);
    formData.append("nickname", nickname);
    formData.append("snsUrl", [website1]);
    formData.append("snsUrl", [website2]);
    formData.append("snsUrl", [website3]);
    formData.append("introduce", introduce);

    console.log("formData", formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(editProfileDB(formData));
  };

  return (
    <>
      <Flex padding="13px 0 0 5px">
        {/* 뒤로가기 버튼이랑 같은 라인에 있어야 함 */}
        <Icon margin="8px" onClick={() => history.goBack()}>
          <ArrowBack />
        </Icon>
        <Text h2 bold margin="13px 0">
          프로필 수정하기
        </Text>
      </Flex>
      <Outline>
        <div className="box">
          <Wrapprofile>
            <Flex jc="center">
              <Image
                alt="profile"
                width="120px"
                height="120px"
                br="60px"
                src={
                  preview
                    ? preview
                    : getProfile.profileImage
                    ? getProfile.profileImage
                    : ""
                }
              />

              <ImgBox>
                <label htmlFor="image">
                  <img src="../../images/edit.png" alt="파일 선택" />
                </label>
                <input
                  type="file"
                  id="image"
                  ref={fileInput}
                  onChange={selectFile}
                />
              </ImgBox>
            </Flex>
          </Wrapprofile>
          <Wrap margin="0 20px">
            <Flex padding="10px 0">
              <Flex width="100%">
                <Flex width="30%">
                  <Text textAlign="left" fg="1">
                    닉네임
                  </Text>
                </Flex>
                <Flex width="70%">
                  <Input
                    icon={<Refresh onClick={renameRandom} />}
                    square
                    placeholder={getProfile?.nickname || "닉네임 자리"}
                    border="1px solid #d3d3d3"
                    br="6px"
                    fg="1"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex padding="10px 0 5px">
              <Flex width="100%">
                <Flex width="30%">
                  <Text textAlign="left" fg="1">
                    웹사이트
                  </Text>
                </Flex>
                <Flex width="70%">
                  <Input
                    square
                    icon={
                      <Flex>
                        <img src="/images/Instagram.svg" alt="인스타" />
                      </Flex>
                    }
                    fg="1"
                    br="6px"
                    type="text"
                    placeholder="instargram ID"
                    value={website1 || ""}
                    onChange={(e) => setWebsite1(e.target.value)}
                  />
                </Flex>
              </Flex>
            </Flex>
            {/* 웹사이트 주소 입력시 자기소개 입력창 나오게 */}
            <Flex width="100%">
              <Flex width="30%">
                <Text></Text>
              </Flex>
              <Flex width="70%">
                <Input
                  square
                  fg="1"
                  br="6px"
                  icon={
                    <Flex>
                      <img src="/images/Behance.svg" alt="비핸스" />
                    </Flex>
                  }
                  type="text"
                  placeholder="Behance 주소"
                  value={website2}
                  onChange={(e) => setWebsite2(e.target.value)}
                />
              </Flex>
            </Flex>
            <Flex padding="5px 0 10px">
              <Flex width="100%">
                <Flex width="30%">
                  <Text></Text>
                </Flex>
                <Flex width="70%">
                  <Input
                    fg="1"
                    square
                    br="6px"
                    icon={
                      <Flex>
                        <img src="/images/web.svg" alt="포트폴리오" />
                      </Flex>
                    }
                    type="text"
                    placeholder="other website"
                    value={website3 || ""}
                    onChange={(e) => setWebsite3(e.target.value)}
                  />
                </Flex>
              </Flex>
            </Flex>
            <Flex padding="20px 0 10px 0" width="100%">
              <Flex width="30%">
                <Text textAlign="left" fg="1">
                  소개
                </Text>
              </Flex>
              <Flex width="70%">
                <Textarea
                  fg="1"
                  value={introduce}
                  onChange={(e) => setIntroduce(e.target.value)}
                  maxLength="100"
                  br="6px"
                />
              </Flex>
            </Flex>
          </Wrap>
          <Flex width="90%" margin="15px auto">
            <Button
              width="100%"
              onClick={() => {
                window.alert("프로필이 저장되었습니다!");
                editUser();
              }}
            >
              수정 완료
            </Button>
          </Flex>
        </div>
      </Outline>
    </>
  );
};

const Wrapprofile = styled.div`
  position: relative;
  margin: 20px auto;
  width: 120px;
`;

const ImgBox = styled.div`
  label {
    position: absolute;
    bottom: 0;
    right: -0.5em;
    display: inline-block;
    padding: 0.5em 0.5em;
    line-height: normal;
    vertical-align: middle;
    background-color: ${({ theme }) => `${theme.color.brandColor}`};
    width: 35px;
    height: 35px;
    cursor: pointer;
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
  .image {
  }
`;
const Outline = styled.div`
  height: 85vh;
  position: relative;
  .box {
    /* background-color: #ddd; */
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* translate(x축,y축) */
    //요소의 가장 좌측과 상단을 기준으로 50%를 이동하는 것이므로, 요소자체를 마이너스 값을 통해 다시 절반을 좌측, 상단으로 당겨오는 것.
    //transform 값을 적용하기 전에는 왼쪽 위 꼭짓점이 정 중앙에 배치된 상태.
  }
`;
export default MypageEdit;
