import { useState } from "react";
import Star from "./Star";
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const textStyle = { lineHeight: "1", margin: "0" };
const StartRating = function ({ maxRating = 1 }) {
  const [rating, setRating] = useState(0);
  const emptyStar = Array.from({ length: maxRating }, (_, i) => i + 1);

  const ratingHandler = function (enteredRating) {
    setRating(enteredRating);
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {emptyStar.map((_, i) => (
          <Star
            key={i + 1}
            value={i + 1}
            onRate={ratingHandler}
            full={rating >= i + 1}
          />
        ))}
      </div>
      <p style={textStyle}>{rating || ""}</p>
    </div>
  );
};

export default StartRating;
