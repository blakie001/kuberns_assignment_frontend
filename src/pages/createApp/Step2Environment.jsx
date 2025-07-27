import React from 'react';

const Step2Environment = ({ formData, setFormData, onBack, onFinish, isDeploying }) => {
  const handleEnvVarChange = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      envVars: prev.envVars.map(envVar =>
        envVar.id === id ? { ...envVar, [field]: value } : envVar
      )
    }));
  };

  const handleEnvVarEdit = (id) => {
    setFormData(prev => ({
      ...prev,
      envVars: prev.envVars.map(envVar =>
        envVar.id === id ? { ...envVar, editing: !envVar.editing } : envVar
      )
    }));
  };

  const handleEnvVarDelete = (id) => {
    setFormData(prev => ({
      ...prev,
      envVars: prev.envVars.filter(envVar => envVar.id !== id)
    }));
  };

  const addNewEnvVar = () => {
    const newId = Math.max(...formData.envVars.map(v => v.id), 0) + 1;
    setFormData(prev => ({
      ...prev,
      envVars: [...prev.envVars, { id: newId, key: '', value: '', editing: true }]
    }));
  };

  const handleInstanceConfigChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      instanceConfig: {
        ...prev.instanceConfig,
        [field]: value
      }
    }));
  };

  return (
    <>
      {/* Instance Configuration */}
      <div className="section">
        <h2 className="section-title">Instance Configuration</h2>
        <p className="section-description">
          Configure the compute resources for your application instance. These settings determine the performance and capacity of your deployed application.
        </p>

        <div className="details-content">
          <div className="form-grid">
            <div className="form-field">
              <label className="field-label">
                <span className="field-icon">💾</span>
                CPU (vCPUs) *
              </label>
              <select
                name="cpu"
                value={formData.instanceConfig.cpu}
                onChange={(e) => handleInstanceConfigChange('cpu', parseInt(e.target.value))}
                className="env-input"
                required
              >
                <option value="">Select CPU</option>
                <option value="1">1 vCPU</option>
                <option value="2">2 vCPUs</option>
                <option value="4">4 vCPUs</option>
                <option value="8">8 vCPUs</option>
              </select>
              <div className="field-sublabel">Number of virtual CPUs</div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon">🧠</span>
                Memory (GB) *
              </label>
              <select
                name="memory"
                value={formData.instanceConfig.memory}
                onChange={(e) => handleInstanceConfigChange('memory', parseInt(e.target.value))}
                className="env-input"
                required
              >
                <option value="">Select Memory</option>
                <option value="1">1 GB</option>
                <option value="2">2 GB</option>
                <option value="4">4 GB</option>
                <option value="8">8 GB</option>
                <option value="16">16 GB</option>
              </select>
              <div className="field-sublabel">Amount of RAM memory</div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon">💽</span>
                Storage (GB) *
              </label>
              <select
                name="storage"
                value={formData.instanceConfig.storage}
                onChange={(e) => handleInstanceConfigChange('storage', parseInt(e.target.value))}
                className="env-input"
                required
                fixed
              >
                <option value="">Select Storage</option>
                <option value="10">10 GB</option>
                <option value="20">20 GB</option>
                <option value="50">50 GB</option>
                <option value="100">100 GB</option>
                <option value="200">200 GB</option>
              </select>
              <div className="field-sublabel">Disk storage capacity</div>
            </div>
          </div>
        </div>
      </div>

      {/* Port Configuration */}
      <div className="port-section">
        <h2 className="section-title">Port Configuration</h2>
        <p className="section-description">
          You can choose a specific port for your application, or we'll take care of it and assign one for you automatically.
        </p>

        <div className="port-options">
          <div className="port-option">
            <input
              type="radio"
              name="portType"
              id="random"
              checked={formData.portType === 'random'}
              onChange={() => setFormData(prev => ({ ...prev, portType: 'random' }))}
            />
            <label htmlFor="random">Assign a random port</label>
          </div>

          <div className="port-option">
            <input
              type="radio"
              name="portType"
              id="custom"
              checked={formData.portType === 'custom'}
              onChange={() => setFormData(prev => ({ ...prev, portType: 'custom' }))}
            />
            <label htmlFor="custom">Set a Custom Port</label>
          </div>
        </div>

        <div className="port-input-row">
          <div className="port-input-container">
            <span className="port-prefix">🌐 localhost:</span>
            <input
              type="number"
              className="port-input"
              value={formData.customPort}
              onChange={(e) => setFormData(prev => ({ ...prev, customPort: e.target.value }))}
              disabled={formData.portType === 'random'}
              min="1000"
              max="65535"
            />
          </div>

          <div className="port-status">
            ✅ {formData.portType === 'random' ? 'Random Port Assigned' : 'Custom Port Set'}
          </div>
        </div>
      </div>

      {/* Environment Variables */}
      <div className="section">
        <div className="env-vars-header">
          <h2 className="section-title">Configure Environment Variables</h2>
          <span className="help-icon">?</span>
        </div>
        <p className="section-description">
          Manage and customize environment variables for your application. Environment variables are key-value pairs that allow you to configure settings, API endpoints, and sensitive information specific to each environment. Add, edit, or delete variables to tailor your application's behavior and integration with external services.
        </p>

        <div style={{ backgroundColor: '#1e293b', border: '1px solid #374151', borderRadius: '8px', overflow: 'hidden' }}>
          <div className="env-vars-grid-header">
            <div>Key (max 100 chars)</div>
            <div>Value (max 500 chars)</div>
            <div></div>
            <div></div>
          </div>

          {formData.envVars.map(envVar => (
            <div key={envVar.id} className="env-var-row">
              {envVar.editing ? (
                <>
                  <input
                    type="text"
                    className="env-input"
                    value={envVar.key}
                    onChange={(e) => handleEnvVarChange(envVar.id, 'key', e.target.value)}
                    placeholder="Enter Key"
                    maxLength="100"
                  />
                  <input
                    type="text"
                    className="env-input"
                    value={envVar.value}
                    onChange={(e) => handleEnvVarChange(envVar.id, 'value', e.target.value)}
                    placeholder="Enter Value"
                    maxLength="500"
                  />
                  <button
                    className="save-btn"
                    onClick={() => handleEnvVarEdit(envVar.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <div className="env-key-display">
                    🗝️ {envVar.key || 'Empty Key'}
                  </div>
                  <div className="env-value-display">
                    🔗 {envVar.value || 'Empty Value'}
                  </div>
                  <button
                    className="env-action-btn edit-btn"
                    onClick={() => handleEnvVarEdit(envVar.id)}
                  >
                    ✏️
                  </button>
                </>
              )}
              <button
                className="env-action-btn delete-btn"
                onClick={() => handleEnvVarDelete(envVar.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <button className="add-new-btn-env" onClick={addNewEnvVar}>
          + Add New Environment Variable
        </button>
      </div>

      {/* Deployment Logs Configuration */}
      <div className="section">
        <h2 className="section-title">Deployment Configuration</h2>
        <p className="section-description">
          Configure deployment settings and initial log message for tracking deployment progress.
        </p>

      </div>

      <div className="step2-actions">
        <button className="back-btn" onClick={onBack} disabled={isDeploying}>
          ← Back
        </button>
        <button 
          className="finish-btn" 
          onClick={onFinish}
          disabled={isDeploying || !formData.instanceConfig.cpu || !formData.instanceConfig.memory || !formData.instanceConfig.storage}
        >
          {isDeploying ? (
            <>
              <span style={{ marginRight: '8px' }}>⏳</span>
              Deploying...
            </>
          ) : (
            <>
              Finish my Setup
              <span>🚀</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};

export default Step2Environment;