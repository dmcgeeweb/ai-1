import React, { useState } from 'react';
import { Match } from '../types';
import ScoreBoard from './ScoreBoard';
import EventTimeline from './EventTimeline';
import SquadList from './SquadList';

interface Props {
  match: Match;
}

type Tab = 'events' | 'squads' | 'stats';

function StatBar({ label, home, away, homeColor }: { label: string; home: number; away: number; homeColor: string }) {
  const total = home + away || 1;
  const homeWidth = Math.round((home / total) * 100);
  const awayWidth = 100 - homeWidth;
  return (
    <div className="stat-row">
      <span className="stat-value">{home}</span>
      <div className="stat-bar-wrap">
        <div className="stat-label">{label}</div>
        <div className="stat-bar">
          <div className="stat-bar-home" style={{ width: `${homeWidth}%`, background: homeColor }} />
          <div className="stat-bar-away" style={{ width: `${awayWidth}%` }} />
        </div>
      </div>
      <span className="stat-value">{away}</span>
    </div>
  );
}

function Stats({ match }: { match: Match }) {
  const h = match.homeTeam;
  const a = match.awayTeam;

  const homeScorers = h.players.filter(p => p.goals > 0 || p.points > 0);
  const awayScorers = a.players.filter(p => p.goals > 0 || p.points > 0);

  const homeYellow = h.players.reduce((acc, p) => acc + p.cards.filter(c => c === 'yellow').length, 0);
  const awayYellow = a.players.reduce((acc, p) => acc + p.cards.filter(c => c === 'yellow').length, 0);
  const homeBlack = h.players.reduce((acc, p) => acc + p.cards.filter(c => c === 'black').length, 0);
  const awayBlack = a.players.reduce((acc, p) => acc + p.cards.filter(c => c === 'black').length, 0);
  const homeRed = h.players.reduce((acc, p) => acc + p.cards.filter(c => c === 'red').length, 0);
  const awayRed = a.players.reduce((acc, p) => acc + p.cards.filter(c => c === 'red').length, 0);

  return (
    <div className="stats-panel">
      <div className="scorers-grid">
        <div className="scorers-col">
          <h4 style={{ color: h.color }}>{h.name} Scorers</h4>
          {homeScorers.length === 0 && <p className="no-scorers">No scorers yet</p>}
          {homeScorers.map(p => (
            <div key={p.id} className="scorer-item">
              <span className="scorer-number">{p.number}</span>
              <span className="scorer-name">{p.name}</span>
              <span className="scorer-tally">
                {p.goals > 0 && <span className="tally-g">{p.goals}-</span>}
                <span className="tally-p">{p.points}</span>
              </span>
            </div>
          ))}
        </div>
        <div className="scorers-col">
          <h4 style={{ color: a.color }}>{a.name} Scorers</h4>
          {awayScorers.length === 0 && <p className="no-scorers">No scorers yet</p>}
          {awayScorers.map(p => (
            <div key={p.id} className="scorer-item">
              <span className="scorer-number">{p.number}</span>
              <span className="scorer-name">{p.name}</span>
              <span className="scorer-tally">
                {p.goals > 0 && <span className="tally-g">{p.goals}-</span>}
                <span className="tally-p">{p.points}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="stats-bars">
        <StatBar label="Goals" home={h.goals} away={a.goals} homeColor={h.color} />
        <StatBar label="Points" home={h.points} away={a.points} homeColor={h.color} />
        <StatBar label="Yellow Cards" home={homeYellow} away={awayYellow} homeColor={h.color} />
        <StatBar label="Black Cards" home={homeBlack} away={awayBlack} homeColor={h.color} />
        <StatBar label="Red Cards" home={homeRed} away={awayRed} homeColor={h.color} />
      </div>
    </div>
  );
}

export default function MatchDetail({ match }: Props) {
  const [tab, setTab] = useState<Tab>('events');

  return (
    <div className="match-detail">
      <ScoreBoard match={match} />

      <div className="tab-bar">
        <button
          className={`tab-btn ${tab === 'events' ? 'active' : ''}`}
          onClick={() => setTab('events')}
        >
          Events
        </button>
        <button
          className={`tab-btn ${tab === 'stats' ? 'active' : ''}`}
          onClick={() => setTab('stats')}
        >
          Stats & Scorers
        </button>
        <button
          className={`tab-btn ${tab === 'squads' ? 'active' : ''}`}
          onClick={() => setTab('squads')}
        >
          Squads
        </button>
      </div>

      <div className="tab-content">
        {tab === 'events' && (
          match.status === 'upcoming'
            ? <div className="upcoming-message">Match not yet started. Check back at throw-in!</div>
            : <EventTimeline match={match} />
        )}
        {tab === 'stats' && <Stats match={match} />}
        {tab === 'squads' && (
          <div className="squads-grid">
            <SquadList team={match.homeTeam} />
            <SquadList team={match.awayTeam} />
          </div>
        )}
      </div>
    </div>
  );
}
