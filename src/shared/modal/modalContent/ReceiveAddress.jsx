import axios from "axios";
import React, { useState } from "react";
import { Button, Flex, Input, Text } from "../../../elements";

const ReceiveAddress = () => {
  const [address, setAddress] = useState("");

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
          setAddress(
            location.region_1depth_name +
              location.region_2depth_name +
              location.region_3depth_name
          );
        });
    });
  };

  return (
    <>
      <Text h1>내 위치를 설정해주세요!</Text>
      <Flex padding="20px">
        <Input
          fg="1"
          margin="0 10px 0 0px"
          value={address}
          onChange={(e) => {
            // console.log("location");
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
          검색
        </Button>
      </Flex>
      {/* <Button outline margin="auto" onClick={complete}>
        설정 완료
      </Button> */}
    </>
  );
};

export default ReceiveAddress;
