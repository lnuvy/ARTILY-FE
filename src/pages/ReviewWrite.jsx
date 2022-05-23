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
import { getReviewOne, getNowReview } from "../redux/modules/reviews";
import { openModal } from "../redux/modules/modal";
import { postReviewDB, editReviewDB } from "../redux/modules/reviews.jsx";
import { resetImageDt, editPosts3Url } from "../redux/modules/image";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { history } from "../redux/configureStore";
import { inputSpaceReg, priceComma } from "../shared/utils";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import styled from "styled-components";
import { set } from "lodash";

const MySwal = withReactContent(Swal);

const ReviewWrite = () => {
  const dispatch = useDispatch();

  // 할당
  const { postId, reviewId } = useParams();
  const path = useLocation().pathname;
  const reviewWrite = path === `/review/write/${postId}`;
  console.log(reviewId);
  const reviewEdit = path === `/review/edit/${reviewId}`;
  console.log(reviewEdit);

  const [inputs, setinputs] = useState({});
  const { imageDt, imageArr, fileObj } = useSelector((state) => state.image);
  const buyer = useSelector((state) => state.review?.detailData?.buyer);

  // redux 리셋
  useEffect(() => {
    dispatch(clearPreview());
    dispatch(
      getNowReview({
        buyer: [],
        defferents: [],
        myLike: "-",
      })
    );
    dispatch(resetImageDt([]));
    dispatch(editPosts3Url([]));
  }, []);

  useEffect(() => {
    if (reviewWrite) {
      dispatch(editPosts3Url([]));
    } else if (reviewEdit) {
      dispatch(editPosts3Url(buyer && buyer[0]?.images));
    }
  }, []);

  useEffect(() => {
    if (reviewWrite) {
      setinputs({});
      dispatch(clearPreview());
    } else if (reviewEdit) {
      dispatch(getReviewOne(reviewId));
      setinputs({
        reviewTitle: buyer[0]?.reviewTitle,
        reviewContent: buyer[0]?.reviewContent,
      });
    }
  }, []);

  // function
  const InputChange = (e) => {
    const { id, value } = e.target;
    setinputs({ ...inputs, [id]: value });
  };

  const reviewSubmit = () => {
    const { reviewTitle, reviewContent } = inputs;
    inputSpaceReg(reviewTitle);
    inputSpaceReg(reviewContent);

    setinputs({ ...inputs });

    const formData = new FormData();
    formData.append("reviewTitle", inputs.reviewTitle);
    formData.append("reviewContent", inputs.reviewContent);
    for (let i = 0; i < fileObj.length; i++) {
      console.log(fileObj[i]);
      formData.append("image", fileObj[i]);
    }

    for (let i = 0; i < imageDt.length; i++) {
      console.log(imageDt[i]);
      formData.append("imgDt", imageDt[i]);
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    if (reviewWrite) {
      dispatch(postReviewDB(postId, formData));
    } else if (reviewEdit) {
      dispatch(editReviewDB(postId, formData));
    }
  };

  return (
    <Wrap margin="16px">
      <Preview />

      <Input
        id="reviewTitle"
        placeholder="제목을 입력해주세요."
        value={inputs?.reviewTitle}
        onChange={InputChange}
      />
      <Textarea
        id="reviewContent"
        value={inputs.reviewContent}
        placeholder="작품에 대한 후기를 작성해주세요. 허위로 작성된 글은 게시가 제한될 수 있습니다."
        onChange={InputChange}
        textLine={100}
      />
      <ButtonWrap>
        <Button text onClick={reviewSubmit}>
          완료
        </Button>
      </ButtonWrap>
    </Wrap>
  );
};

export default ReviewWrite;
const ButtonWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 999;
`;
