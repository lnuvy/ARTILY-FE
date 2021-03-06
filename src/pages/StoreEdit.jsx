import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Preview } from "../components";
import {
  Button,
  Flex,
  Input,
  Textarea,
  ToggleButton,
  Text,
  Wrap,
  Icon,
} from "../elements";
import { clearPreview, editPosts3Url } from "../redux/modules/image";
import { openDragModal, openModal } from "../redux/modules/modal";
import CategoryModal from "../shared/modal/modalContent/CategoryModal";
import { NavigationNext, Close } from "../assets/icons/index";
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
import theme from "../styles/theme";

const MySwal = withReactContent(Swal);

const StoreEdit = () => {
  // 할당
  const dispatch = useDispatch();
  const { postId } = useParams();
  const path = useLocation().pathname;

  // selector
  const nowPost = useSelector((state) => state.store.detailData);
  const { fileObj, imageDt } = useSelector((state) => state.image);
  const { isLoading } = useSelector((state) => state.store);

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
    if (id === "price" && Number(value) > 9999999) {
      MySwal.fire({
        icon: "error",
        text: "가격은 9,999,999원까지만 설정 가능합니다.",
      });
    }
    setInputs({ ...inputs, [id]: value });
  };

  // 맵 모달
  const modalOn = (reg) => {
    if (reg === "category") {
      dispatch(
        openDragModal(<CategoryModal setReceiveCategory={setReceiveCategory} />)
      );
    } else {
      dispatch(
        openModal({
          title: "위치 선택",
          content: (
            <MapModal
              setReceiveAddress={setReceiveAddress}
              currentAddress={receiveAddress}
            />
          ),
        })
      );
    }
  };

  function submitPost() {
    const { postTitle, price, postContent } = inputs;
    if (path === `/store/write`) {
      if (fileObj.length === 0) {
        MySwal.fire({
          icon: "error",
          text: "이미지를 최소 1장 이상 선택해주세요.",
        });
        return;
      }
    }
    if (
      (inputs.delivery === null ||
        inputs.delivery === undefined ||
        inputs.delivery === "") &&
      (inputs.direct === null ||
        inputs.direct === undefined ||
        inputs.direct === "")
    ) {
      MySwal.fire({
        icon: "error",
        text: "거래 방식을 선택해주세요.",
      });
      return;
    }
    if (
      inputs.direct &&
      (receiveAddress === null ||
        receiveAddress === undefined ||
        receiveAddress === "")
    ) {
      MySwal.fire({
        icon: "error",
        text: "거래하실 동네를 선택해주세요.",
      });
      return;
    }
    if (
      receiveCategory === null ||
      receiveCategory === undefined ||
      receiveCategory === ""
    ) {
      MySwal.fire({
        icon: "error",
        text: "카테고리를 입력해주세요.",
      });
      return;
    }
    if (postTitle === null || postTitle === undefined || postTitle === "") {
      MySwal.fire({
        icon: "error",
        text: "작품명을 입력해주세요.",
      });
      return;
    }
    if (
      postContent === null ||
      postContent === undefined ||
      postContent === ""
    ) {
      MySwal.fire({
        icon: "error",
        text: "내용을 입력해주세요.",
      });
      return;
    }
    if (price === null || price === undefined || price === "") {
      MySwal.fire({
        icon: "error",
        text: "가격을 설정해주세요. 숫자만 입력 가능합니다.",
      });
      return;
    }

    console.log("postTitle " + postTitle);
    console.log("postContent " + postContent);
    console.log("category " + receiveCategory);
    console.log("transaction " + "택배");
    console.log("changeAddress " + "");
    console.log("price " + Number(price) + toString.call(Number(price)));
    console.log("images " + fileObj);

    const formData = new FormData();
    formData.append("category", receiveCategory);
    formData.append("postTitle", postTitle);
    formData.append("postContent", postContent);
    formData.append("price", Number(price));

    for (let i = 0; i < fileObj.length; i++) {
      formData.append("image", fileObj[i]);
    }

    for (let i = 0; i < imageDt.length; i++) {
      formData.append("imgDt", imageDt[i]);
    }

    if (inputs.delivery && !inputs.direct) {
      formData.append("changeAddress", " ");
      formData.append("transaction", "택배");
    } else if (inputs.direct && !inputs.delivery) {
      formData.append("changeAddress", receiveAddress);
      formData.append("transaction", "직거래");
    } else {
      formData.append("changeAddress", receiveAddress);
      formData.append("transaction", "전체");
    }

    if (path === `/store/edit/${postId}`) {
      dispatch(editPostDB(postId, formData));
    }
    if (path === `/store/write`) {
      if (inputs.delivery && !inputs.direct) {
        dispatch(addPostDB(formData, receiveAddress, false));
        return;
      }
      if (!inputs.delivery && inputs.direct) {
        dispatch(addPostDB(formData, receiveAddress, true));
        return;
      }
      if (inputs.delivery && inputs.direct) {
        dispatch(addPostDB(formData, receiveAddress, true));
        return;
      }
    }
  }

  return (
    <>
      <Wrap margin="0 16px 16px">
        <Flex jc="space-between">
          <Preview />
        </Flex>
        <Wrap margin="16px 0 0 0" />
        <ToggleButton
          margin="0 5px 10px 0"
          onClick={() => setInputs({ ...inputs, delivery: !inputs.delivery })}
          id="delivery"
          select={inputs?.delivery}
          color={`${theme.color.brandColor}`}
          padding="8px"
          border={`1px solid ${theme.color.brandColor}`}
          fontSize="16px !important"
        >
          택배
        </ToggleButton>
        <ToggleButton
          onClick={() => setInputs({ ...inputs, direct: !inputs.direct })}
          id="direct"
          select={inputs?.direct}
          color={`${theme.color.brandColor}`}
          padding="8px"
          border={`1px solid ${theme.color.brandColor}`}
        >
          직거래
        </ToggleButton>
        {inputs.direct && (
          <>
            <Input
              readOnly
              value={receiveAddress ? receiveAddress : "위치 선택"}
              color={theme.pallete.black}
              icon={<NavigationNext size={28} />}
              onClick={modalOn}
              fontSize="14px"
            />
            <Wrap margin="8px 0 0 0" />
          </>
        )}
        <Category>
          <Input
            readOnly
            value={receiveCategory || "카테고리 선택"}
            color={theme.pallete.black}
            icon={<NavigationNext size={28} />}
            placeholderColor={theme.pallete.black}
            onClick={() => {
              modalOn("category");
            }}
          />
        </Category>
        <Wrap margin="8px 0 0 0" />
        <Input
          id="postTitle"
          type="text"
          placeholder="작품명을 입력해 주세요."
          value={inputs.postTitle || ""}
          onChange={handleChange}
          placeholderColor={theme.pallete.gray3}
        />
        <Wrap margin="8px 0 0 0" />
        <Input
          id="price"
          placeholder="₩ 가격"
          type="number"
          margin="0 0 10px"
          value={inputs.price || ""}
          onChange={handleChange}
        />
        <Textarea
          id="postContent"
          placeholder="작품을 설명하는 글을 적어주세요. 허위로 작성한 글은 게시가 제한 될 수 있습니다."
          value={inputs.postContent || ""}
          maxLength="299"
          minLength="3"
          onChange={handleChange}
          border="1px solid #ddd"
          padding="10px"
          textLine="21"
        />
      </Wrap>

      <ButtonWrap>
        <Flex>
          <Icon
            margin="0 0 0 16px"
            onClick={() => {
              history.goBack();
            }}
          >
            <Close />
          </Icon>
          <Wrap fg="1"></Wrap>

          {isLoading ? (
            <Text color={theme.pallete.gray2} margin="14px 16px">
              업로드중
            </Text>
          ) : (
            <Button
              text
              color={theme.color.brandColor}
              fontSize="16px"
              padding="14px 16px"
              onClick={submitPost}
            >
              완료
            </Button>
          )}
        </Flex>
      </ButtonWrap>

      {/* </Wrap> */}
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

const Box = styled.div`
  transform: translateZ(0);
`;

const ButtonWrap = styled.div`
  position: fixed;
  z-index: 100;
  top: 0;
  left: 50%;
  transform: translate(-50%, 0);
  margin: 0 auto;
  width: 100%;
  max-width: ${theme.view.maxWidth};
`;
const Category = styled.div`
  cursor: pointer;
`;
export default StoreEdit;
