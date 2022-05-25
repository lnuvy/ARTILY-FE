import React, { useEffect, useState, useRef } from "react";
import {
  Flex,
  Grid,
  Text,
  Wrap,
  Button,
  InputRef,
  Input,
} from "../../../elements";
import {
  Map,
  ZoomControl,
  MapTypeControl,
  MapMarker,
} from "react-kakao-maps-sdk";
import { AiOutlineSearch } from "react-icons/ai";

import { changeMarker, currentmap } from "../../geolocation/KakaoGeolocation";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../redux/modules/modal";
import { MyLocation } from "../../../assets/icons";
import styled from "styled-components";

const { kakao } = window;

const MapModal = ({ setReceiveAddress, currentAddress }) => {
  const dispatch = useDispatch();

  const cityList = [
    "서울",
    "경기",
    "인천",
    "경상북도",
    "경상남도",
    "부산",
    "대구",
    "충청북도",
    "충청남도",
    "울산",
    "대전",
    "전라북도",
    "전라남도",
    "광주",
    "세종",
    "강원도",
    "제주",
  ];

  const [gu, setGu] = useState(undefined);
  const [dong, setDong] = useState(undefined);

  const [address, setAddress] = useState({
    city: undefined,
    gu: undefined,
    dong: undefined,
  });

  const submitAddress = () => {
    const guArray = address.gu.split("");
    const dongArray = address.dong.split("");

    console.log(guArray[guArray.length - 1]);
    console.log(dongArray[dongArray.length - 1]);

    if (!(guArray[guArray.length - 1] === "구")) {
      alert("구를 잘못 입력하셨습니다. 00구 형식으로 입력하세요.");
      return;
    }
    if (!(dongArray[dongArray.length - 1] === "동")) {
      alert("동을 잘못 입력하셨습니다. 00동 형식으로 입력하세요.");
      return;
    }

    dispatch(closeModal());
    setReceiveAddress(`${address.city} ${address.gu} ${address.dong}`);
  };

  const addressValue = (e) => {
    const { id, value } = e.target;
    console.log(id);

    if (e.target.id === "city") {
      setAddress({ ...address, city: e.target.value });
      return;
    }
    if (e.target.id === "gu") {
      setGu(e.target.value);
      setAddress({ ...address, gu: e.target.value });
      return;
    }
    if (e.target.id === "dong") {
      setDong(e.target.value);
      setAddress({ ...address, dong: e.target.value });
      return;
    }
  };

  return (
    <Wrap height="100%">
      <Selectbox id="city" onChange={addressValue}>
        <option value="">지역을 선택하세요</option>
        {cityList.map((v, i) => {
          return (
            <>
              <option value={v}>{v}</option>
            </>
          );
        })}
      </Selectbox>
      <Input
        id="gu"
        placeholder="구를 입력하세요"
        onChange={addressValue}
        value={gu}
      />
      <Input
        id="dong"
        placeholder="동을 입력하세요"
        onChange={addressValue}
        value={dong}
      />
      <Button width="100%" onClick={submitAddress} margin="24px 0 16px">
        이 위치로 설정
      </Button>
    </Wrap>
  );
};

const Selectbox = styled.select`
  padding: 16px 12px;
  width: 100%;
`;

export default MapModal;
