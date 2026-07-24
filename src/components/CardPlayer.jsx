import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export const optimizeImage = (url, size = 100) => {
  if (!url) return "/placeholder-player.png";

  // Inserta la transformación de Cloudinary justo después de "/upload/"
  return url.replace(
    "/upload/",
    `/upload/w_${size},h_${size},c_fill,f_auto,q_auto/`
  );
};

const CardPlayer = ({ player }) => {
  return (
    <>
      <article className="playerCard-container" id={player.player_id}>
        <div className="imgPlayerCard-container">
          <LazyLoadImage
            className="cardImg"
            src={optimizeImage(player.picture_url, 300)}
            alt={player.surname}
            
          />
        </div>
        <div className="data-container">
          {/* HEADERS */}
          <p>Player</p>
          <p>Games Played</p>
          <p>Goals</p>
          <p>Assists</p>
          <p>Value</p>
          {/* DATA */}
          <div className="data_player">
            <h4>{player.surname}</h4>
            <p>
              {player.team_name} / {player.national_team}
            </p>
          </div>
          <p className="stats_text">{player.total_matches}</p>
          <p className="stats_text">{player.total_goals}</p>
          <p className="stats_text">{player.total_assists}</p>
          <p className="stats_text">{player.market_value}</p>
        </div>
      </article>
      <hr className="line" />
    </>
  );
};

export default CardPlayer;