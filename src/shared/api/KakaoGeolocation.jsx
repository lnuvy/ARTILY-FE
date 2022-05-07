import axios from "axios";

const { geolocation } = navigator;

// 위치기반
export const currentmap = async () => {
  geolocation.getCurrentPosition(function (pos) {
    // console.log(pos);
    var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;
    axios
      .get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`,
        {
          headers: {
            Authorization: "KakaoAK 8ef6077e99cfc3ea15c25ab21d4c372e",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        const location = res.data.documents[0].address;
        console.log(location);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.response);
      });
  });
};

// 모달에서 마커 바꿀때
export const changeMarker = async (pos, setAddress) => {
  geolocation.getCurrentPosition(async () => {
    let nowAddress = "";
    const { lat, lng } = pos;

    const response = await axios.get(
      `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
      {
        headers: {
          Authorization: "KakaoAK 8ef6077e99cfc3ea15c25ab21d4c372e",
        },
      }
    );
    const { region_1depth_name, region_2depth_name, region_3depth_name } =
      response.data.documents[0].address;
    nowAddress = `${region_1depth_name} ${region_2depth_name} ${region_3depth_name}`;
    setAddress(nowAddress);
  });
};
