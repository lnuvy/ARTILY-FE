import Swal from "sweetalert2";
import { inputSpaceReg } from "../utils";

export const nicknameCheck = (nickname) => {
  if (!inputSpaceReg(nickname)) {
    Swal.fire({
      title: "Oops!",
      text: "공백만 입력되었어요!",
      timer: 2500,
      icon: "warning",
    });
    return false;
  }

  if (nickname.length < 3 || nickname.length > 8) {
    Swal.fire({
      title: "Oops!",
      text: "유효한 닉네임 길이는 3~8자 입니다!",
      timer: 2500,
      icon: "warning",
    });
    return false;
  }

  var special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
  if (special_pattern.test(nickname) === true) {
    Swal.fire({
      title: "Oops!",
      text: "닉네임에 특수문자는 사용할수 없어요!",
      timer: 2500,
      icon: "warning",
    });
    return false;
  }

  return true;
};
