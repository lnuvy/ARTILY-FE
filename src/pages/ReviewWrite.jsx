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
  Wrap,
} from "../elements";
import { clearPreview } from "../redux/modules/image";
import { openModal } from "../redux/modules/modal";
import ReceiveAddress from "../shared/modal/modalContent/ReceiveAddress";

/*
 * @한울
 * 리뷰와 공통으로 쓸수있는 컴포넌트: Preview.jsx ImagePreview.jsx
 */

const StoreWrite = () => {
  const dispatch = useDispatch();
  // 인풋 한번에 받기 (체크박스는 e.target.id 가 아니라 e.target.checked 로 받아야해서 인라인에 적용함)
  const [inputs, setInputs] = useState({});
  const { represent, preview } = useSelector((state) => state.image);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  };

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
        title: "주소입력",
        // text 를 content 로 변경, 태그 직접 넣으면 됩니다
        content: (
          <>
            <ReceiveAddress />
          </>
        ),
      })
    );
  };

  return (
    <Grid>
      <Wrap margin="16px">
        <Wrap margin="20px 10px 10px">
          <Flex margin="0 0 10px">
            <Preview />
            <ImagePreview />
          </Flex>
        </Wrap>
        <Input
          id="postTitle"
          label="제목"
          placeholder="상품의 제목을 입력하세요..."
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
      </Wrap>
    </Grid>
  );
};

export default StoreWrite;
