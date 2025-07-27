import React from 'react';

const Step1BasicDetails = ({ formData, setFormData, onNextStep }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleGitHubConnect = () => {
    setFormData(prev => ({
      ...prev,
      githubConnected: true,
      githubOrg: 'Github.org',
      githubRepo: 'Kubernetes Page'
    }));
  };

  const handlePlanSelect = (plan) => {
    setFormData(prev => ({
      ...prev,
      selectedPlan: plan
    }));
  };

  const toggleDatabase = () => {
    setFormData(prev => ({
      ...prev,
      databaseEnabled: !prev.databaseEnabled
    }));
  };

  const REGION_CHOICES = [
    { value: 'us-east-1', label: 'US East (N. Virginia)' },
    { value: 'us-west-1', label: 'US West (N. California)' },
    { value: 'eu-west-1', label: 'EU (Ireland)' },
    { value: 'ap-southeast-1', label: 'Asia Pacific (Singapore)' }
  ];

  const TEMPLATE_CHOICES = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'node', label: 'Node.js' },
    { value: 'django', label: 'Django' },
    { value: 'flask', label: 'Flask' }
  ];

  const PLANS = [
    {
      id: 'starter',
      name: 'Starter',
      storage: '10 GB',
      bandwidth: '10 GB',
      memory: '2 GB',
      cpu: '1 vCPU',
      monthlyCost: '$0',
      hourlyCost: '$0',
      note: 'Good for personal blogs and small websites'
    },
    {
      id: 'pro',
      name: 'Pro',
      storage: '50 GB',
      bandwidth: '50 GB',
      memory: '8 GB',
      cpu: '4 vCPU',
      monthlyCost: '$50',
      hourlyCost: '$0.07',
      note: 'Good for production applications'
    }
  ];

  return (
    <>
      {/* Version Control System */}
      <div className="section">
        <h2 className="section-title">Choose your Version Control System</h2>

        <div className="version-control-grid">
          <div className={`control-card ${formData.githubConnected ? 'connected' : ''}`}>
            <div className="control-header">
              <span className="platform-label github-label">GitHub</span>
              <span className={`connection-status ${formData.githubConnected ? 'status-connected' : 'status-not-connected'}`}>
                {formData.githubConnected ? 'CONNECTED' : 'NOT CONNECTED'}
              </span>
            </div>
            <div className="control-content">
              <div className="control-icon user-icon">👤</div>
              <span className="control-text">
                {formData.githubConnected ? formData.githubOrg : 'Not connected'}
              </span>
            </div>
            <div className="control-sublabel">Select Organization</div>
            {!formData.githubConnected && (
              <button className="configure-btn" onClick={handleGitHubConnect}>
                ⚙️ Connect GitHub
              </button>
            )}
          </div>

          <div className="control-card">
            <div className="control-header">
              <span className="platform-label">Organization</span>
              <span className="connection-status status-not-connected">REQUIRED</span>
            </div>
            <div className="control-content">
              <div className="control-icon repo-icon">🏢</div>
              <input
                type="text"
                className="control-text"
                name="githubOrg"
                value={formData.githubOrg}
                onChange={handleInputChange}
                placeholder="Enter GitHub organization"
                required
              />
            </div>
            <div className="control-sublabel">GitHub Organization Name</div>
          </div>

          <div className="control-card">
            <div className="control-header">
              <span className="platform-label">Repository</span>
              <span className="connection-status status-not-connected">REQUIRED</span>
            </div>
            <div className="control-content">
              <div className="control-icon repo-icon">📁</div>
              <input
                type="text"
                className="control-text"
                name="githubRepo"
                value={formData.githubRepo}
                onChange={handleInputChange}
                placeholder="Enter repository name"
                required
              />
            </div>
            <div className="control-sublabel">Select Repository</div>
          </div>

          <div className="control-card">
            <div className="control-header">
              <span className="control-name">Branch</span>
            </div>
            <div className="control-content">
              <div className="control-icon branch-icon">🌿</div>
              <input
                type="text"
                className="control-text"
                name="githubBranch"
                value={formData.githubBranch}
                onChange={handleInputChange}
                placeholder="Enter branch name"
              />
            </div>
            <div className="control-sublabel">Select Branch (default: main)</div>
          </div>
        </div>
      </div>

      {/* Fill in details */}
      <div className="section">
        <div className="section-header">
          <h2 className="section-title">Fill in the details of your App</h2>
        </div>

        <div className="details-content">
          <h3 className="details-title">Basic Details</h3>
          <p className="details-description">
            Enter the basic details of your application such as the name, owner, region of deployment and the framework or the template for your application.
          </p>

          <div className="form-grid">
            <div className="form-field">
              <label className="field-label">
                <span className="field-icon">🏢</span>
                App Name *
              </label>
              <input
                type="text"
                name="appName"
                value={formData.appName}
                onChange={handleInputChange}
                placeholder="Enter app name"
                className="env-input"
                required
              />
              <div className="field-sublabel">Choose a unique name (max 100 characters)</div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon">👤</span>
                Owner *
              </label>
              <input
                type="text"
                name="owner"
                value={formData.owner}
                onChange={handleInputChange}
                placeholder="Enter owner name"
                className="env-input"
                required
              />
              <div className="field-sublabel">Application owner (max 100 characters)</div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon">🌍</span>
                Region *
              </label>
              <select
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                className="env-input"
                required
              >
                {REGION_CHOICES.map(region => (
                  <option key={region.value} value={region.value}>
                    {region.label}
                  </option>
                ))}
              </select>
              <div className="field-sublabel">Choose deployment region</div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon">✅</span>
                Template *
              </label>
              <select
                name="template"
                value={formData.template}
                onChange={handleInputChange}
                className="env-input"
                required
              >
                <option value="">Select Template</option>
                {TEMPLATE_CHOICES.map(template => (
                  <option key={template.value} value={template.value}>
                    {template.label}
                  </option>
                ))}
              </select>
              <div className="field-sublabel">Choose application framework</div>
            </div>

            <div className="form-field">
              <label className="field-label">
                <span className="field-icon">⏱️</span>
                TTL Days
              </label>
              <input
                type="number"
                name="ttlDays"
                value={formData.ttlDays}
                onChange={handleInputChange}
                placeholder="7"
                className="env-input"
                min="1"
                max="365"
              />
              <div className="field-sublabel">Time to live in days (default: 7)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Plan Type */}
      <div className="section">
        <div className="plan-header">
          <div className="plan-title-section">
            <h2 className="section-title">Plan Type</h2>
            <p className="plan-description">
              Select the plan type that best suits your application's needs. Each plan offers different features, resources, and limitations. Choose the plan that aligns with your requirements and budget.
            </p>
          </div>
          <div className="plan-help-section">
            <button className="upgrade-btn">
              🔄 Upgrade Plan
            </button>
          </div>
        </div>

        <table className="plan-table">
          <thead>
            <tr>
              <th>Plan type</th>
              <th>Storage</th>
              <th>Bandwidth</th>
              <th>Memory (RAM)</th>
              <th>CPU</th>
              <th>Monthly Cost</th>
              <th>Price per hour</th>
            </tr>
          </thead>
          <tbody>
            {PLANS.map(plan => (
              <tr 
                key={plan.id}
                className={`plan-row ${formData.selectedPlan === plan.id ? 'selected' : ''}`}
                onClick={() => handlePlanSelect(plan.id)}
              >
                <td>
                  <div className="plan-cell">
                    <div className={`radio-input ${formData.selectedPlan === plan.id ? 'checked' : ''}`}></div>
                    <span className={`plan-name ${plan.id}`}>{plan.name}</span>
                  </div>
                </td>
                <td>{plan.storage}</td>
                <td>{plan.bandwidth}</td>
                <td>{plan.memory}</td>
                <td>{plan.cpu}</td>
                <td>{plan.monthlyCost}</td>
                <td>{plan.hourlyCost}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="plan-note">
          *{PLANS.find(p => p.id === formData.selectedPlan)?.note}
        </div>
      </div>

      {/* Database Selection */}
      <div className="section">
        <div className="section-header">
          <div className="database-title-section">
            <h2 className="section-title">Database Selection</h2>
            <p className="section-description">
              Please be informed that the proper functioning of our application is dependent on a valid database connection during deployment. Failing to establish a correct database connection could result in inability to access or manipulate essential data, rendering the application non-functional. It is crucial to ensure a reliable database connection to guarantee the app's operational success.
            </p>
          </div>
        </div>

        <div className="database-buttons">
          <button 
            className={`connect-db-btn ${formData.databaseEnabled ? 'connected' : ''}`}
            onClick={toggleDatabase}
          >
            {formData.databaseEnabled ? '✅ Database Enabled' : 'Connect Database'}
          </button>
          <span className="maybe-later" onClick={toggleDatabase}>
            {formData.databaseEnabled ? 'Disable Database' : 'Maybe Later'}
          </span>
        </div>
      </div>

      <div className="bottom-action">
        <button 
          className="env-variables-btn" 
          onClick={onNextStep}
          disabled={!formData.appName || !formData.owner || !formData.template || !formData.githubOrg || !formData.githubRepo}
        >
          Set Up Env Variables
          <span>→</span>
        </button>
      </div>
    </>
  );
};

export default Step1BasicDetails;