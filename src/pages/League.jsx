import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeamLeagueTable from "../components/TeamLeagueTable";
import TopBoxLeague from "../components/TopBoxLeague";

const League = () => {
  const leagueMap = {
    1: "La Liga",
    2: "Premier League",
    3: "Serie A",
    // etc...
  };

  const { id } = useParams();
  const [teams, setTeams] = useState([]);
  const [league, setLeague] = useState({});
  const [numberTeamsLeague, setNumberTeamsLeague] = useState(10);
  const [playerStats, setPlayerStats] = useState([]);
  const [match, setMatch] = useState([]);

  const params = new URLSearchParams(window.location.search);
  const leagueId = Number(params.get("league"));
  const leagueName = leagueMap[Number(id)];
  const [season, setSeason] = useState("25/26");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${API_URL}/tableLeague/${id}?season=${season}`)
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
        console.log(data);
      });
  }, [id, season]);
  useEffect(() => {
    fetch(`${API_URL}/matches`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const activeMatches = data.filter(
          (match) =>
            (match.status === "Live" || match.status === "Scheduled") &&
            match.leagueName === leagueName,
        );
        setMatch(activeMatches);
      });
  }, [id]);
  useEffect(() => {
    fetch(`${API_URL}/league/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "league");
        setLeague(data[0]);
      });
  }, [id]);

  useEffect(() => {
    const seasonQuery = season === "25/26" ? "2025/26" : "2026/27";

    fetch(`${API_URL}/topPlayersLeague/${id}?season=${seasonQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayerStats(data);
        console.log(data, "top players");
      });
  }, [id, season]);

  const topByGoals = [...playerStats]
    .filter((p) => p.goals > 0)
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 3);

  const topByAssists = [...playerStats]
    .filter((p) => p.assists > 0)
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 3);

  const topCleanSheets = [...playerStats]
    .filter((p) => p.clean_sheets > 0)
    .sort((a, b) => b.clean_sheets - a.clean_sheets)
    .slice(0, 3);

  console.log(match, "pepino");

  return (
    <section className="league-container">
      {id === "1" ? (
        <header className="header-league laLiga-header">
          <div>
            <img src="/laligahorizontallogo.svg" alt="LaLiga EA SPORT" />
            <select
              className="season-select-laLiga"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <option value="26/27">Season 26/27</option>
              <option value="25/26">Season 25/26</option>
            </select>
          </div>
          <img src="/laligaIcon.svg" alt="icono laLiga" />
        </header>
      ) : id === "2" ? (
        <header className="header-league premier-header">
          <div>
            <img src="/premierLeagueLogoHorizontal.svg" alt="Premier League" />
            <select
              className="season-select-premier"
              value={season}
              onChange={(e) => setSeason(e.target.value)}
            >
              <option value="26/27">Season 26/27</option>
              <option value="25/26">Season 25/26</option>
            </select>
          </div>
          <img src="/premierIcon.svg" alt="icono Premier League" />
        </header>
      ) : null}
      <article className="league-table-container">
        {id == "1" ? (
          <h3 className="title-table">
            Table LaLiga EA SPORT <span>Season {season}</span>
          </h3>
        ) : (
          <h3 className="title-table">
            Table Premier League <span>Season {season}</span>
          </h3>
        )}
        {teams.slice(0, numberTeamsLeague).map((team) => (
          <TeamLeagueTable key={team.team_id} team={team} />
        ))}
        {numberTeamsLeague < teams.length ? (
          <button
            className="btn-league"
            onClick={() => setNumberTeamsLeague(teams.length)}
          >
            Show all teams
          </button>
        ) : numberTeamsLeague === teams.length ? (
          <button
            className="btn-league"
            onClick={() => setNumberTeamsLeague(10)}
          >
            Show less teams
          </button>
        ) : null}
      </article>
      <article className="next-matchs-container">
        <h4>Next matches</h4>
        <div className="next-match-container">
          {match.map((match) => (
            <div className="next-match">
              <div className="team-nextMatch">
                <img src={match.homeTeamLogo}></img>
                <span>{match.homeTeamName}</span>
              </div>
              <span className="vs-league">VS</span>
              <div className="team-nextMatch">
                <img src={match.awayTeamLogo}></img>
                <span>{match.awayTeamName}</span>
              </div>
            </div>
          ))}
        </div>
      </article>
      <section className="topBoxLeague-container">
        <article>
          <h2>TOP SCORER</h2>
          <div className="topBoxLeague">
            {topByGoals.map((player, index) => (
              <TopBoxLeague player={player} title="goals" index={index} />
            ))}
          </div>
        </article>
        <article>
          <h2>TOP ASSISTER</h2>
          <div className="topBoxLeague">
            {topByAssists.map((player, index) => (
              <TopBoxLeague player={player} title="assists" index={index} />
            ))}
          </div>
        </article>
        <article>
          <h2>TOP CLEAN SHEETS</h2>
          <div className="topBoxLeague">
            {topCleanSheets.map((player, index) => (
              <TopBoxLeague player={player} title="Clean" index={index} />
            ))}
          </div>
        </article>
      </section>
    </section>
  );
};

export default League;
