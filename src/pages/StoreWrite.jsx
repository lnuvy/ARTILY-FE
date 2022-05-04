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
        <Input
          id="price"
          label="가격"
          placeholder="가격"
          margin="0 0 20px"
          value={inputs?.price}
          onChange={handleChange}
        />
        <Checkbox
          id="transaction"
          zoom={1.3}
          margin="0 10px"
          onChange={(e) =>
            setInputs({ ...inputs, transaction: e.target.checked })
          }
        >
          <Text h2>직거래만 할래요</Text>
        </Checkbox>
        <Button onClick={modalOn} />

        <Wrap margin="20px 10px 10px">
          <Flex jc="space-between" margin="0 0 10px">
            <Flex>
              <Text h1>사진 첨부</Text>
              <Text body2 color="gray">
                &nbsp;(최대 10장)
              </Text>
            </Flex>
            <Preview />
          </Flex>

          <ImagePreview />
        </Wrap>
      </Wrap>
    </Grid>
  );
};

export default StoreWrite;
