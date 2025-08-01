import React from 'react';
import './createNewApp.css';

const CreateNewApp = () => {
  return (
    <div className="create-new-app-container">
      <div className="create-new-app-content">
        <h2 className="create-new-app-title">Create New App</h2>
        <p className="create-new-app-subtitle">
          Connect your repository and fill in the requirements to see the app deployed in seconds.
        </p>
      </div>
      <div className="create-new-app-progress">
        <div className="progress-step active">1</div>
        <div className="progress-line"></div>
        <div className="progress-step">2</div>
      </div>
    </div>
  );
};

export default CreateNewApp;
