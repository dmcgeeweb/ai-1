import React from 'react';
import { Match } from '../types';

interface Props {
  match: Match;
}

function formatScore(goals: number, points: number) {
  return `${goals}-${String(points).padStart(2, '0')}`;
}

function totalPoints(goals: number, points: number) {
  return goals * 3 + points;
}

function StatusBadge({ match }: { match: Match }) {
  if (match.status === 'live') {
    return (
      <span className="status-badge live">
        <span className="live-dot" />
        {match.minute}'
      </span>
    );
  }
  if (match.status === 'halftime') {
    return <span className="status-badge halftime">Half Time</span>;
  }
  if (match.status === 'fulltime') {
    return <span className="status-badge fulltime">Full Time</span>;
  }
  if (match.status === 'upcoming') {
    return <span className="status-badge upcoming">{match.date}</span>;
  }
  return null;
}

export default function ScoreBoard({ match }: Props) {
  const { homeTeam, awayTeam } = match;
  const isUpcoming = match.status === 'upcoming';

  return (
    <div className="scoreboard">
      <div className="match-meta">
        <span className="stage">{match.stage}</span>
        <StatusBadge match={match} />
      </div>
      <div className="teams-row">
        <div className="team home-team">
          <div
            className="team-badge"
            style={{ background: homeTeam.color, color: homeTeam.textColor }}
          >
            {homeTeam.shortName}
          </div>
          <span className="team-name">{homeTeam.name}</span>
          {!isUpcoming && (
            <div className="score">
              <span className="score-main">{formatScore(homeTeam.goals, homeTeam.points)}</span>
              <span className="score-total">({totalPoints(homeTeam.goals, homeTeam.points)})</span>
            </div>
          )}
        </div>

        <div className="vs-divider">
          {isUpcoming ? <span className="vs-text">VS</span> : <span className="vs-text">–</span>}
          <span className="venue">{match.venue}</span>
        </div>

        <div className="team away-team">
          {!isUpcoming && (
            <div className="score">
              <span className="score-main">{formatScore(awayTeam.goals, awayTeam.points)}</span>
              <span className="score-total">({totalPoints(awayTeam.goals, awayTeam.points)})</span>
            </div>
          )}
          <span className="team-name">{awayTeam.name}</span>
          <div
            className="team-badge"
            style={{ background: awayTeam.color, color: awayTeam.textColor }}
          >
            {awayTeam.shortName}
          </div>
        </div>
      </div>
    </div>
  );
}
