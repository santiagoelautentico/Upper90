import React from "react";
import { Link } from "react-router-dom";

const TopBoxLeague = ({ player, title, index }) => {
  console.log(title);
  console.log(player,'try');

  return (
    <Link to={`/players/${player.player_id}`} className="displayTopBox linkP">
      <div className="imgTopBox-container">
        <img className="img-playerTop" src={player.picture_url} alt="" />
      </div>
      <div className="statsTopBox-container">
        <h4>{player.surname}</h4>
        {title === "goals" && index === 0 ? (
          <h2 className="score-h2 maxScorer">
            <span className="text-top">{player.goals}</span>
          </h2>
        ) : title === "goals" ? (
          <h2 className="score-h2">{player.goals}</h2>
        ) : title === "assists" && index === 0 ? (
          <h2 className="score-h2 maxScorer">
            <span className="text-top">{player.assists}</span>
          </h2>
        ) : title === "assists" ? (
          <h2 className="score-h2">{player.assists}</h2>
        ) : null}
      </div>
    </Link>
  );
};

export default TopBoxLeague;
