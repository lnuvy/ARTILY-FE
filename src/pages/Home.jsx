import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Text,
  Grid,
  Image,
  Wrap,
  Flex,
  ImageCarousel,
  ImageCarouselBanner,
} from "../elements";
import { Card, Footer, ReviewCard, StoreCard } from "../components";
import { getHomeDataDB } from "../redux/modules/main";
import { history } from "../redux/configureStore";

import styled from "styled-components";
import theme from "../styles/theme";
import banner1 from "../assets/images/banner1.png";
import banner2 from "../assets/images/banner2.png";
import AttentionCarousel from "../elements/AttentionCarousel";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// const Home = () => {
//   const dispatch = useDispatch();
//   // const getProfile = useSelector((state) => state.user.user);

//   // 더미데이터 주입
//   useEffect(() => {
//     dispatch(getHomeDataDB());
//   }, []);

//   const { bestPost, bestWriter, bestReview } = useSelector(
//     (state) => state.main
//   );

//   const move2detail = (data, path) => {
//     // console.log(data, path);
//     if (path === "store") {
//       history.push(`/${path}/view/${data.postId}`);
//       return;
//     }
//     if (path === "review") {
//       history.push(`/${path}/view/${data.reviewId}`);
//     }
//   };

//   const prevBtn = () => {
//     window.alert("오른쪽으로 이동");
//   };
//   const nextBtn = () => {
//     window.alert("왼쪽으로 이동");
//   };
//   const bannerImgs = [{ imageUrl: banner1 }, { imageUrl: banner2 }];
//   return (
//     <>
//       <ImageCarouselBanner src={bannerImgs} />
//       <Wrap padding="16px 16px 28px">
//         <Text bold h3 margin="0 0 10px 0">
//           인기 작품
//         </Text>
//         <Grid gtc="1fr 1fr" rg="16px" cg="7px">
//           {bestPost &&
//             bestPost.map((v, i) => {
//               return (
//                 <StoreCard
//                   onClick={() => move2detail(v, "store")}
//                   isHome
//                   key={v.postId}
//                   {...v}
//                   imageUrl={v.images[0].imageUrl}
//                 />
//               );
//             })}
//         </Grid>
//       </Wrap>
//       <WrapNotice padding="0 0 24px">
//         <Text bold h3 margin="0 0 18px 16px">
//           아틀리가 주목하는 작가
//         </Text>
//         {/* <Leftbutton onClick={prevBtn}>◁</Leftbutton>
//         <Rightbutton onClick={nextBtn}>▷</Rightbutton> */}

//         {/* <AttentionCarousel /> */}

//         <BestArtistWrap className="WrapSlide">
//           {/* <Grid gtc="1fr 1fr 1fr 1fr" rg="8px" cg="8px"> */}
//           {bestWriter.length > 0 &&
//             bestWriter.map((artist, i) => {
//               return (
//                 <CardOne>
//                   <Card
//                     key={i}
//                     border={`1px solid ${theme.pallete.gray1}`}
//                     padding="16px 16px 10px"
//                     onClick={() =>
//                       history.push(`/userprofile/${artist?.userId}`)
//                     }
//                     width="270px"
//                   >
//                     <Image
//                       circle
//                       size="88"
//                       margin="8px auto 10px"
//                       src={artist?.profileImage}
//                     />
//                     <Text textAlign="center" margin="0 0 9px">
//                       {artist?.nickname}
//                     </Text>
//                     <Text body2 textAlign="center" margin="0 0 6px">
//                       {artist?.introduce || "-"}
//                     </Text>
//                     <Text body3 textAlign="center" color={theme.pallete.gray3}>
//                       {/* 작품타입 오브제 ∙  */}
//                       등록작품{" "}
//                       {artist && artist.postCount ? artist.postCount : 0}개
//                     </Text>
//                   </Card>
//                 </CardOne>
//               );
//             })}
//           {/* </Grid> */}
//         </BestArtistWrap>
//       </WrapNotice>
//       <Wrap padding="0 16px 33px">
//         <Text bold h3 margin="0 0 10px 0">
//           Best 후기
//         </Text>
//         <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0 0 20px">
//           {bestReview.length > 0
//             ? bestReview.map((l, i) => {
//                 return (
//                   <ReviewCard
//                     key={i}
//                     {...l}
//                     onClick={() => move2detail(l, "review")}
//                     images={l.images[0].imageUrl}
//                   />
//                 );
//               })
//             : null}
//         </Grid>
//       </Wrap>
//       <Footer />
//     </>
//   );
// };
// export default Home;

