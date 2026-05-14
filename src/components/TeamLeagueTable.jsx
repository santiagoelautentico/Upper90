import React from 'react';

const TeamLeagueTable = ({ team }) => {
    return (
      <div className="table-team-container">
        <p>{team.position}</p>
        <div className="table-team-name">
          <img
            className="table-team-logo"
            src={team.picture_url}
            alt={team.team_name}
          />
          <p>{team.team_name}</p>
        </div>
        <p>{team.matches_played}</p>
        <p>{team.wins}</p>
        <p>{team.draws}</p>
        <p>{team.losses}</p>
        <p>{team.goals_for}</p>
        <p>{team.goals_against}</p>
        <p className='points'>{team.points}</p>
      </div>
    );
};

export default TeamLeagueTable;