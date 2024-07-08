import React, { useState, useEffect } from 'react';
import { TonConnectButton } from '@tonconnect/ui-react';
import Project from './Project';
import './App.css';

function App() {
  const [username, setUsername] = useState('[username]');
  const [boostPoints, setBoostPoints] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUsername(user.username || user.first_name || '[username]');
      }
    }
  }, []);

  const projectsData = [
    {
      name: "Decentralized Energy Grid",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Our project aims to create a decentralized energy grid using blockchain technology. This will allow for more efficient energy distribution, reduced costs, and increased use of renewable energy sources.",
      deadline: "2023-12-31",
      fundingGoal: 100000,
      currentFunding: 75000,
      backers: 1250
    },
    {
      name: "Sustainable Agriculture Platform",
      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "We're developing a blockchain-based platform to connect local farmers with consumers, promoting sustainable agriculture and reducing food waste in the supply chain.",
      deadline: "2024-03-15",
      fundingGoal: 50000,
      currentFunding: 30000,
      backers: 750
    },
    {
      name: "Decentralized Identity Solution",
      image: "https://images.unsplash.com/photo-1508061501437-e1b984a4d665?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      description: "Our team is creating a decentralized identity solution that gives users full control over their personal data while providing secure and easy authentication for various services.",
      deadline: "2024-06-30",
      fundingGoal: 75000,
      currentFunding: 25000,
      backers: 500
    }
  ];

  const navigateProject = (direction) => {
    if (direction === 'left' && currentProjectIndex > 0) {
      setCurrentProjectIndex(currentProjectIndex - 1);
    } else if (direction === 'right' && currentProjectIndex < projectsData.length - 1) {
      setCurrentProjectIndex(currentProjectIndex + 1);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="logo">BOOST</h1>
        <div className="sub-header">
          <div className="user-info">
            <span className="username">{username}</span>
            <span className="boost-score">{boostPoints} BOOST Points</span>
          </div>
          <TonConnectButton />
        </div>
      </header>
      <main>
        <Project {...projectsData[currentProjectIndex]} />
      </main>
      <nav className="navigation-bar">
        <button 
          onClick={() => navigateProject('left')} 
          disabled={currentProjectIndex === 0}
          className="nav-button"
        >
          &#8592; {/* Left arrow */}
        </button>
        <div className="navigation-dots">
          {projectsData.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentProjectIndex ? 'active' : ''}`}
              onClick={() => setCurrentProjectIndex(index)}
            ></span>
          ))}
        </div>
        <button 
          onClick={() => navigateProject('right')} 
          disabled={currentProjectIndex === projectsData.length - 1}
          className="nav-button"
        >
          &#8594; {/* Right arrow */}
        </button>
      </nav>
    </div>
  );
}

export default App;