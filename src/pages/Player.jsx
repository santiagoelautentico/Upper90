import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LeagueStats from "../components/LeagueStats";
const Player = () => {
  const { id } = useParams();
  const [dataLeague, setDataLeague] = useState([]);
  const [dataChampions, setDataChampions] = useState([]);
  const [player, setPlayer] = useState({});
  // Fetch player stats League
  useEffect(() => {
    fetch(`http://localhost:1234/players/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayer(data);
      });
    // Fetch League
    fetch(`http://localhost:1234/playerStats/${id}/league`)
      .then((response) => response.json())
      .then((dataLeague) => {
        setDataLeague(dataLeague[0]);
        console.log(dataLeague, "league stats");
      });
    // Fetch Champions
    fetch(`http://localhost:1234/playerStats/${id}/champions`)
      .then((response) => response.json())
      .then((dataChampions) => {
        setDataChampions(dataChampions[0]);
        console.log(dataChampions, "champions stats");
      });
  }, [id]);

  return (
    <>
      <header className="header-player-container">
        <article>
          <div className="img-container">
            <p>{player.dorsal}</p>
            <img
              className="cardImgDetail"
              src={player.picture_url}
              alt={player.surname}
            />
          </div>
          <div className="info-player">
            <div className="name-player-container">
              <h2 className="title-name">{player.full_name}</h2>
              <div className="team-player-container">
                <img
                  className="icon-team"
                  src={player.pictureTeam_url}
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
        <LeagueStats title={dataLeague?.league_name || "League"} data={dataLeague} />
        {
            dataChampions && (
                <LeagueStats title="Champions" data={dataChampions} />
            )
        }
      </section>
    </>
  );
};

export default Player;
