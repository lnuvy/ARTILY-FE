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
  const [inputs, setinputs] = useState({});
  const images = useSelector((state) => state.image.imageArr);

  const InputChange = (e) => {
    const { id, value } = e.target;
    setinputs({ ...inputs, [id]: value });
    console.log(inputs);
  };

  const reviewSubmit = () => {
    setinputs({ ...inputs, imgs: [...images] });
    console.log(inputs);
  };

  // componentwillunmount 역할
  useEffect(() => {
    // 이미지 리덕스 데이터 초기화

    return () => {
      dispatch(clearPreview());
    };
  }, []);

  const [image, setImage] = useState(null);

  return (
    <Wrap margin="16px">
      <Preview />

      <Input
        id="postTitle"
        placeholder="제목을 입력해주세요."
        // value={inputs?.postTitle}
        onChange={InputChange}
      />
      <Textarea
        id="postContent"
        // value={inputs.postContent}
        placeholder="작품에 대한 후기를 작성해주세요. 허위로 작성된 글은 게시가 제한될 수 있습니다."
        onChange={InputChange}
        textLine={100}
      />
      <Button text position="absolute" top="0" right="0" onClick={reviewSubmit}>
        완료
      </Button>
    </Wrap>
  );
};

export default StoreWrite;
