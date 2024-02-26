import React from "react";

import {
  Rating,
  Stack
} from "@mui/material";

const ReviewCard = ({ review }) => {
  

  return (
    <div className="reviewCard">
      <img src={review.photo} alt="User" />
      <p>{review.name}</p>
      <Stack>
        <Rating
          value={review.rating}
          readOnly
          style={{ color: "tomato" }}
          color=""
          size="large"
          precision={0.5}
        />
      </Stack>
      <span>{review.comment} </span>
    </div>
  );
};

export default ReviewCard;
