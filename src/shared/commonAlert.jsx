import Swal from "sweetalert2";

export const deleteSwal = async () => {
  const result = await Swal.fire({
    icon: "question",
    title: "이 글을 삭제할까요?",
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