// const BestArtistWrap = styled.div`
//   /*padding으로 양 옆값 주면 오른쪽 여백이 반영이 안되는 것 같아서 margin으로 바꿨습니다.*/
//   /* background-color: #888; */
//   width: 215px;
//   height: 401px;
//   /* margin: 0 85px 0 85px; */
//   margin: auto;
//   /* margin: 10px 10px 10px 10px; */
//   transform: rotate(-90deg);
//   box-sizing: border-box;
//   overflow-y: scroll;
//   overflow-x: hidden;
//   position: relative;
//   top: -90px;
//   /* background-color: blueviolet; */
// `;
// const CardOne = styled.div`
//   /* background-color: beige; */
//   /* width: 100%; */
//   margin: 0 0 70px 0;
//   transform: rotate(90deg);
//   box-sizing: border-box;
//   &:nth-of-type(1) {
//     margin-top: 30px;
//   }
//   &:nth-of-type(4) {
//     margin-bottom: 85px;
//   }
// `;
// const WrapNotice = styled.div`
//   /* position: relative; */
//   /* background-color: #ddd; */
//   height: 300px;
// `;
// const Leftbutton = styled.button`
//   /* position: absolute;
//   top: 0px;
//   right: 50px;
//   width: 30px;
//   height: 30px;
//   border: 1px solid #888;
//   background-color: #fff;
//   border-radius: 3px;
//   cursor: pointer; */
// `;
// const Rightbutton = styled.button`
//   position: absolute;
//   top: 0px;
//   right: 16px;
//   width: 30px;
//   height: 30px;
//   border: 1px solid #888;
//   background-color: #fff;
//   border-radius: 3px;
//   cursor: pointer;
// `;
const Home = () => {
  const dispatch = useDispatch();
  // const getProfile = useSelector((state) => state.user.user);

  // 더미데이터 주입
  useEffect(() => {
    dispatch(getHomeDataDB());
  }, []);

  const { bestPost, bestWriter, bestReview } = useSelector(
    (state) => state.main
  );

  const move2detail = (data, path) => {
    // console.log(data, path);
    if (path === "store") {
      history.push(`/${path}/view/${data.postId}`);
      return;
    }
    if (path === "review") {
      history.push(`/${path}/view/${data.reviewId}`);
    }
  };
  const MySwal = withReactContent(Swal);
  const howScroll = () => {
    MySwal.fire({
      icon: "info",
      text: "PC에서도 [shift] + 마우스 휠을 움직여 좌우 스크롤이 가능해요!",
      // showDenyButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/");
      }
    });
  };

  const prevBtn = () => {
    window.alert("오른쪽으로 이동");
  };
  const nextBtn = () => {
    window.alert("왼쪽으로 이동");
  };
  const bannerImgs = [{ imageUrl: banner1 }, { imageUrl: banner2 }];
  return (
    <>
      <ImageCarouselBanner src={bannerImgs} />
      <Wrap padding="16px 16px 28px">
        <Text bold h3 margin="0 0 10px 0">
          인기 작품
        </Text>
        <Grid gtc="1fr 1fr" rg="16px" cg="7px">
          {bestPost &&
            bestPost.map((v, i) => {
              return (
                <StoreCard
                  onClick={() => move2detail(v, "store")}
                  isHome
                  key={v.postId}
                  {...v}
                  imageUrl={v.images[0].imageUrl}
                />
              );
            })}
        </Grid>
      </Wrap>
      <WrapNotice padding="0 0 24px">
        <Text bold h3 margin="0 0 18px 16px">
          아틀리가 주목하는 작가
        </Text>
        <div className="info" onClick={howScroll}>
          i
        </div>
        {/* <Leftbutton onClick={prevBtn}>◀</Leftbutton>
        <Rightbutton onClick={nextBtn}>▶</Rightbutton> */}

        {/* <AttentionCarousel /> */}

        <BestArtistWrap className="WrapSlide">
          <Grid gtc="1fr 1fr 1fr 1fr" rg="8px" cg="8px">
            {bestWriter.length > 0 &&
              bestWriter.map((artist, i) => {
                return (
                  <Card
                    key={i}
                    border={`1px solid ${theme.pallete.gray1}`}
                    padding="16px 16px 10px"
                    onClick={() =>
                      history.push(`/userprofile/${artist?.userId}`)
                    }
                    width="270px"
                  >
                    <Image
                      circle
                      size="88"
                      margin="8px auto 10px"
                      src={artist?.profileImage}
                    />
                    <Text textAlign="center" margin="0 0 9px">
                      {artist?.nickname}
                    </Text>
                    <Text body2 textAlign="center" margin="0 0 6px">
                      {artist?.introduce || "-"}
                    </Text>
                    <Text body3 textAlign="center" color={theme.pallete.gray3}>
                      {/* 작품타입 오브제 ∙  */}
                      등록작품{" "}
                      {artist && artist.postCount ? artist.postCount : 0}개
                    </Text>
                  </Card>
                );
              })}
          </Grid>
        </BestArtistWrap>
      </WrapNotice>
      <Wrap padding="0 16px 33px">
        <Text bold h3 margin="0 0 10px 0">
          Best 후기
        </Text>
        <Grid gtc="1fr 1fr" rg="8px" cg="8px" margin="0 0 20px">
          {bestReview.length > 0
            ? bestReview.map((l, i) => {
                return (
                  <ReviewCard
                    key={i}
                    {...l}
                    onClick={() => move2detail(l, "review")}
                    images={l.images[0].imageUrl}
                  />
                );
              })
            : null}
        </Grid>
      </Wrap>
      <Footer />
    </>
  );
};
export default Home;

const BestArtistWrap = styled.div`
  /*padding으로 양 옆값 주면 오른쪽 여백이 반영이 안되는 것 같아서 margin으로 바꿨습니다.*/
  /* background-color: #888; */
  margin: 0 16px 24px 16px;
  overflow: auto;
  overflow-y: hidden;
`;

const WrapNotice = styled.div`
  position: relative;
  /* background-color: #ddd; */
  height: 300px;
  .info {
    position: absolute;
    top: 0;
    right: 16px;
    width: 20px;
    height: 20px;
    border-radius: 20px;
    border: 2px solid #777;
    text-align: center;
    color: #777;
    line-height: 16px;
    cursor: pointer;
  }
`;
const Leftbutton = styled.button`
  position: absolute;
  top: 0px;
  right: 50px;
  width: 30px;
  height: 30px;
  border: 1px solid #888;
  background-color: #fff;
  border-radius: 3px;
  cursor: pointer;
`;
const Rightbutton = styled.button`
  position: absolute;
  top: 0px;
  right: 16px;
  width: 30px;
  height: 30px;
  border: 1px solid #888;
  background-color: #fff;
  border-radius: 3px;
  cursor: pointer;
`;
