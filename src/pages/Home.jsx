import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Text, Grid, Image, Wrap } from "../elements";
import { Card, ArtCard } from "../components";
import { getHomeDataDB } from "../redux/modules/main";
import { history } from "../redux/configureStore";

import { openModal } from "../redux/modules/modal";

const Home = () => {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.user);

  // 더미데이터 주입
  useEffect(() => {
    dispatch(getHomeDataDB());
  }, []);

  // 한번에 데이터를 리덕스에 넣는방법이 딱히 안떠올라서 main용 리덕스를 새로 만들었습니다 좋은 의견있으면 바꿔주세요
  const { bestStore, recommendArtist, bestReview } = useSelector(
    (state) => state.main
  );

  // if (user.userId) {
  //   return (
  //     <React.Fragment>
  //       <div>Home</div>
  //       <button>로그아웃</button>
  //       <button
  //         onClick={() => {
  //           history.push("/location");
  //         }}
  //       >
  //         주소 설정
  //       </button>
  //     </React.Fragment>
  //   );
  // } else {
  // };
  return (
    <React.Fragment>
      <button
        onClick={() => {
          history.push("/login");
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          history.push("/location");
        }}
      >
        주소 설정
      </button>
    </React.Fragment>
  );
};
//   const array = [0, 1, 2, 3];

//   return (
//     <React.Fragment>
//       <Image height="240px" />
//       <Wrap margin="16px">
//         <Text h2>인기작품</Text>
//         <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
//           {array.map((v, i) => {
//             return (
//               <ArtCard
//                 key={i}
//                 artist="작가명"
//                 title="제목"
//                 method="거래방식"
//                 region="지역"
//                 price="19000"
//               />
//             );
//           })}
//         </Grid>
//         <Text h2>아트인이 주목하는 작가</Text>
//         <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
//           {array.map((v, i) => {
//             return (
//               <Card key={i} border="1px solid rgba(0,0,0,0.1)" padding="12px">
//                 <Image shape="circle" size="100" margin="8px auto 0" />
//                 <Text textAlign="center">작가명</Text>
//                 <Text body2 textAlign="center">
//                   작가 본인이 작성한 소개를 보여주는 영역입니다. 작가 본인이
//                   작성한 소개를 보여주는 영역입니다.
//                 </Text>
//                 <Text body3 textAlign="center">
//                   작품타입 오브제 ∙ 등록작품 4개
//                 </Text>
//               </Card>
//             );
//           })}
//         </Grid>
//         <Text h2>Best 후기</Text>
//         <Grid gtc="auto auto" rg="8px" cg="8px" margin="0 0 20px">
//           {array.map((v, i) => {
//             return (
//               <Card key={i}>
//                 <Image height="120px" />
//                 <Text>후기명</Text>
//                 <Text>
//                   후기 내용 후기 내용 후기 내용 후기 내용 후기 내용 후기 내용{" "}
//                 </Text>
//                 <Flex margin="8px 0 0 0">
//                   <Image shape="circle" size="20" />
//                   <Text margin="0 0 0 4px">유저명</Text>
//                 </Flex>
//               </Card>
//             );
//           })}
//         </Grid>
//       </Wrap>
//     </React.Fragment>
//   );
// };

export default Home;
