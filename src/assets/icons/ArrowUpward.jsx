import React from "react";

function ArrowUpward(props) {
  const { color } = props;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.25 20V6.85L5.05 13.05L4 12L12 4L20 12L18.95 13.05L12.75 6.85V20H11.25Z"
        fill={color ? color : "black"}
      />
    </svg>
  );
}

export default ArrowUpward;
