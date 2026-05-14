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

  useEffect(() => {
    fetch(`http://localhost:1234/tableLeague/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
        console.log(data);
      });
  }, [id]);
  useEffect(() => {
    fetch("http://localhost:1234/matches")
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
    fetch(`http://localhost:1234/league/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "league");
        setLeague(data[0]);
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:1234/topPlayersLeague/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPlayerStats(data);
      });
  }, [id]);

  const topByGoals = [...playerStats]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, 3);
  const topByAssists = [...playerStats]
    .sort((a, b) => b.assists - a.assists)
    .slice(0, 3);

  console.log(match, "pepino");

  return (
    <section className="league-container">
      {id === "1" ? (
        <header className="header-league laLiga-header">
          <div>
            <img src="/public/laligahorizontallogo.svg" alt="LaLiga EA SPORT" />
            <p>{league.current_season}</p>
          </div>
          <img src="/laligaIcon.svg" alt="icono laLiga" />
        </header>
      ) : id === "2" ? (
        <header className="header-league premier-header">
          <div>
            <img
              src="/public/premierLeagueLogoHorizontal.svg"
              alt="Premier League"
            />
            <p>{league.current_season}</p>
          </div>
          <img src="/premierIcon.svg" alt="icono Premier League" />
        </header>
      ) : null}
      <article className="league-table-container">
        {id == "1" ? (
          <h3 className="title-table">
            Table LaLiga EA SPORT <span>Seasson 24/25</span>
          </h3>
        ) : (
          <h3 className="title-table">
            Table Premier League <span>Seasson 24/25</span>
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
            {playerStats.slice(0, 3).map((player, index) => (
              <TopBoxLeague player={player} title="goals" index={index} />
            ))}
          </div>
        </article>
      </section>
    </section>
  );
};

export default League;
