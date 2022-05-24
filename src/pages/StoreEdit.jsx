import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Preview } from "../components";
import { Button, Flex, Input, Textarea, ToggleButton, Wrap } from "../elements";
import { clearPreview, editPosts3Url } from "../redux/modules/image";
import { openDragModal } from "../redux/modules/modal";
// import MapModal from "../shared/modal/modalContent/MapModal";
import CategoryModal from "../shared/modal/modalContent/CategoryModal";
import { inputSpaceReg } from "../shared/utils";

import { IoIosArrowForward } from "react-icons/io";
import { history } from "../redux/configureStore";
import styled from "styled-components";
import {
  editPostDB,
  getPostOne,
  go2detail,
  otherPost,
  addPostDB,
} from "../redux/modules/store";
import { resetImageDt } from "../redux/modules/image";
import { useParams } from "react-router-dom";

// alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MapModal from "../shared/modal/modalContent/MapModal";
import { now } from "lodash";

const MySwal = withReactContent(Swal);

const StoreEdit = () => {
  // 할당
  const dispatch = useDispatch();
  const { postId } = useParams();
  const path = useLocation().pathname;

  // selector
  const nowPost = useSelector((state) => state.store.detailData);
  const { imageArr, fileObj, imageDt } = useSelector((state) => state.image);

  // states
  // 인풋 정의 -> 초기값은 아래와 같음.
  const [inputs, setInputs] = useState({});
  const [receiveAddress, setReceiveAddress] = useState(null);
  const [receiveCategory, setReceiveCategory] = useState(null);

  // 택배나 직거래일 경우 정의
  let editDelivery;
  let editDirect;

  if (nowPost?.transaction === "전체") {
    editDelivery = true;
    editDirect = true;
  } else if (nowPost?.transaction === "직거래") {
    editDelivery = false;
  } else {
    editDirect = false;
  }

  // redux 리셋
  useEffect(() => {
    dispatch(clearPreview());
    dispatch(go2detail(null));
    dispatch(otherPost([]));
    dispatch(resetImageDt([]));
  }, []);

  // 데이터 불러오기
  useEffect(() => {
    if (path === `/store/edit/${postId}`) {
      dispatch(getPostOne(postId));
    }
  }, []);

  // 데이터 불러오기
  useEffect(() => {
    if (path === `/store/write`) {
      dispatch(editPosts3Url([]));
      return;
    }
    if (path === `/store/edit/${postId}`) {
      dispatch(editPosts3Url(nowPost?.images));
      return;
    }
  }, [nowPost?.images]);

  useEffect(() => {
    if (path === `/store/edit/${postId}`) {
      setReceiveCategory(nowPost?.category);
      setReceiveAddress(nowPost?.changeAddress);
      setInputs({
        transaction: nowPost?.transaction,
        delivery: nowPost
          ? nowPost.transaction === "전체"
            ? true
            : nowPost.transaction === "택배"
            ? true
            : false
          : null,
        direct: nowPost
          ? nowPost.transaction === "전체"
            ? true
            : nowPost.transaction === "택배"
            ? false
            : true
          : null,
        postTitle: nowPost?.postTitle,
        postContent: nowPost?.postContent,
        price: nowPost?.price,
      });
      return;
    }
  }, [nowPost]);

  // functions
  // 인풋 값 핸들링
  const handleChange = (e) => {
    const { id, value } = e.target;
    // console.log(e.target.value);
    setInputs({ ...inputs, [id]: value });
    // console.log(inputs);
  };

  // 맵 모달
  const modalOn = (reg) => {
    if (reg === "category") {
      dispatch(
        openDragModal(
          <CategoryModal
            setReceiveCategory={setReceiveCategory}
            receiveCategory={receiveCategory}
          />
        ),
        [nowPost]
      );
    } else {
      dispatch(
        openDragModal(
          <MapModal
            setReceiveAddress={setReceiveAddress}
            currentAddress={receiveAddress}
          />
        )
      );
    }
  };

  // 데이터 전달
  const submitPost = () => {
    console.log(imageDt);
    console.log(imageArr);
    const { postTitle, price, postContent } = inputs;

    if (!(inputs.delivery || inputs.direct)) {
      MySwal.fire({
        icon: "error",
        title: "Oops!",
        text: "거래방식을 선택하세요.",
      });
      return;
    }

    if (
      !receiveCategory ||
      !inputSpaceReg(postTitle) ||
      inputs.price === "" ||
      !inputSpaceReg(postContent)
    ) {
      alert("카테고리, 작품명, 가격, 내용은 필수 입력 항목이에요.");
      return;
    }
    if (inputs.direct && !receiveAddress) {
      alert("거래하실 동네를 선택해주세요.");
      return;
    }

    const formData = new FormData();
    formData.append("category", receiveCategory);
    formData.append("postTitle", postTitle);
    formData.append("postContent", postContent);
    formData.append("price", price);

    for (let i = 0; i < fileObj.length; i++) {
      formData.append("image", fileObj[i]);
    }

    for (let i = 0; i < imageDt.length; i++) {
      console.log(imageDt[i]);
      formData.append("imgDt", imageDt[i]);
    }

    if (inputs.delivery && !inputs.direct) {
      formData.append("changeAddress", "");
      formData.append("transaction", "택배");
    } else if (inputs.direct && !inputs.delivery) {
      formData.append("changeAddress", receiveAddress);
      formData.append("transaction", "직거래");
    } else {
      formData.append("changeAddress", receiveAddress);
      formData.append("transaction", "전체");
    }

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }

    console.log(formData.getAll("image"));

    if (path === `/store/edit/${postId}`) {
      dispatch(editPostDB(postId, formData));
    }
    if (path === `/store/write`) {
      dispatch(addPostDB(formData, receiveAddress));
    }
  };

  return (
    <>
      <Wrap margin="16px">
        <Flex jc="space-between" margin="10px 0 5px">
          <Preview />
        </Flex>
        <ToggleButton
          margin="0 5px 10px 0"
          onClick={() => setInputs({ ...inputs, delivery: !inputs.delivery })}
          id="delivery"
          select={inputs?.delivery}
          color="#FD7A00"
          border="1px solid #FD7A00"
        >
          택배
        </ToggleButton>
        <ToggleButton
          onClick={() => setInputs({ ...inputs, direct: !inputs.direct })}
          id="direct"
          select={inputs?.direct}
          color="#FD7A00"
          border="1px solid #FD7A00"
        >
          직거래
        </ToggleButton>
        {inputs.direct && (
          <Input
            readOnly
            value={receiveAddress ? receiveAddress : "위치 선택"}
            icon={<IoIosArrowForward size={28} />}
            onClick={modalOn}
          />
        )}
        <Wrapcate
          onClick={() => {
            modalOn("category");
          }}
        >
          <Inputcate
            readOnly
            value={receiveCategory || ""}
            placeholder="카테고리 선택"
          />
          <IoIosArrowForward size={28} className="arrow" />
        </Wrapcate>
        <Input
          id="postTitle"
          type="text"
          placeholder="작품명을 입력해 주세요."
          padding="16px 12px"
          value={inputs.postTitle}
          onChange={handleChange}
        />
        <Input
          id="price"
          placeholder="가격"
          type="number"
          margin="0 0 10px"
          padding="16px 12px"
          value={inputs.price}
          onChange={handleChange}
        />
        <Textarea
          id="postContent"
          placeholder="작품을 설명하는 글을 적어주세요. 허위로 작성한 글은 게시가 제한 될 수 있습니다."
          value={inputs.postContent}
          maxLength="100"
          onChange={handleChange}
          border="1px solid transparent"
        />
      </Wrap>
      <Flex width="90%" margin="0 auto">
        <Button width="100%" onClick={submitPost}>
          {path === `/store/edit/${postId}` && "판매 작품 수정하기"}
          {path === `/store/write` && "판매 작품 등록하기"}
        </Button>
      </Flex>
    </>
  );
};

const Inputcate = styled.input`
  border-bottom: 1px solid #000;
  margin: 0 0 1em;
  width: 100%;
  height: 49px;
  padding: 16px 12px;
  margin-bottom: 0;

  &::placeholder {
    font-weight: bold;
    color: #000;
  }
`;
const Wrapcate = styled.div`
  position: relative;
  .arrow {
    position: absolute;
    top: 10px;
    right: 0;
  }
`;
export default StoreEdit;
