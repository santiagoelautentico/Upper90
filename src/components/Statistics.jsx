import React from "react";

const Statistics = ({ stats, teamType }) => {
  console.log(stats, "stats");
  const Stats = stats[0];
  return (
    <div
      className={`stats-team-container ${
        teamType === "home" ? "home-stats-container" : "away-stats-container"
      }`}
    >
      <img src={Stats.picture_url} className="team-stats-logo"></img>
      <ul>
        <li>{Stats.total_shots}</li>
        <li>{Stats.shots_on_target}</li>
        <li>{Stats.corners}</li>
        <li>{Stats.possession_percentage}</li>
        <li>{Stats.fouls}</li>
        <li>{Stats.yellow_cards}</li>
        <li>{Stats.red_cards}</li>
      </ul>
    </div>
  );
};

export default Statistics;
