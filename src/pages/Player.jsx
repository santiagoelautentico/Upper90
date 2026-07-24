import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueStats from "../components/LeagueStats";
import { optimizeImage } from "../utils/optimizeImage";

const Player = () => {
  const { id } = useParams();
  const [dataLeague, setDataLeague] = useState([]);
  const [dataChampions, setDataChampions] = useState([]);
  const [player, setPlayer] = useState({});

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/players/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayer(data);
      });

    fetch(`${API_URL}/playerStats/${id}/league`)
      .then((response) => response.json())
      .then((dataLeague) => {
        setDataLeague(dataLeague[0]);
      });

    fetch(`${API_URL}/${id}/champions`)
      .then((response) => response.json())
      .then((dataChampions) => {
        setDataChampions(dataChampions[0]);
      });
  }, [id]);

  return (
    <>
      <header className="header-player-container">
        <article>
          <div className="img-container">
            <p>{player.dorsal}</p>
            <div className="image-container">
              <img
                className="cardImgDetail"
                src={optimizeImage(player.picture_url, 1200)}
                alt={player.surname}
              />
            </div>
          </div>
          <div className="info-player">
            <div className="name-player-container">
              <h2 className="title-name">{player.full_name}</h2>
              <div className="team-player-container">
                <img
                  className="icon-team"
                  src={optimizeImage(player.pictureTeam_url, 60)}
                  alt=""
                />
                <h4>{player.team_name}</h4>
              </div>
            </div>
            <div className="info-player-container">
              <p>
                Birth date: <span>{player.birth_date?.substring(0, 10)}</span>
              </p>
              <p>
                Heigth: <span>{player.height}</span>
              </p>
              <p>
                Nacionality: <span>{player.nationality}</span>
              </p>
            </div>
          </div>
        </article>
      </header>
      <section className="stats-container">
        <LeagueStats
          title={dataLeague?.league_name || "League"}
          data={dataLeague}
        />
        {dataChampions && (
          <LeagueStats title="Champions" data={dataChampions} />
        )}
      </section>
    </>
  );
};

export default Player;
