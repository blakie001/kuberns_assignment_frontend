import React, { useState, useEffect } from 'react';
import "./step2.css";
import { FaArrowLeft } from 'react-icons/fa';
import CreateNewApp from '../../../components/CreateNewApp/CreateNewApp';
import PortConfigure from '../../../components/Step2Components/PortConfigure/PortConfigure';
import ConfigureEnv from '../../../components/Step2Components/ConfigureEnv/ConfigureEnv';

export default function Step2Environment({
  formData,
  handleEnvVariablesChange,
  prevStep,
  handleSubmit,
  isSubmitting
}) {
  const [variables, setVariables] = useState(formData.environments[0].variables || []);

  // Sync variables when formData changes
  useEffect(() => {
    setVariables(formData.environments[0].variables || []);
  }, [formData.environments]);

  const handleAddVariable = (newVar) => {
    const updatedVariables = [...variables, newVar];
    setVariables(updatedVariables);
    handleEnvVariablesChange(updatedVariables);
  };

  const handleUpdateVariable = (index, updatedVar) => {
    const updatedVariables = [...variables];
    updatedVariables[index] = updatedVar;
    setVariables(updatedVariables);
    handleEnvVariablesChange(updatedVariables);
  };

  const handleRemoveVariable = (index) => {
    const updatedVariables = variables.filter((_, i) => i !== index);
    setVariables(updatedVariables);
    handleEnvVariablesChange(updatedVariables);
  };

  // Check if all existing variables have valid key-value pairs
  const hasInvalidVariables = variables.some(v => !v.key || !v.value || v.key.trim() === '' || v.value.trim() === '');

  const handleFormSubmit = async () => {
    // Final validation before submit
    if (hasInvalidVariables) {
      alert('Please ensure all environment variables have both key and value filled.');
      return;
    }

    await handleSubmit();
  };

  return (
    <div className="app-details-outer-container">
      <CreateNewApp />

      <PortConfigure
        port={formData.environments[0].port}
      />

      <div className="app-details-outer-container"></div>

      <ConfigureEnv
        variables={variables}
        onAddVariable={handleAddVariable}
        onUpdateVariable={handleUpdateVariable}
        onRemoveVariable={handleRemoveVariable}
        branch={formData.githubBranch} // Pass the branch for display
      />


      <div className="step2-footer-button-container">
        <button
          className="step2-submit-btn"
          onClick={handleFormSubmit}
          disabled={isSubmitting || hasInvalidVariables}
          style={{
            opacity: (isSubmitting || hasInvalidVariables) ? 0.5 : 1,
            cursor: (isSubmitting || hasInvalidVariables) ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? (
            <>
              <span>Creating Application...</span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ animation: 'spin 1s linear infinite' }}
              >
                <path d="M21 12a9 9 0 11-6.219-8.56" />
              </svg>
            </>
          ) : (
            'Finish my Setup 🎉'
          )}
        </button>
      </div>

      {/* Validation Warning */}
      {hasInvalidVariables && (
        <div style={{
          backgroundColor: '#fef3cd',
          border: '1px solid #fbbf24',
          borderRadius: '6px',
          padding: '0.75rem',
          margin: '1rem 0',
          color: '#92400e',
          fontSize: '0.875rem'
        }}>
          ⚠️ Please ensure all environment variables have both key and value filled before proceeding.
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}