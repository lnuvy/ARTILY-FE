import React, { useEffect, useState } from "react";
import { Flex, Grid, Input, Text, Wrap } from "../../../elements";
import {
  Map,
  ZoomControl,
  MapTypeControl,
  MapMarker,
} from "react-kakao-maps-sdk";

import { changeMarker } from "../../api/KakaoGeolocation";

const { kakao } = window;

const MapModal = () => {
  const [position, setPosition] = useState({
    lat: 37.5669412,
    lng: 126.978403,
  });
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchData();
    async function fetchData() {
      changeMarker(position, setAddress);
    }
  }, [position]);

  // const ps = new kakao.maps.services.Places()

  //   ps.keywordSearch("이태원 맛집", (data, status, _pagination) => {
  //     if (status === kakao.maps.services.Status.OK) {
  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
  //       // LatLngBounds 객체에 좌표를 추가합니다
  //       const bounds = new kakao.maps.LatLngBounds()
  //       let markers = []

  //       for (var i = 0; i < data.length; i++) {
  //         // @ts-ignore
  //         markers.push({
  //           position: {
  //             lat: data[i].y,
  //             lng: data[i].x,
  //           },
  //           content: data[i].place_name,
  //         })
  //         // @ts-ignore
  //         bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x))
  //       }
  //       setMarkers(markers)

  //       // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
  //       map.setBounds(bounds)
  //     }
  //   })
  // }, [map])

  return (
    <Wrap height="100%">
      <Input margin="0" square br="8px" />
      <Text>현재 위치로 이동</Text>
      <Flex width="317px" height="249px" bc="tomato" margin="0 auto">
        <Map // 지도를 표시할 Container
          id="map"
          center={{
            // 지도의 중심좌표
            lat: 37.5669412,
            lng: 126.978403,
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
      </Flex>
      <Text h2>{address}</Text>
    </Wrap>
  );
};

export default MapModal;
