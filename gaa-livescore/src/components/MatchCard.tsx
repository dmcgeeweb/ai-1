import React from 'react';
import { Match } from '../types';

interface Props {
  match: Match;
  isSelected: boolean;
  onClick: () => void;
}

function formatScore(goals: number, points: number) {
  return `${goals}-${String(points).padStart(2, '0')}`;
}

function StatusPill({ match }: { match: Match }) {
  if (match.status === 'live') {
    return <span className="pill live-pill"><span className="live-dot-sm" />{match.minute}'</span>;
  }
  if (match.status === 'halftime') return <span className="pill ht-pill">HT</span>;
  if (match.status === 'fulltime') return <span className="pill ft-pill">FT</span>;
  return <span className="pill upcoming-pill">KO {match.date.slice(5)}</span>;
}

export default function MatchCard({ match, isSelected, onClick }: Props) {
  const { homeTeam, awayTeam } = match;
  const isUpcoming = match.status === 'upcoming';

  return (
    <div
      className={`match-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="match-card-stage">{match.stage}</div>
      <div className="match-card-row">
        <div className="match-card-team">
          <div className="team-color-dot" style={{ background: homeTeam.color }} />
          <span className="match-card-name">{homeTeam.name}</span>
        </div>
        {!isUpcoming && (
          <span className="match-card-score">
            {formatScore(homeTeam.goals, homeTeam.points)}
          </span>
        )}
      </div>
      <div className="match-card-row">
        <div className="match-card-team">
          <div className="team-color-dot" style={{ background: awayTeam.color }} />
          <span className="match-card-name">{awayTeam.name}</span>
        </div>
        {!isUpcoming && (
          <span className="match-card-score">
            {formatScore(awayTeam.goals, awayTeam.points)}
          </span>
        )}
      </div>
      <div className="match-card-footer">
        <StatusPill match={match} />
        <span className="match-card-venue">{match.venue.split(',')[0]}</span>
      </div>
    </div>
  );
}
