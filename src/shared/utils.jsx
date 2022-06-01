import moment from "moment";
import "moment/locale/ko";

// price에 천단위로 쉼표 찍기
export const priceComma = (price) => {
  return parseInt(price)?.toLocaleString() || null;
};

// YYYY-MM-DD HH:mm:ss 형식 moment 현재시간기준으로 '00 전' 포맷으로 리턴
export const changeTime = (date) => {
  const text = moment(date).fromNow();
  // const text = moment(insert_dt).add(9, "hours").fromNow();
  return text;
};

/*
 * 유효성 검사 파트
 *
 */
// 띄어쓰기, 엔터만 있으면 false
export const inputSpaceReg = (text) => {
  if (!text?.replace(/(^\s*)|(\s*$)/gi, "")) {
    return false;
  }
  return true;
};

// url을 파일객체로 수정
// export const convertURLtoFile = async (url) => {
//   const response = await fetch(url);
//   const data = await response.blob();
//   const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
//   const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
//   const metadata = { type: `image/${ext}` };
//   return new File([data], filename, metadata);
// };

export const isMeCheck = (nowUser, postUser) => {
  if (nowUser === postUser) {
    return true;
  } else {
    return false;
  }
};
