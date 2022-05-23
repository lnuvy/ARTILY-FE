// import { useEffect } from "react";

// export const InfinteScroll = ({
//   root = null,
//   target,
//   onIntersect,
//   threshold = 0.25,
//   rootMargin = "0px",
// }) => {
//   useEffect(() => {
//     const observer = new IntersectionObserver(onIntersect, {
//       //callback,options
//       root,
//       rootMargin,
//       threshold,
//     });
//     if (!target) {
//       return;
//     }
//     observer.observe(target);
//     return () => {
//       observer.unobserve(target);
//     };
//   }, [target, root, rootMargin, onIntersect, threshold]);
// };
//Intersection Observer의 callback 함수와 설정 값들을 인자로 받아서 useEffect 콜백 함수 안에서 observer 인스턴스 생성 후 구독을 해주는 역할

// 타겟 요소 관측 시작
// observer.observe(TargetElement);

// 타겟 요소 관측 중단
// observer.unobserve(TargetElement);

// 모든 요소 관측 중단
// observer.disconnect();

// 관측 중인 모든 요소를 배열 형태로 반환
// observer.takeRecords();

// export default InfinteScroll;
//scroll event
// import React from "react";
// import _ from "lodash";
// import Spinner from "./Spinner";
// import { useCallback, useEffect } from "react";

// const InfinityScroll = (props) => {
//   const { children, callNext, is_next, loading } = props;
//   const _handleScroll = _.throttle(() => {
//     //throttle과의 차이가 뭘까
//     if (loading) {
//       return;
//     }

//     const { innerHeight } = window;
//     const { scrollHeight } = document.body;
//     const scrollTop =
//       (document.documentElement && document.documentElement.scrollTop) ||
//       document.body.scrollTop;
//     if (scrollHeight - innerHeight - scrollTop < 100) {
//       callNext();
//     }
//   }, 500);

//   const handleScroll = useCallback(_handleScroll, [loading]); //(함수, 함수를 초기화할 조건)
//   //함수를 어딘가에 저장해두고 컴포넌트가 리렌더링이 되더라도 함수가 초기화되지 않도록 막아줌(메모이제이션)

//   useEffect(() => {
//     if (loading) {
//       return;
//     }
//     if (is_next) {
//       window.addEventListener("scroll", handleScroll);
//     } else {
//       window.removeEventListener("scroll", handleScroll);
//     }

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, [is_next, loading]);

//   return (
//     <>
//       {props.children}
//       {is_next && <Spinner />}
//     </>
//   );
// };
// InfinityScroll.defaultProps = {
//   children: null,
//   callNext: () => {},
//   is_next: false,
//   loading: false,
// };

// export default InfinityScroll;
