import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="contenedorLoading">
      <iframe
        src="https://cliply.co/wp-content/uploads/2021/02/392102850_EARTH_EMOJI_400px.gif"
        width="480"
        height="480"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      ></iframe>
    </div>
  );
}
