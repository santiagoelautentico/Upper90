import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BoxHeaderMatch from "../components/BoxHeaderMatch";
import AreasLineups from "../components/AreasLineups";
import MatchLineup from "../components/MatchLineup";
import Statistics from "../components/Statistics";
const Match = () => {
  const [match, setMatch] = useState([]);
  const [lineups, setLineups] = useState([]);
  const [matchStatsHome, setMatchStatsHome] = useState([]);
  const [matchStatsAway, setMatchStatsAway] = useState([]);
  const [slider, setSlider] = useState("lineup");
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:1234/match/${id}`)
      .then((response) => response.json())
      .then((data) => {
        const matchData = data[0];
        setMatch(matchData);
        console.log(matchData, "match");
      });
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:1234/match/${id}/lineups`)
      .then((response) => response.json())
      .then((data) => {
        setLineups(data);
      });
  }, [id]);

  

  useEffect(() => {
    if (!match.homeTeamId || !match.awayTeamId) return;

    const fetchStats = async (teamId, setStats) => {
      const res = await fetch(
        `http://localhost:1234/match/${id}/stats/${teamId}`
      );
      const data = await res.json();
      setStats(data);
    };

    fetchStats(match.homeTeamId, setMatchStatsHome);
    fetchStats(match.awayTeamId, setMatchStatsAway);
  }, [id, match.homeTeamId, match.awayTeamId]);
  console.log(matchStatsAway, "matchStatsHome");

  const startingH = lineups.filter(
    (lineup) => lineup.isStarting === 1 && lineup.teamId === match.homeTeamId
  );
  const startingA = lineups.filter(
    (lineup) => lineup.isStarting === 1 && lineup.teamId === match.awayTeamId
  );

  useEffect(() => {
  if (!match.homeTeamId || !match.awayTeamId) {
    console.log("No hay team IDs aún");
    return;
  }
}, [match.homeTeamId, match.awayTeamId]);
  return (
    <section className="matchPage-container">
      {matchStatsHome && matchStatsAway ? (
        <BoxHeaderMatch
          match={match}
          statsHome={matchStatsHome}
          statsAway={matchStatsAway}
        />
      ) : (
        <BoxHeaderMatch match={match} />
      )}
      {startingA.length > 0 && startingH.length > 0 ? (
        <>
          <div className="slider-match-container">
            <div
              className={`slider-container ${
                slider === "lineup" ? "slider-active activeLeft" : "slider-offL"
              }`}
              onClick={() => setSlider("lineup")}
            >
              <h2>LINEUP</h2>
            </div>
            <div
              className={`slider-container ${
                slider === "stats" ? "slider-active activeRigth" : "slider-offR"
              }`}
              onClick={() => setSlider("stats")}
            >
              <h2>STATISTICS</h2>
            </div>
          </div>
          <article
            className={`${
              slider === "lineup"
                ? "lineups-container"
                : "match-stats-container"
            }`}
          >
            {slider === "lineup" ? (
              <>
                <MatchLineup starting={startingH} teamType="home" />
                <MatchLineup starting={startingA} teamType="away" />
                <AreasLineups />
              </>
            ) : slider === "stats" ? (
              <>
                <Statistics stats={matchStatsHome} teamType="home" />
                <div className="match-stats-middle">
                  <h2 className="title-statiscs">Statiscs by team</h2>
                  <ul>
                    <li>Shoots</li>
                    <li>Shoots on target</li>
                    <li>Corners</li>
                    <li>Possession</li>
                    <li>Fouls</li>
                    <li>Yellow Cards</li>
                    <li>Red Cards</li>
                  </ul>
                </div>
                <Statistics stats={matchStatsAway} teamType="away" />
              </>
            ) : null}
          </article>
        </>
      ) : (
        <article>
          <h2>Proximamente</h2>
        </article>
      )}
    </section>
  );
};

export default Match;
