import React from "react";
import { Link } from "react-router-dom";
const LineupPlayer = (player) => {
  const Player = player.player;
  return (
    <Link to={`/players/${Player.playerId}`} className="linkP">
      <div className="lineup-card-player">
        {Player.yellowCards > 0 ? (
          <img className="yellowCard" src="/yellowCard.svg"></img>
        ) : null}

        {
            Player.goals > 0 ? (
                <div className="goal-container">
                    <img className="soccerBall" src="/Soccer_ball.svg" alt="Soccer ball" />
                    <span className="goal-number">{Player.goals}</span>
                </div>
            ) : null
        }

        <div className="stats-match-container">
          {Player.rating < 5 ? (
            <div className="rating-match-container rating-low">
              <h2>
                {Player.rating % 1 === 0
                  ? Math.floor(Player.rating)
                  : Player.rating}
              </h2>
            </div>
          ) : Player.rating <= 7.9 ? (
            <div className="rating-match-container rating-medium">
              <h2>
                {Player.rating % 1 === 0
                  ? Math.floor(Player.rating)
                  : Player.rating}
              </h2>
            </div>
          ) : Player.rating >= 8 && Player.rating < 9.9 ? (
            <div className="rating-match-container rating-high">
              <h2>
                {Player.rating % 1 === 0
                  ? Math.floor(Player.rating)
                  : Player.rating}
              </h2>
            </div>
          ) : Player.rating <= 10 ? (
            <div className="rating-match-container rating-perfect">
              <h2>
                <span className="text-perfect">
                  {Player.rating % 1 === 0
                    ? Math.floor(Player.rating)
                    : Player.rating}
                </span>
              </h2>
            </div>
          ) : null}
        </div>

        <div className="imgContainer-lineup-card-player">
          <img
            className="img-lineup-card"
            src={Player.playerPicture}
            alt={Player.playerSurname}
          />
        </div>
        <h4 className="name-player-lineup">{Player.playerSurname}</h4>
      </div>
    </Link>
  );
};

export default LineupPlayer;
