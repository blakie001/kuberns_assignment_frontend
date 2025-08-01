import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Step1BasicDetails from './Step1/Step1BasicDetails';
import Step2Environment from './Step2/Step2Environment';

export default function CreateApp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    template: '',
    plan: 'starter',
    region: 'ap-south-1',
    githubOrg: '',
    githubRepo: '',
    githubBranch: 'main',
    environments: [{
      branch: 'main',
      port: 3000,
      variables: []
    }]
  });

  const nextStep = () => setCurrentStep(2);
  const prevStep = () => setCurrentStep(1);

  const handleChange = (name, value) => {
    setFormData(prev => {
      const updated = { ...prev, [name]: value };
      if (name === 'githubBranch') {
        updated.environments = [{
          ...updated.environments[0],
          branch: value
        }];
      }
      return updated;
    });
  };

  const handleEnvVariablesChange = (variables) => {
    setFormData(prev => ({
      ...prev,
      environments: [{ ...prev.environments[0], variables }]
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const response = await fetch('http://127.0.0.1:8000/webapp/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to create application');
      }

      const data = await response.json();

      // Redirect to the check_status_url provided by the backend
      if (data.check_status_url) {
        window.location.href = data.check_status_url;
      } else {
        throw new Error('No status URL received from server');
      }

    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <Navbar />

      {submitError && (
        <div className="app-details-outer-container">
          <div className="error-container" style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #fca5a5',
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1rem',
            color: '#dc2626'
          }}>
            <strong>Error:</strong> {submitError}
          </div>
        </div>
      )}

      {currentStep === 1 && (
        <Step1BasicDetails
          formData={formData}
          handleChange={handleChange}
          nextStep={nextStep}
        />
      )}

      {currentStep === 2 && (
        <Step2Environment
          formData={formData}
          handleEnvVariablesChange={handleEnvVariablesChange}
          prevStep={prevStep}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  );
}