import React, { useEffect, useState, useRef } from "react";
import { Flex, Grid, Text, Wrap, Button, InputRef } from "../../../elements";
import {
  Map,
  ZoomControl,
  MapTypeControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import { AiOutlineSearch } from "react-icons/ai";

import { changeMarker, currentmap } from "../../geolocation/KakaoGeolocation";
import { useDispatch } from "react-redux";
import { closeModal } from "../../../redux/modules/modal";
import { MyLocation } from "../../../assets/icons";
import styled from "styled-components";

const { kakao } = window;

const MapModal = ({ setReceiveAddress, currentAddress }) => {
  const dispatch = useDispatch();
  const [map, setMap] = useState();
  const [address, setAddress] = useState(currentAddress || "");
  const [query, setQuery] = useState(null);
  const [position, setPosition] = useState({
    lat: 36.5669412,
    lng: 125.978403,
  });
  const inputRef = useRef(null);
  const ps = new kakao.maps.services.Places();
  var geocoder = new kakao.maps.services.Geocoder();

  // 게시글수정, 주소변경시 이전 좌표로 시작하기
  useEffect(() => {
    if (currentAddress) {
      geocoder.addressSearch(currentAddress, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          setPosition({ lat: result[0].y, lng: result[0].x });
        }
      });
    }
  }, []);

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

  console.log(address);
  const nowPosition = () => {
    currentmap(setAddress, setPosition);

    let bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(position.lat, position.lng));
    map.setBounds(bounds);
    map.setLevel(6);
    inputRef.current.value = "";
  };

  const submitAddress = () => {
    console.log(address);
    setReceiveAddress(address);
    dispatch(closeModal());
  };

  return (
    <Wrap height="100%" padding="0 16px 16px 16px">
      <Text h1 medium textAlign="center" margin="0 0 10px">
        위치 선택
      </Text>
      <InputRef
        margin="0"
        br="8px"
        ref={inputRef}
        icon={<AiOutlineSearch onClick={inputSearch} size={28} />}
        placeholder="OO구 OO동으로 검색하시면 더욱 정확해요"
        onKeyPress={(e) => {
          if (e.key === "Enter") inputSearch();
        }}
      />

      <Grid height="auto">
        <Flex margin="10px 0" onClick={nowPosition}>
          <MyLocation />
          <Text body2 margin="0 0 0 4px">
            현재 위치로 이동
          </Text>
        </Flex>
      </Grid>
      <Text body2 color="gray" margin="0 0 14px">
        지도를 움직여 위치를 조정하세요.
      </Text>
      <Map // 지도를 표시할 Container
        center={position}
        isPanto={true}
        style={{
          width: "100%",
          height: "289px",
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
        <MapMarker
          position={position}
          image={{
            src: "/images/Marker.png",
            size: {
              width: 48,
              height: 48,
            },
          }}
        />
      </Map>
      <Flex padding="8px" height="fit-content" fd="column">
        <Flex jc="space-between" margin="8px">
          <Text h2 bold textAlign="left">
            {address}
          </Text>
          &nbsp; &nbsp;
          <Text body2 margin="0 12px 0 0">
            안심하세요!
          </Text>
        </Flex>
        <Text body2>주소 개인정보는 동의하에 동단위 까지 저장됩니다.</Text>
      </Flex>
      <SubmitDiv>
        <Button width="100%" onClick={submitAddress} margin="0 0 16px">
          이 위치로 설정
        </Button>
      </SubmitDiv>
    </Wrap>
  );
};

const SubmitDiv = styled.div`
  width: calc(100% - 32px);
  position: absolute;
  bottom: 12px;
`;

export default MapModal;
