import Swal from "sweetalert2";
import { history } from "../redux/configureStore";

export const deleteSwal = async () => {
  const result = await Swal.fire({
    icon: "",
    title: "정말 삭제하시겠어요?",
    text: "삭제 후에는 복구가 불가능 합니다.",
    showDenyButton: true,
    confirmButtonText: "네",
    confirmButtonColor: "royalblue",
    denyButtonText: `아니오`,
    denyButtonColor: "#FD9B00",
  }).then((result) => {
    // console.log(result);
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
  return result;
};

export const authAlert = async (message) => {
  const result = await Swal.fire({
    icon: "warning",
    title: message,
    text: "회원만 이용할 수 있습니다. 로그인 페이지로 이동하시겠습니까?",
    showDenyButton: true,
    confirmButtonText: "네",
    // confirmButtonColor: "red",
    denyButtonText: `아니오`,
    // denyButtonColor: "gray",
  }).then((result) => {
    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
  });
  return result;
};
