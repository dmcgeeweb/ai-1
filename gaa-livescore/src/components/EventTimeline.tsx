import React from 'react';
import { Match, MatchEvent, Player } from '../types';

interface Props {
  match: Match;
}

function getPlayer(match: Match, teamId: string, playerId?: number): Player | undefined {
  if (!playerId) return undefined;
  const team = teamId === match.homeTeam.id ? match.homeTeam : match.awayTeam;
  return team.players.find(p => p.id === playerId);
}

function EventIcon({ event }: { event: MatchEvent }) {
  switch (event.type) {
    case 'goal':
      return <span className="event-icon goal-icon">⚽</span>;
    case 'point':
      return <span className="event-icon point-icon">🏳️</span>;
    case 'card':
      if (event.cardType === 'red') return <span className="event-icon card-icon red-card-icon">🟥</span>;
      if (event.cardType === 'black') return <span className="event-icon card-icon black-card-icon">⬛</span>;
      return <span className="event-icon card-icon yellow-card-icon">🟨</span>;
    case 'substitution':
      return <span className="event-icon sub-icon">🔄</span>;
    case 'kickoff':
      return <span className="event-icon kickoff-icon">🏈</span>;
    case 'halftime':
      return <span className="event-icon halftime-icon">⏸️</span>;
    case 'fulltime':
      return <span className="event-icon fulltime-icon">🏁</span>;
    default:
      return <span className="event-icon">•</span>;
  }
}

function EventItem({ event, match }: { event: MatchEvent; match: Match }) {
  const isHome = event.teamId === match.homeTeam.id;
  const player = getPlayer(match, event.teamId, event.playerId);
  const playerIn = event.playerInId ? getPlayer(match, event.teamId, event.playerInId) : undefined;
  const playerOut = event.playerOutId ? getPlayer(match, event.teamId, event.playerOutId) : undefined;

  const isSystem = event.type === 'kickoff' || event.type === 'halftime' || event.type === 'fulltime';

  if (isSystem) {
    return (
      <div className="event-item system-event">
        <EventIcon event={event} />
        <span className="event-desc">{event.description}</span>
        <span className="event-minute">{event.minute}'</span>
      </div>
    );
  }

  return (
    <div className={`event-item ${isHome ? 'home-event' : 'away-event'}`}>
      {isHome ? (
        <>
          <div className="event-content home-content">
            <EventIcon event={event} />
            <div className="event-info">
              {player && <span className="event-player">{player.number}. {player.name}</span>}
              {event.type === 'substitution' && playerIn && playerOut && (
                <span className="event-player">
                  ↑ {playerIn.number}. {playerIn.name} / ↓ {playerOut.number}. {playerOut.name}
                </span>
              )}
              <span className="event-desc-small">{event.description}</span>
            </div>
          </div>
          <span className="event-minute">{event.minute}'</span>
          <div className="event-spacer" />
        </>
      ) : (
        <>
          <div className="event-spacer" />
          <span className="event-minute">{event.minute}'</span>
          <div className="event-content away-content">
            <div className="event-info text-right">
              {player && <span className="event-player">{player.number}. {player.name}</span>}
              {event.type === 'substitution' && playerIn && playerOut && (
                <span className="event-player">
                  ↑ {playerIn.number}. {playerIn.name} / ↓ {playerOut.number}. {playerOut.name}
                </span>
              )}
              <span className="event-desc-small">{event.description}</span>
            </div>
            <EventIcon event={event} />
          </div>
        </>
      )}
    </div>
  );
}

export default function EventTimeline({ match }: Props) {
  const sorted = [...match.events].sort((a, b) => b.minute - a.minute);

  return (
    <div className="timeline">
      <h3 className="section-title">Match Events</h3>
      <div className="timeline-header">
        <span>{match.homeTeam.name}</span>
        <span>Time</span>
        <span>{match.awayTeam.name}</span>
      </div>
      <div className="events-list">
        {sorted.map(event => (
          <EventItem key={event.id} event={event} match={match} />
        ))}
      </div>
    </div>
  );
}
