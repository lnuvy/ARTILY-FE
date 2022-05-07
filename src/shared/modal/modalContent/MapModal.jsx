/* global kakao */
import React, { useEffect, useState } from "react";
import { Flex, Grid, Text, Wrap } from "../../../elements";
import {
  Map,
  ZoomControl,
  MapTypeControl,
  MapMarker,
} from "react-kakao-maps-sdk";

import { changeMarker } from "../../api/KakaoGeolocation";

const { kakao } = window;

const MapModal = () => {
  const [position, setPosition] = useState({});
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function fetchData() {
      const nowAddress = await changeMarker(position);
      console.log(nowAddress);
      setAddress(nowAddress);
    }

    fetchData();
  }, [position]);

  console.log(address);

  return (
    <Wrap height="100%">
      <Flex width="317px" height="249px" bc="tomato" margin="0 auto">
        <Map // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: 36.2683,
            lng: 127.6358,
          }}
          style={{
            width: "317px",
            height: "249px",
          }}
          level={6} // 지도의 확대 레벨
          onDragEnd={(map) =>
            setPosition({
              // 드래그 이벤트
              lat: map.getCenter().getLat(),
              lng: map.getCenter().getLng(),
            })
          }
        >
          <ZoomControl position={kakao.maps.ControlPosition.TOPRIGHT} />
          <MapTypeControl position={kakao.maps.ControlPosition.TOPRIGHT} />
          <MapMarker position={position} />
        </Map>
        <Text h2>{address}</Text>
      </Flex>
    </Wrap>
  );
};

export default MapModal;
