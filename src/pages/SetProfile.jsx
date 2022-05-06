import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Textarea, Button, Image, Wrap } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { accrueImage } from "../redux/modules/image";
import { useDispatch, useSelector } from "react-redux";
import ToastMessage from "../shared/ToastMessage";
import { Front, Back } from "../shared/NicknameDummy.js";

const Setprofile = () => {
  const dispatch = useDispatch();

  const fileInput = React.useRef();

  const preview = useSelector((state) => state.image.represent);
  //랜덤 닉네임 생성
  const randomnickFront = Front;
  const randomnickBack = Back;

  const randomNick =
    randomnickFront[Math.floor(Math.random() * randomnickFront.length)] +
    " " +
    randomnickBack[Math.floor(Math.random() * randomnickBack.length)];

  //닉네임만 필수입력이므로 닉네임을 입력하고 나서 부터는 프로필 저장버튼이 활성화 됨
  //마지막 input인 자기소개가 비어있을경우 프로필 저장버튼 비활성화
  const [nickname, setNickname] = useState("");
  // const [website, setWebsite] = useState("");
  // const [introduce, setIntroduce] = useState("");

  // const handleTextChange = (event) => {
  //   setWebsite(event.target.value);
  // };

  const selectFile = (e) => {
    const reader = new FileReader();
    console.log(reader);
    const file = fileInput.current.files[0];
    console.log(file);
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      dispatch(accrueImage(reader.result));
    };
  };
  const editUser = () => {
    const file = fileInput.current.files[0];
    console.log(file);

    //새로운 객체 생성
    const formData = new FormData();

    //formData.append(name(키),value(값))
    //값은 문자열로 자동 변환됨. 배열을 넣어도 콤마로 구분한 문자열이 됨. 객체는 넣으면 무시됨

    formData.append("profileImage", file);
    formData.append("nickName", nickname);
    // formData.append("website", website);
    // formData.append("introduce", introduce);

    console.log("formData", formData);

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    dispatch(userActions.setProfileDB(formData));
  };

  // useEffect(() => {
  //   // setNickname(getProfile?.nickname);
  // }, [getProfile]);
  return (
    <>
      <Flex jc="center" margin="2em 0 0 0">
        <h2>ARTILY</h2>
      </Flex>
      <Flex jc="center" margin="0 0 2em 0">
        <p>내 프로필을 만들어주세요!</p>
      </Flex>
      <Wrapprofile>
        <Flex jc="center">
          <Image
            alt="profile"
            width="120px"
            height="120px"
            br="60px"
            //새로고침하면 기본 프로필사진이 날라감ㅎ
            src={preview ? preview : ""}
          ></Image>

          <ImgBox>
            <label htmlFor="image">🖍</label>
            <input
              type="file"
              id="image"
              ref={fileInput}
              onChange={selectFile}
            />
          </ImgBox>
        </Flex>
      </Wrapprofile>
      <Wrap padding="0 10px;">
        <Flex>
          <Text fg="1">닉네임</Text>
          {/* 일단 기본적으로는 소셜로그인 시 가져오는 기본 닉네임으로 설정 */}
          <Input
            type="text"
            fg="0"
            value={randomNick || ""}
            onChange={(e) => setNickname(randomNick)}
          />

          <div>
            {/* 버튼을 클릭하면 input안에 값이 다른 랜덤 닉네임이 나오게 해야함 */}
            <Button onClick={setNickname} />
          </div>
        </Flex>
      </Wrap>
      <Button
        width="90%"
        type="submit"
        outline
        margin="20px auto"
        onClick={() => {
          window.alert("프로필이 저장되었습니다!");
          editUser();
          window.confirm("더 자세한 프로필을 작성하시겠어요?");
          history.push("/profile/detail");
        }}
      >
        프로필 저장하기
      </Button>
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
    font-size: inherit;
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
export default Setprofile;
