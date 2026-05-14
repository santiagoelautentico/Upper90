import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
const SkeletonCardPlayer = ({ cards }) => {
  return Array(cards)
    .fill(0)
    .map((_, i) => (
      <div key={i} className="skeletonCardPlayer-container">
        <Skeleton circle width={100} height={100} />
        <Skeleton
          count={2}
          height={20}
          width={800}
          style={{ margin: ".5rem" }}
        />
      </div>
    ));
};

export default SkeletonCardPlayer;
