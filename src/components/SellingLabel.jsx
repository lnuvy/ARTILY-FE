// import React from "react";
// import styled from "styled-components";

// const SellingLabel = (props) => {
//   const { small, big, post } = props;
//   if (small) {
//     return (
//       <>
//         <SmallLabel>
//           <p className="selling">판매중</p>
//         </SmallLabel>
//       </>
//     );
//   }
//   if (big) {
//     <BigLabel>
//       <p className="selling">판매중</p>
//     </BigLabel>;
//   }
//   if (post) {
//     //작가유저가 자신의 제품 상세 페이지를 볼때
//     <PostLabel>
//       <p className="selling">판매중</p>
//     </PostLabel>;
//   }
// };

// const SmallLabel = styled.div`
//   .selling {
//     height: 25px;
//     padding: 5px;
//     font-size: 13px;
//     margin-left: 8px;
//     border-radius: 4px;
//     letter-spacing: -0.41px;
//     color: ${({ theme }) => `${theme.pallete.primary850}`};
//     border: 1px solid ${({ theme }) => `${theme.pallete.primary850}`};
//     background-color: #fff;
//   }
// `;

// const BigLabel = styled.div`
//   position: relative;
//   .selling {
//     position: absolute;
//     top: 7px;
//     left: 7px;
//     height: 30px;
//     padding: 0 8px;
//     line-height: 30px;
//     letter-spacing: -0.41px;
//     color: #fff;
//     border-radius: 8px;
//     font-size: 14px;
//     background-color: ${({ theme }) => `${theme.color.brandColor}`};
//   }
// `;
// const PostLabel = styled.div`
//   .selling {
//     width: 64px;
//     height: 25px;
//     padding: 0 8px;
//     font-size: 14px;
//     line-height: 25px;
//     letter-spacing: -0.41px;
//     border-radius: 4px;
//     background-color: ${({ theme }) => `${theme.color.brandColor}`};
//   }
// `;
// export default SellingLabel;
