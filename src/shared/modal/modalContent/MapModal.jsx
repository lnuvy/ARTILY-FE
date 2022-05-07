/* global kakao */
import React, { useEffect } from "react";
import { Flex, Grid, Text, Wrap } from "../../../elements";

const { kakao } = window;

const MapModal = () => {
  useEffect(() => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 5,
    };
    let map = new kakao.maps.Map(container, options);
  }, []);

  return (
    <Wrap height="100%">
      <Flex width="317px" height="249px" bc="tomato" margin="0 auto">
        <div id="map" style={{ width: "317px", height: "249px" }}></div>
      </Flex>
    </Wrap>
  );
};

export default MapModal;
