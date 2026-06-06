import React from 'react';
import { Team, Player, CardType } from '../types';

interface Props {
  team: Team;
}

function CardBadge({ card }: { card: CardType }) {
  const label = card === 'yellow' ? '🟨' : card === 'black' ? '⬛' : '🟥';
  return <span className={`card-badge ${card}-card`} title={`${card} card`}>{label}</span>;
}

function ScoreTally({ player }: { player: Player }) {
  if (player.goals === 0 && player.points === 0) return null;
  return (
    <span className="score-tally">
      {player.goals > 0 && <span className="tally-goals">{player.goals}G</span>}
      {player.points > 0 && <span className="tally-points">{player.points}P</span>}
    </span>
  );
}

function PlayerRow({ player, teamColor, teamTextColor }: { player: Player; teamColor: string; teamTextColor: string }) {
  const isSub = player.isSubstitute && !player.isOnField;
  const isActive = player.isOnField;

  return (
    <div className={`player-row ${isSub ? 'substitute-row' : ''} ${!isActive && !isSub ? 'off-field' : ''}`}>
      <div
        className="jersey-number"
        style={isActive ? { background: teamColor, color: teamTextColor } : {}}
      >
        {player.number}
      </div>
      <div className="player-info">
        <span className="player-name">{player.name}</span>
        <span className="player-position">{player.position}</span>
      </div>
      <div className="player-status">
        <ScoreTally player={player} />
        {player.cards.map((card, i) => (
          <CardBadge key={i} card={card} />
        ))}
        {player.isSubstitute && player.isOnField && (
          <span className="sub-on-badge">SUB ↑</span>
        )}
        {!player.isOnField && !player.isSubstitute && (
          <span className="off-badge">OFF</span>
        )}
      </div>
    </div>
  );
}

export default function SquadList({ team }: Props) {
  const starters = team.players.filter(p => !p.isSubstitute);
  const subs = team.players.filter(p => p.isSubstitute);

  return (
    <div className="squad-list">
      <div className="squad-header" style={{ background: team.color, color: team.textColor }}>
        <span className="squad-title">{team.name}</span>
        <span className="squad-county">{team.county}</span>
      </div>

      <div className="players-section">
        <h4 className="players-section-title"># Starting XV</h4>
        {starters.map(player => (
          <PlayerRow
            key={player.id}
            player={player}
            teamColor={team.color}
            teamTextColor={team.textColor}
          />
        ))}
      </div>

      <div className="players-section">
        <h4 className="players-section-title">Substitutes</h4>
        {subs.map(player => (
          <PlayerRow
            key={player.id}
            player={player}
            teamColor={team.color}
            teamTextColor={team.textColor}
          />
        ))}
      </div>
    </div>
  );
}
