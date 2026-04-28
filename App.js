import React, { useState } from 'react';
import './Pharaoh.css';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('October');

  return (
    <div className="temple-container">
      <header className="gold-header">
        <h1>CHRONICLES OF ELKORASHY</h1>
        <div className="cartouche-id">ID: AK-4921</div>
      </header>

      <nav className="lapis-tabs">
        {['October', 'November', 'December'].map(m => (
          <button 
            className={activeTab === m ? 'tab active' : 'tab'} 
            onClick={() => setActiveTab(m)}
          >
            {m}
          </button>
        ))}
      </nav>

      <main className="papyrus-content">
        <div className="lecture-card">
          <h3>Lecture 05: The French Campaign</h3>
          <div className="status-badge">
            {/* Logic: If center student, show remaining watches */}
            Remaining Watches: 2/3
          </div>
          <button className="play-btn">Enter Lesson</button>
        </div>
      </main>
      
      {/* Teacher's Wallet Display (Only if unpaid) */}
      <footer className="payment-footer">
        <p>Support the Ministry: Send fees to Vodafone Cash: 010XXXXXXXX</p>
      </footer>
    </div>
  );
};