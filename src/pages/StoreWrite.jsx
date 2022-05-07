import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Preview } from "../components";
import ImagePreview from "../components/ImagePreview";
import {
  Button,
  Checkbox,
  Flex,
  Grid,
  Image,
  Input,
  Text,
  Textarea,
  ToggleButton,
  Wrap,
} from "../elements";
import { clearPreview } from "../redux/modules/image";
import { openModal } from "../redux/modules/modal";
import MapModal from "../shared/modal/modalContent/MapModal";

import { IoIosArrowForward } from "react-icons/io";
import { history } from "../redux/configureStore";

/*
 * @한울
 * 리뷰와 공통으로 쓸수있는 컴포넌트: Preview.jsx ImagePreview.jsx
 */

const StoreWrite = () => {
  const dispatch = useDispatch();
  // 인풋 한번에 받기 (체크박스는 e.target.id 가 아니라 e.target.checked 로 받아야해서 인라인에 적용함)
  const [inputs, setInputs] = useState({ delivery: false, direct: false });
  const { represent, preview } = useSelector((state) => state.image);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  };

  const [receiveAddress, setReceiveAddress] = useState(null);

  // componentwillunmount 역할
  useEffect(() => {
    // 이미지 리덕스 데이터 초기화
    return () => {
      dispatch(clearPreview());
    };
  }, []);

  const modalOn = () => {
    dispatch(
      openModal({
        title: "위치 선택",
        content: (
          <>
            <MapModal setReceiveAddress={setReceiveAddress} />
          </>
        ),
      })
    );
  };

  return (
    <>
      <Wrap margin="16px">
        <Flex jc="space-between" margin="10px 0 10px">
          <Preview />
        </Flex>
        <ToggleButton
          onClick={() => setInputs({ ...inputs, delivery: !inputs.delivery })}
          id="delivery"
          select={inputs?.delivery}
        >
          택배
        </ToggleButton>
        <ToggleButton
          onClick={() => setInputs({ ...inputs, direct: !inputs.direct })}
          id="direct"
          select={inputs?.direct}
        >
          직거래
        </ToggleButton>
        {inputs.direct && (
          <Input
            readOnly
            value={receiveAddress ? receiveAddress : "위치 선택"}
            icon={<IoIosArrowForward size={24} />}
            onClick={modalOn}
          />
        )}
        <Input
          readOnly
          value="카테고리 선택"
          icon={<IoIosArrowForward size={24} />}
          onClick={() => {
            history.push(`/category/select`);
          }}
        />
        <Input
          id="postTitle"
          placeholder="작품명을 입력해 주세요."
          margin="0 0 20px"
          value={inputs?.postTitle}
          onChange={handleChange}
        />
        <Textarea
          id="postContent"
          label="설명"
          value={inputs.postContent}
          maxLength="100"
          onChane={handleChange}
        />
        <Input
          id="price"
          label="가격"
          placeholder="가격"
          margin="0 0 20px"
          value={inputs?.price}
          onChange={handleChange}
        />
      </Wrap>
    </>
  );
};

export default StoreWrite;
