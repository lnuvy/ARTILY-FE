import React, { useEffect, useState, forwardRef, useRef } from "react";
import {
  Flex,
  Grid,
  Input,
  Text,
  Wrap,
  Button,
  InputRef,
  Icon,
} from "../../../elements";
import {
  Map,
  ZoomControl,
  MapTypeControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import { AiOutlineSearch } from "react-icons/ai";
import { MdGpsFixed } from "react-icons/md";

import { changeMarker, currentmap } from "../../api/KakaoGeolocation";

const { kakao } = window;
const ps = new kakao.maps.services.Places();

const MapModal = () => {
  const [map, setMap] = useState();
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState(null);
  const [position, setPosition] = useState({
    lat: 37.5669412,
    lng: 126.978403,
  });
  const inputRef = useRef(null);

  useEffect(() => {
    fetchData();
    async function fetchData() {
      changeMarker(position, setAddress);
    }
  }, [position]);

  useEffect(() => {
    if (!query) return;
    ps.keywordSearch(query, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        if (data[0]) {
          setPosition({
            lat: data[0].y,
            lng: data[0].x,
          });
          bounds.extend(new kakao.maps.LatLng(data[0].y, data[0].x));
        }
        map.setBounds(bounds);
        map.setLevel(6);
      }
    });
  }, [query]);

  const inputSearch = () => {
    const { value } = inputRef.current;
    console.log(value, /\S/.test(value));
    if (/\S/.test(value)) setQuery(value);
  };

  const nowPosition = () => {
    currentmap(setAddress, setPosition);

    let bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(position.lat, position.lng));
    map.setBounds(bounds);
    map.setLevel(6);
  };

  return (
    <Wrap height="100%">
      <InputRef
        margin="0"
        br="8px"
        ref={inputRef}
        icon={<AiOutlineSearch onClick={inputSearch} size={28} />}
        placeholder="키워드로 내동네 찾기"
        onKeyPress={inputSearch}
      />

      <Grid height="auto">
        <Flex margin="10px 10px" onClick={nowPosition}>
          <MdGpsFixed size={24} />
          <Text>현재 위치로 이동</Text>
        </Flex>
      </Grid>
      <Flex width="317px" height="249px" bc="tomato" margin="0 auto">
        <Map // 지도를 표시할 Container
          center={position}
          isPanto={true}
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
          onCreate={setMap}
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
