import moment from "moment";
import "moment/locale/ko";

export const changeTime = (insert_dt) => {
  const text = moment(insert_dt).fromNow();
  // const text = moment(insert_dt).add(9, "hours").fromNow();
  return text;
};
