import Swal from "sweetalert2";
import { history } from "../redux/configureStore";

export const deleteSwal = async () => {
  const result = await Swal.fire({
<<<<<<< HEAD
    icon: "",
    title: "이 글을 삭제할까요?",
=======
>>>>>>> 4f65b2c824b5e593d9ea19c0420a31d45284837d
    text: "삭제 후에는 되돌릴수 없어요. 정말 삭제할까요?",
    showDenyButton: true,
    confirmButtonText: "네",
    confirmButtonColor: "red",
    denyButtonText: `아니오`,
    denyButtonColor: "gray",
  }).then((result) => {
    console.log(result);
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
