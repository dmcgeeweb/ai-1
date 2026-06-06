import React, { useState, useEffect } from 'react';
import './App.css';
import { matchesData } from './data/matches';
import { Match } from './types';
import MatchCard from './components/MatchCard';
import MatchDetail from './components/MatchDetail';

export default function App() {
  const [matches] = useState<Match[]>(matchesData);
  const [selectedId, setSelectedId] = useState<number>(1);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectedMatch = matches.find(m => m.id === selectedId) || matches[0];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <div className="logo">
            <span className="logo-gaa">GAA</span>
            <span className="logo-live">Live</span>
          </div>
          <span className="competition-name">All-Ireland Senior Football Championship 2026</span>
        </div>
        <div className="header-right">
          <span className="live-clock">
            {currentTime.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </span>
        </div>
      </header>

      <main className="app-body">
        <aside className="sidebar">
          <h2 className="sidebar-title">Fixtures & Results</h2>
          <div className="match-list">
            {matches.map(match => (
              <MatchCard
                key={match.id}
                match={match}
                isSelected={match.id === selectedId}
                onClick={() => setSelectedId(match.id)}
              />
            ))}
          </div>
        </aside>

        <section className="main-content">
          <MatchDetail match={selectedMatch} />
        </section>
      </main>

      <footer className="app-footer">
        <span>GAA Live Score Centre — All-Ireland Senior Football Championship 2026</span>
      </footer>
    </div>
  );
}
