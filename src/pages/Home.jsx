import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { history } from "../redux/configureStore";

const Home = () => {
  const user = useSelector((state) => state.user.user);
  console.log(user);
  // const non_address = user.address;
  // useEffect(() => {
  //   if (!non_address) {
  //     alert("주소를 설정해주세요");
  // history.push("/location");
  //   }
  // if (user.profile === {}) {
  //   alert("");
  // }
  // });
  // useEffect(() => {
  //   if (!non_address) {
  //     alert("주소를 설정해주세요");
  //     history.push("/location");
  //   }
  // }, []);

  // if (user.userId) {
  //   return (
  //     <React.Fragment>
  //       <div>Home</div>
  //       <button>로그아웃</button>
  //       <button
  //         onClick={() => {
  //           history.push("/location");
  //         }}
  //       >
  //         주소 설정
  //       </button>
  //     </React.Fragment>
  //   );
  // } else {
  return (
    <React.Fragment>
      <div>Home</div>
      <button
        onClick={() => {
          history.push("/login");
        }}
      >
        로그인
      </button>
      <button
        onClick={() => {
          history.push("/location");
        }}
      >
        주소 설정
      </button>
    </React.Fragment>
  );
};
// };

export default Home;
