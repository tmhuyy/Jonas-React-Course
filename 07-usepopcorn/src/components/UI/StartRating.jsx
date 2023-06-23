import { useState } from "react";
import PropTypes from "prop-types";
import Star from "./Star";
const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const StartRating = function ({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  onSetRating,
}) {
  const [rating, setRating] = useState(0);
  const [tempRating, setTempRating] = useState(0);

  const emptyStar = Array.from({ length: maxRating }, (_, i) => i + 1);

  const ratingHandler = function (enteredRating) {
    setRating(enteredRating);
    onSetRating(enteredRating);
  };
  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {emptyStar.map((_, i) => (
          <Star
            key={i + 1}
            value={i + 1}
            onRate={ratingHandler}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            color={color}
            size={size}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || 0}</p>
    </div>
  );
};

StartRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
};

export default StartRating;
