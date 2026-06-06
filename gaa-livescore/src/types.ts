export type CardType = 'yellow' | 'black' | 'red';
export type EventType = 'goal' | 'point' | 'card' | 'substitution' | 'kickoff' | 'halftime' | 'fulltime' | 'penalty_miss' | 'wide';
export type MatchStatus = 'upcoming' | 'live' | 'halftime' | 'fulltime' | 'extra_time';

export interface Player {
  id: number;
  number: number;
  name: string;
  position: string;
  goals: number;
  points: number;
  cards: CardType[];
  isOnField: boolean;
  isSubstitute: boolean;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  county: string;
  color: string;
  secondaryColor: string;
  textColor: string;
  goals: number;
  points: number;
  players: Player[];
}

export interface MatchEvent {
  id: number;
  minute: number;
  extraTime?: number;
  type: EventType;
  teamId: string;
  playerId?: number;
  playerInId?: number;
  playerOutId?: number;
  cardType?: CardType;
  description: string;
}

export interface Match {
  id: number;
  homeTeam: Team;
  awayTeam: Team;
  status: MatchStatus;
  minute: number;
  extraTime: number;
  stage: string;
  venue: string;
  date: string;
  events: MatchEvent[];
}
