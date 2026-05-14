const BoxHeaderMatch = ({ match, statsHome, statsAway }) => {
  console.log(statsHome, "statsHome");
  
  // Extraer estadísticas de forma segura
  const homeStats = statsHome?.[0] || {};
  const awayStats = statsAway?.[0] || {};
  
  const goalsAway = awayStats.goals || match.awayScore || 0;
  const goalsHome = homeStats.goals || match.homeScore || 0;
  
  return (
    <header className="box-header-match">
      <div className="header-match-team">
        <div>
          <img className="header-logo-match" src={match.homeTeamLogo} alt="" />
          <h4 className="header-Match-TeamNames">{match.homeTeamName}</h4>
        </div>
      </div>
      <div className="score-matchPage">
        <div className="stadium-match">
          <p>Stadium</p>
          <h3>{match.stadium}</h3>
        </div>
        <h2>
          {match.homeScore} - {match.awayScore}
        </h2>
      </div>
      <div className="header-match-team">
        <div>
          <img className="header-logo-match" src={match.awayTeamLogo} alt="" />
          <h4 className="header-Match-TeamNames">{match.awayTeamName}</h4>
        </div>
      </div>
      {/* {statsHome?.length > 0 && (
        <p className="headerGoals homeHeaderGoals">{goalsHome}</p>
      )}
      {statsAway?.length > 0 && (
        <p className="headerGoals awayHeaderGoals">{goalsAway}</p>
      )} */}
    </header>
  );
};

export default BoxHeaderMatch;