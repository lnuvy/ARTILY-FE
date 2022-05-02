import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Flex, Input, Text, Button } from "../elements";
import { history } from "../redux/configureStore";
import { actionCreators as userActions } from "../redux/modules/user";
import { useDispatch, useSelector } from "react-redux";
const Setprofile = () => {
  const dispatch = useDispatch();
  const [nickname, setNickname] = useState("");
  const clearNick = () => {
    setNickname("");
  };
  const randomUser = useSelector((state) => state.user);
  console.log(randomUser);
  const randomNickClick = () => {
    dispatch(userActions.RandomNickDB());
    setNickname(randomUser);
  };
  // const write = () => {
  //   console.log("닉네임 : " + name);
  // dispatch(articleActions.SearchDataDB(keyword));
  // };
  // const random = (e) => {
  //   setName(e.target.value);

  // console.log("닉네임 : ", e.target.value);
  // };

  return (
    <React.Fragment>
      <h3>내 프로필을 만들어주세요!</h3>
      <Wrapprofile>
        <Flex jc="center">
          <ProfileImg alt="profile" src="../images/emptyimage.jpg"></ProfileImg>

          <ImgBox>
            <label htmlFor="image">🖍</label>
            <input type="file" id="image" />
          </ImgBox>
        </Flex>
      </Wrapprofile>
      <Flex margin="0 20px 0 20px">
        <Text margin="0 10px 0 0" bold>
          {" "}
          닉네임
        </Text>
        <input
          value={nickname}
          style={{
            border: "solid 2px #888888",
            borderRadius: "5px",
            width: "15%",
            minWidth: "180px",
            height: "50px",
          }}
          maxLength={18}
          placeholder="닉네임"
          onChange={(e) => {
            setNickname(e.target.value);
          }}
          onClick={clearNick}
        />
        <div>
          <Button onClick={randomNickClick} />
        </div>
        {/* <div>
          <Text>
            {determiners[Math.floor(Math.random() * determiners.length)] +
              " " +
              animals[Math.floor(Math.random() * animals.length)]}
          </Text>
        </div> */}
      </Flex>
      {/* <div>
        <label>웹사이트</label>
        <input type="text"></input>
      </div>
      <div>
        <label>소개</label>
        <input type="text"></input>
      </div> */}
      <button>다음</button>
      <p
        onClick={() => {
          history.push("/");
        }}
      >
        나중에 할래요
      </p>
    </React.Fragment>
  );
};

const Wrapprofile = styled.div`
  position: relative;
  margin: auto;
  width: 200px;
`;
const ProfileImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
`;
const ImgBox = styled.div`
  label {
    position: absolute;
    bottom: 0;
    right: 0;
    display: inline-block;
    padding: 0.5em 0.75em;
    color: #666;
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border: 2px solid #666;
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
// const Changebtn = styled.button`
//   position: absolute;
//   right: 0;
//   width: 30px;
//   height: 30px;
//   background-color: #444;
// `;
export default Setprofile;
