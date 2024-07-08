import React from 'react';

const Project = ({ name, image, description, deadline, fundingGoal, currentFunding, backers }) => {
  const daysLeft = Math.ceil((new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24));
  const progress = (currentFunding / fundingGoal) * 100;

  return (
    <div className="project">
      <div className="project-image-container">
        <img src={image} alt={name} className="project-image" />
        <span className="days-left">{daysLeft} days left</span>
        <div className="project-header">
          <h2>{name}</h2>
        </div>
      </div>
      <p className="project-description">{description}</p>
      <div className="project-funding">
        <div className="funding-stats">
          <span className="boosters">{backers} Boosters</span>
          <span className="funding-goal">GOAL: {fundingGoal} TON</span>
        </div>
        <div className="progress-bar">
          <div className="progress" style={{ width: `${progress}%` }}></div>
          <span className="progress-text">{progress.toFixed(2)}%</span>
        </div>
      </div>
      <div className="support-section">
        <p className="support-header">I want to BOOST this project</p>
        <button className="support-button">1 TON</button>
        <p className="reward">Reward: Thank you<br />Get +100 BOOST Points</p>
      </div>
      <p className="boost-description">BOOST Points will be added to your profile immediately</p>
    </div>
  );
};

export default Project;