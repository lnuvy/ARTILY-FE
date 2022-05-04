//최초 로그인 시 수집할 유저 위치 정보
//어떻게 수집할 것인가
//카카오 맵 api로 현재 위치를 끌고 올 것인지
//드롭박스로 직접 선택하도록 할 것 인지

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { history } from "../redux/configureStore";
import { getToken } from "../shared/token";
import { actionCreators as userActions } from "../redux/modules/user";

import axios from "axios";

import { Text, Button, Input, Flex, Grid } from "../elements";
const Location = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const [dong, setDong] = useState("");
  const [gu, setGu] = useState("");
  const [si, setSi] = useState("");

  const currentmap = async () => {
    //현재 내 위치 찾기(좌표)
    navigator.geolocation.getCurrentPosition(function (pos) {
      // console.log(pos);
      var lat = pos.coords.latitude;
      var lon = pos.coords.longitude;
      axios
        .get(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
          {
            headers: {
              Authorization: "KakaoAK 8ef6077e99cfc3ea15c25ab21d4c372e",
            },
          }
        )
        .then((res) => {
          const location = res.data.documents[0].address;
          console.log(location);
          setSi(location.region_1depth_name); //시
          setGu(location.region_2depth_name); //구
          setDong(location.region_3depth_name); //동
          //=> useState('') setState로 값 지정해주자! //라이브러리같은 걸 이용할때는 리덕스사용하지 말자!!!!
        });
    });
  };
  //input 안에 값이 없으면 다음페이지로 못넘어가

  const complete = () => {
    dispatch(userActions.locationDB(si, gu, dong));
    // if ((setSi, setGu, setDong)) {
    //   history.push("/profile");
    // } else {
    //   window.alert("주소를 입력해주세요!");
    //   return;
    // }
    history.push("/profile");
  };
  return (
    <>
      <Grid cg rg>
        <Flex jc="center">
          <h2>ARTILY</h2>
        </Flex>
        <Flex jc="center">
          <Text h3>내 위치를 설정해주세요!</Text>
        </Flex>
        <Flex margin="20px">
          <Input
            fg="1"
            value={`${si} ${gu} ${dong}` || ""}
            onChange={(e) => {
              console.log("location");
              // setGu(e.target.value);
              // setDong(e.target.value);
            }}
          ></Input>
          <Button
            margin="20px 0 0 0"
            onClick={() => {
              currentmap();
            }}
          >
            O
          </Button>
        </Flex>
        <Button outline margin="auto" onClick={complete}>
          설정 완료
        </Button>
      </Grid>
    </>
  );
};

export default Location;
