import React from "react";

const BoxLeague = ({ league, classContainer, id }) => {
  return (
    <div
      id={id}
      className={`box-league-container ${classContainer || ""}`}
    >
      <img src={league} className="iconLeague" alt={league.name || "League"} />
    </div>
  );
};

export default BoxLeague;
