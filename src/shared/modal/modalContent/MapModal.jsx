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
import { NavigationNext } from "../../../assets/icons";

import { changeMarker, currentmap } from "../../geolocation/KakaoGeolocation";
import { useDispatch, useSelector } from "react-redux";
import {
  openDragModal,
  openModal,
  closeModal,
} from "../../../redux/modules/modal";
import { MyLocation } from "../../../assets/icons";
import styled from "styled-components";
import theme from "../../../styles/theme";

const { kakao } = window;

const MapModal = ({ setReceiveAddress, currentAddress }) => {
  const dispatch = useDispatch();

  const modalOn = (reg) => {
    dispatch(
      openModal({
        title: "위치 선택",
        content: <></>,
      })
    );
  };

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

  console.log(currentAddress?.split(" "));

  const submitAddress = () => {
    if (
      address.city === "" ||
      address.city === undefined ||
      address.gu === undefined ||
      address.dong === undefined
    ) {
      alert("모든 항목을 입력하세요.");
      return;
    }
    const guArray = address.gu.split("");
    const dongArray = address.dong.split("");

    // console.log(guArray[guArray.length - 1]);
    // console.log(dongArray[dongArray.length - 1]);

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
    // console.log(id);

    if (e.target.value === "지역을 선택하세요") {
      setAddress({ ...address, city: undefined });
      return;
    }
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
      <SelectboxWrap>
        <Selectbox id="city" onChange={addressValue}>
          <Option value="">지역을 선택하세요</Option>
          {cityList.map((v, i) => {
            return (
              <>
                <Option value={v}>{v}</Option>
              </>
            );
          })}
        </Selectbox>
      </SelectboxWrap>
      <Wrap margin="12px 0 0 0" />
      <Input
        id="gu"
        placeholder="구를 입력하세요. ex) 중구"
        onChange={addressValue}
        value={gu}
      />
      <Wrap margin="12px 0 0 0" />
      <Input
        id="dong"
        placeholder="동을 입력하세요. ex) 태평동"
        onChange={addressValue}
        value={dong}
      />
      <Button width="100%" onClick={submitAddress} margin="24px 0 16px">
        이 위치로 설정
      </Button>
    </Wrap>
  );
};

const SelectboxWrap = styled.div`
  background-color: white;
  width: 100%;
  font-size: 14px;
  color: ${theme.pallete.black};
  padding: 8px 4px;
  border: 1px solid ${theme.pallete.gray1};
  border-radius: 4px;
`;

const Selectbox = styled.select`
  background-color: white;
  width: 100%;
  font-size: 14px;
  color: ${theme.pallete.black};

  :focus {
    outline: none;
  }
`;

const Option = styled.option``;

export default MapModal;
