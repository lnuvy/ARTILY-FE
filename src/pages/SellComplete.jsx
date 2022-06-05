import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { ProfileCard, NoInfo } from "../components";
import { Button, Flex, Text, Wrap } from "../elements";
import theme from "../styles/theme";
import { getChatList } from "../redux/modules/chat";
import { sellCompleteDB } from "../redux/modules/store";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);
const SellComplete = () => {
  const dispatch = useDispatch();
  const path = useLocation().pathname;

  const { chatRoom } = useSelector((state) => state.chat.chatData);
  const { postId } = useParams();

  const [currentSelect, setCurrentSelect] = useState(undefined);
  const [selectedUserId, setSelectedUserId] = useState(undefined);

  const arr = new Array(3);

  // console.log(arr);

  useEffect(() => {
    dispatch(getChatList());
  }, []);

  function changeStateToComplete() {
    if (!selectedUserId) {
      MySwal.fire({
        icon: "warning",
        text: "작품을 구매한 사람을 선택해주세요.",
      });
      return;
    }
    dispatch(sellCompleteDB(postId, selectedUserId, path));
  }

  // console.log(postId, currentSelect);
  return (
    <>
      <Wrap bc="#E0E0E0" height="calc(100vh - 48px)">
        <Flex bc="white">
          <Text h2 bold margin="8px 0 13px 16px">
            작품을 구매한 분은 누구인가요?
          </Text>
        </Flex>
        {chatRoom === undefined ? (
          <>
            <NoInfo
              text1="구매한 작업이 없습니다."
              button="돌아가기"
              movePage="/mypage"
            />
          </>
        ) : (
          chatRoom
            .filter((v) => v.post.postId === postId)
            .map((v, i) => {
              const targetUser = v.targetUser;

              return (
                <>
                  <Selectbox>
                    <ProfileCard
                      {...targetUser}
                      onClick={() => {
                        setCurrentSelect(i);
                        setSelectedUserId(targetUser.userId);
                      }}
                      current={currentSelect === i}
                    />
                  </Selectbox>
                </>
              );
            })
        )}
        {/* <ProfileCard
          onClick={() => setCurrentSelect(1)}
          current={currentSelect === 1}
        /> */}

        <Sellbtn>
          <Button shadow width="100%" onClick={changeStateToComplete}>
            선택완료
          </Button>
        </Sellbtn>
      </Wrap>
    </>
  );
};

const Sellbtn = styled.div`
  position: fixed;
  /* bottom: 50px; */
  bottom: 0;
  max-width: ${theme.view.maxWidth};
  width: 100%;
  padding: 16px;
`;

const Selectbox = styled.div``;

export default SellComplete;
