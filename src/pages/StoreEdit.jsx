import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Preview } from "../components";
import { Button, Flex, Input, Textarea, ToggleButton, Wrap } from "../elements";
import { clearPreview, editPosts3Url } from "../redux/modules/image";
import { openDragModal } from "../redux/modules/modal";
// import MapModal from "../shared/modal/modalContent/MapModal";
import CategoryModal from "../shared/modal/modalContent/CategoryModal";
import { inputSpaceReg } from "../shared/utils";

import { IoIosArrowForward } from "react-icons/io";
import { history } from "../redux/configureStore";
import { editPostDB } from "../redux/modules/store";
import { useParams } from "react-router-dom";

// alert
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import MapModal from "../shared/modal/modalContent/MapModal";

/*
 * @한울
 *
 */

const MySwal = withReactContent(Swal);

const StoreEdit = () => {
  const dispatch = useDispatch();

  const { postId } = useParams();

  const nowPost = useSelector((state) => state.store.detailData);

  useEffect(() => {
    if (!nowPost) {
      history.replace("/store");
    } else {
      dispatch(editPosts3Url(nowPost?.imageUrl));
    }
  }, []);

  if (nowPost?.transaction === "전체") {
    var editDelivery = true;
    var editDirect = true;
  } else if (nowPost?.transaction === "직거래") {
    editDelivery = false;
  } else {
    editDirect = false;
  }

  const [inputs, setInputs] = useState({
    delivery: editDelivery,
    direct: editDirect,
    postTitle: nowPost?.postTitle,
    postContent: nowPost?.postContent,
    price: nowPost?.price,
  });
  const { imageArr, fileObj } = useSelector((state) => state.image);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  };

  const [receiveAddress, setReceiveAddress] = useState(nowPost?.changeAddress);
  const [receiveCategory, setReceiveCategory] = useState(nowPost?.category);

  useEffect(() => {
    // 이미지 리덕스 데이터 초기화
    return () => {
      dispatch(clearPreview());
    };
  }, []);

  const modalOn = (reg) => {
    if (reg === "category") {
      dispatch(
        openDragModal(<CategoryModal setReceiveCategory={setReceiveCategory} />)
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

    for (let i = 1; i < imageArr.length; i++) {
      if (imageArr[i].includes("https://artily-bucket.s3.ap-northeast-2")) {
        formData.append("imgSave", imageArr[i]);
      }
    }
    for (let i = 0; i < fileObj.length; i++) {
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
    dispatch(editPostDB(postId, formData));
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
          placeholder="작품명을 입력해 주세요."
          padding="16px 12px"
          // label="작품명"
          // margin="0 0 10px"
          value={inputs?.postTitle}
          onChange={handleChange}
        />
        <Input
          id="price"
          placeholder="\ 가격"
          type="number"
          margin="0 0 10px"
          padding="16px 12px"
          value={inputs.price ? inputs?.price : ""}
          onChange={handleChange}
        />
        <Textarea
          id="postContent"
          placeholder="작품을 설명하는 글을 적어주세요. 허위로 작성한 글은 게시가 제한 될 수 있습니다."
          value={inputs?.postContent}
          maxLength="100"
          onChange={handleChange}
          border="1px solid transparent"
        />
      </Wrap>
      <Flex width="90%" margin="0 auto">
        <Button width="100%" onClick={submitPost}>
          판매 작품 등록하기
        </Button>
      </Flex>
    </>
  );
};

export default StoreEdit;
