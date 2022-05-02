import moment from "moment";
import "moment/locale/ko";

// Number 타입  price에 천단위로 쉼표 찍기
export const priceComma = (price) => {
  return price.toLocaleString();
};

// YYYY-MM-DD HH:mm:ss 형식 moment 현재시간기준으로 '00 전' 포맷으로 리턴
export const changeTime = (momentDate) => {
  const text = moment(momentDate).fromNow();
  // const text = moment(insert_dt).add(9, "hours").fromNow();
  return text;
};
