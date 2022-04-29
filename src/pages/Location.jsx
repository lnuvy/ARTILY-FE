//최초 로그인 시 수집할 유저 위치 정보
//어떻게 수집할 것인가
//카카오 맵 api로 현재 위치를 끌고 올 것인지
//드롭박스로 직접 선택하도록 할 것 인지

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getToken } from "../shared/token";
import { actionCreators as userActions } from "../redux/modules/user";

import axios from "axios";

const Location = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const [dong, setDong] = React.useState("");
  const [gu, setGu] = React.useState("");
  const [si, setSi] = React.useState("");

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

  const complete = () => {
    dispatch(userActions.locationDB(si, gu, dong));
  };
  return (
    <React.Fragment>
      <div>내 위치를 설정해주세요!</div>
      <div>
        <input
          value={`${si} ${gu} ${dong}` || ""}
          placeholder="아래 버튼을 눌러 동네를 설정해 주세요."
          onChange={(e) => {
            console.log("location");
            // setGu(e.target.value);
            // setDong(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            currentmap();
          }}
        >
          현재 위치
        </button>
      </div>
      <button onClick={complete}>설정 완료</button>
    </React.Fragment>
  );
};

export default Location;
