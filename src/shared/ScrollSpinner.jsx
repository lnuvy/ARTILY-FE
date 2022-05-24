import react from "react";
import "./scrollspinner.css";

export default function ScrollSpinner(props) {
  return (
    <div className="spinner-container">
      <svg
        width="100%"
        viewBox="0 0 276 276"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g id="spinner">
          <circle
            id="bottom"
            cx="138"
            cy="138"
            r="114"
            stroke="#eee"
            strokeWidth="13"
          />
          <circle
            id="upper"
            cx="138"
            cy="138"
            r="123"
            stroke="#FEC623"
            strokeWidth="30"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="373 100"
            style={{ animationDuration: props.speed + "s" }}
          />
        </g>
      </svg>
      <p>{props.customText}</p>
    </div>
  );
}
