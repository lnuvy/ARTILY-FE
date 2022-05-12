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
import { getReviewOne } from "../redux/modules/reviews";
import { openModal } from "../redux/modules/modal";
import { postReviewDB, editReviewDB } from "../redux/modules/reviews.jsx";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";
import { inputSpaceReg, priceComma } from "../shared/utils";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

/*
 * @한울
 * 리뷰와 공통으로 쓸수있는 컴포넌트: Preview.jsx ImagePreview.jsx
 */
const MySwal = withReactContent(Swal);

const ReviewWrite = () => {
  const dispatch = useDispatch();
  const { postId, reviewId } = useParams();
  const path = useLocation().pathname;
  const reviewWrite = path === "/review/write";
  const reviewEdit = path === `/review/edit/${reviewId}`;

  // 인풋 한번에 받기 (체크박스는 e.target.id 가 아니라 e.target.checked 로 받아야해서 인라인에 적용함)
  const [inputs, setinputs] = useState({});
  const { represent, imageArr, fileObj } = useSelector((state) => state.image);
  // const { reviewTitle, reviewContent } = useSelector(
  //   (state) => state.user.review.reviewData.buyer
  // );

  const InputChange = (e) => {
    const { id, value } = e.target;
    setinputs({ ...inputs, [id]: value });
    console.log(inputs);
  };

  const reviewSubmit = () => {
    const { reviewTitle, reviewContent } = inputs;
    inputSpaceReg(reviewTitle);
    inputSpaceReg(reviewContent);

    if (!imageArr.length) {
      MySwal.fire({
        icon: "error",
        title: "Oops!",
        text: "작품 등록시 사진은 반드시 1장 이상이어야 합니다.",
      });
      return;
    }
    if (!inputSpaceReg(reviewTitle) || !inputSpaceReg(reviewContent)) {
      alert("제목, 내용은 필수 입력 항목이에요.");
      return;
    }

    console.log(imageArr);
    setinputs({ ...inputs, imageUrl: imageArr, category: "도자기" });

    const formData = new FormData();
    formData.append("category", "도자기");
    formData.append("reviewTitle", inputs.reviewTitle);
    formData.append("reviewContent", inputs.reviewContent);
    for (let i = 0; i < imageArr.length; i++) {
      formData.append("imageUrl", fileObj[i]);
    }
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    if (reviewWrite) {
      dispatch(postReviewDB(postId, formData));
    } else if (reviewEdit) {
      dispatch(editReviewDB(reviewId, formData));
    }
  };

  // componentwillunmount 역할
  useEffect(() => {
    // 이미지 리덕스 데이터 초기화
    if (reviewWrite) {
      setinputs({});
      dispatch(clearPreview());
    } else if (reviewEdit) {
      dispatch(getReviewOne(reviewId));
      // setinputs({ reviewTitle: reviewTitle, reviewContent: reviewContent });
    }
  }, []);

  const [image, setImage] = useState(null);

  return (
    <Wrap margin="16px">
      <Preview />

      <Input
        id="reviewTitle"
        placeholder="제목을 입력해주세요."
        value={inputs?.postTitle}
        onChange={InputChange}
      />
      <Textarea
        id="reviewContent"
        value={inputs.postContent}
        placeholder="작품에 대한 후기를 작성해주세요. 허위로 작성된 글은 게시가 제한될 수 있습니다."
        onChange={InputChange}
        textLine={100}
      />
      <Button text position="absolute" top="0" right="0" onClick={reviewSubmit}>
        완료
      </Button>
      {/* {reviewWrite ? (
        <Button
          text
          position="absolute"
          top="0"
          right="0"
          onClick={reviewSubmit}
        >
          완료
        </Button>
      ) : (
        <Button
          text
          position="absolute"
          top="0"
          right="0"
          onClick={reviewEditSubmit}
        >
          완료
        </Button>
      )} */}
    </Wrap>
  );
};

export default ReviewWrite;
