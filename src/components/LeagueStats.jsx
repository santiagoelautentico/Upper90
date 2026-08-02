import React from "react";

const LeagueStats = ({ data, title }) => {
  return (
    <article className={`league-stats ${title}`}>
      <header>
        <div className="header-league-title">
          {title === "Champions" ? (
            <img
              src="/championsHorizontalLogo.svg"
              className="champions-icon"
              alt="Champions League"
            />
          ) : title === "La Liga" ? (
            <img
              src="/laligahorizontallogo.svg"
              className="laliga-icon"
              alt="LaLiga"
            />
          ) : title === "Premier League" ? (
            <img
              src="/Premier_League_Logo.svg"
              className="premier-icon"
              alt="Premier League"
              style={{ filter: "brightness(0) saturate(100%) invert(1)" }}
            />
          ) : ""}
          <h3 className="hiddenTitle">{title}</h3>
        </div>
        <span>Seasson 26/27</span>
      </header>
      <div className="stats-league">
        <ul className="haeder-stats">
          <li>Goals</li>
          <li>Assists</li>
          <li>Yellow Cards</li>
          <li>Red Cards</li>
          <li>Matches</li>
          <li>Minutes</li>
        </ul>
        <ul className="data-stats">
          <li>{data?.goals ?? 0}</li>
          <li>{data.assists ?? 0}</li>
          <li>{data.yellow_cards ?? 0}</li>
          <li>{data.red_cards ?? 0}</li>
          <li>{data.matches_played ?? 0}</li>
          <li>{data.minutes_played ?? 0}</li>
        </ul>
      </div>
    </article>
  );
};

export default LeagueStats;
