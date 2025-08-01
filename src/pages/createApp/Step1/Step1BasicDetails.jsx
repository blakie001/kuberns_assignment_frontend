import React, { useState } from 'react';
import CreateNewApp from '../../../components/CreateNewApp/CreateNewApp';
import VersionControl from '../../../components/Step1Components/VersionControl/versionControl';
import Details from '../../../components/Step1Components/Details/Details';
import "./step1.css"
import Database from '../../../components/Step1Components/Database/Database';
import { FiAlertCircle } from 'react-icons/fi';

export default function Step1BasicDetails({ formData, handleChange, nextStep }) {
  const [validationErrors, setValidationErrors] = useState({
    name: false,
    template: false,
    githubOrg: false,
    githubRepo: false,
    githubBranch: false
  });

  const validateStep1 = () => {
    const errors = {
      name: !formData.name || formData.name.trim() === '',
      template: !formData.template || formData.template.trim() === '',
      githubOrg: !formData.githubOrg || formData.githubOrg.trim() === '',
      githubRepo: !formData.githubRepo || formData.githubRepo.trim() === '',
      githubBranch: !formData.githubBranch || formData.githubBranch.trim() === ''
    };
    
    setValidationErrors(errors);
    return !Object.values(errors).some(Boolean);
  };

  const handleNextClick = (e) => {
    e.preventDefault();
    if (validateStep1()) {
      nextStep();
    }
  };

  const isFormValid = () => {
    return formData.name && 
           formData.template && 
           formData.githubOrg && 
           formData.githubRepo && 
           formData.githubBranch;
  };

  return (
    <div className="app-details-outer-container">
      <CreateNewApp />

      <VersionControl 
        selected="github"
        formData={formData}
        onChange={handleChange}
        errors={validationErrors}
      />

      <div className="app-details-outer-container"></div>

      <Details 
        appName={formData.name}
        region={formData.region}
        template={formData.template}
        onAppNameChange={(value) => handleChange('name', value)}
        onRegionChange={(value) => handleChange('region', value)}
        onTemplateChange={(value) => handleChange('template', value)}
        errors={validationErrors}
      />
      
      <div className="app-details-outer-container"></div>

      <Database selected="starter" />

      <div className="db-footer-button-container">
        <button 
          className="db-set-env-btn"
          onClick={handleNextClick}
          disabled={!isFormValid()}
          style={{
            opacity: isFormValid() ? 1 : 0.5,
            cursor: isFormValid() ? 'pointer' : 'not-allowed'
          }}
        >
          Set Up Env Variables
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      {(validationErrors.name || validationErrors.template || 
        validationErrors.githubOrg || validationErrors.githubRepo || 
        validationErrors.githubBranch) && (
        <div className="step1-error-message">
          <FiAlertCircle /> Please fill in all required fields
        </div>
      )}
    </div>
  );
}