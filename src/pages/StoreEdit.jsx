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
import {
  editPostDB,
  getPostOne,
  go2detail,
  otherPost,
  addPostDB,
} from "../redux/modules/store";
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
  const { imageArr, fileObj } = useSelector((state) => state.image);

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
  }, []);

  // 데이터 불러오기
  useEffect(() => {
    if (path === `/store/edit/${postId}`) {
      dispatch(getPostOne(postId));
    }
  }, []);

  // 데이터 불러오기
  useEffect(() => {
    dispatch(editPosts3Url(nowPost?.images));
  }, [nowPost?.images]);

  useEffect(() => {
    console.log(nowPost);
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
  }, [nowPost]);

  // functions
  // 인풋 값 핸들링
  const handleChange = (e) => {
    const { id, value } = e.target;
    console.log(e.target.value);
    setInputs({ ...inputs, [id]: value });
    console.log(inputs);
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
    const { postTitle, price, postContent } = inputs;
    inputSpaceReg(postTitle);
    inputSpaceReg(postContent);

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
      console.log(fileObj[i][1]);
      formData.append("image", fileObj[i][1]);
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
    if (path === `/store/edit/${postId}`) {
      dispatch(editPostDB(postId, formData));
      console.log(formData);
    }
    if (path === `/store/write`) {
      dispatch(addPostDB(postId, formData));
    }
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
            icon={<IoIosArrowForward size={28} />}
            onClick={modalOn}
          />
        )}
        <Input
          readOnly
          value={receiveCategory || "카테고리 선택 "}
          icon={<IoIosArrowForward size={28} />}
          onClick={() => {
            modalOn("category");
          }}
        />
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

export default StoreEdit;
