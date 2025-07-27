import React, { useState } from 'react';
import Step1BasicDetails from './Step1BasicDetails';
import Step2Environment from './Step2Environment';
import './style.css';

// Navbar component
const Navbar = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <a href="#" className="logo">Kubernetes</a>
          <nav className="nav">
            <a href="#" className="nav-item active">
              <span>📋</span>
              Projects
            </a>
            <a href="#" className="nav-item">
              <span>💾</span>
              Datastore
            </a>
          </nav>
        </div>
        <div className="header-center">
          <input
            type="text"
            className="search-input"
            placeholder="Quick Search"
          />
          <span className="search-icon">⚡</span>
        </div>
        <div className="header-right">
          <button className="add-new-btn">
            Add New
          </button>
          <div className="user-section">
            <div className="avatar" style={{ backgroundColor: '#6b7280' }}></div>
            <div className="avatar github-avatar"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

const PageHeader = ({ currentStep }) => {
  return (
    <div className="page-header">
      <div className="page-title-row">
        <h1 className="page-title">Create New App</h1>
        <div className="progress-steps">
          <div className={`step ${currentStep === 1 ? 'active' : ''}`}>1</div>
          <div className="step-divider"></div>
          <div className={`step ${currentStep === 2 ? 'active' : ''}`}>2</div>
        </div>
      </div>
      <p className="page-description">
        Connect your repository and fill in the requirements to see the app deployed in seconds.
      </p>
    </div>
  );
};

// Deployment Status Component
const DeploymentStatus = ({ taskId, webappId }) => {
  const [status, setStatus] = useState('PENDING');
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  React.useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/deployments/status/${taskId}/`);
        const data = await response.json();
        
        setStatus(data.status);
        setProgress(data.progress || '');
        setResult(data.result);
        
        if (data.status === 'failed') {
          setError(data.error || 'Deployment failed');
        }
        
        // Continue polling if not completed
        if (!['SUCCESS', 'FAILURE', 'failed'].includes(data.status)) {
          setTimeout(checkStatus, 2000);
        }
      } catch (err) {
        setError('Failed to check deployment status');
      }
    };

    checkStatus();
  }, [taskId]);

  return (
    <div className="page-header">
      <h1 className="page-title">🚀 Deployment Status</h1>
      <div style={{ marginTop: '2rem', padding: '2rem', backgroundColor: '#1e293b', borderRadius: '8px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <strong>WebApp ID:</strong> {webappId}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Task ID:</strong> {taskId}
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <strong>Status:</strong> {status}
        </div>
        {progress && (
          <div style={{ marginBottom: '1rem' }}>
            <strong>Progress:</strong> {progress}
          </div>
        )}
        {error && (
          <div style={{ color: '#ef4444', marginTop: '1rem' }}>
            <strong>Error:</strong> {error}
          </div>
        )}
        {result && status === 'SUCCESS' && (
          <div style={{ color: '#10b981', marginTop: '1rem' }}>
            <strong>Success:</strong> Deployment completed successfully!
          </div>
        )}
      </div>
    </div>
  );
};

// API service
const api = {
  createWebApp: async (data) => {
    const response = await fetch('/api/webapp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create webapp');
    }
    
    return response.json();
  }
};

const CreateApp = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentData, setDeploymentData] = useState(null);
  const [formData, setFormData] = useState({
    // GitHub Connection
    githubConnected: false,
    githubOrg: '',
    githubRepo: '',
    githubBranch: 'main',
    // App Details
    appName: '',
    owner: '',
    region: 'us-east-1',
    template: '',
    ttlDays: 7,
    // Plan
    selectedPlan: 'starter',
    // Database
    databaseEnabled: false,
    // Port Configuration
    portType: 'random',
    customPort: '3000',
    // Instance Configuration
    instanceConfig: {
      cpu: '',
      memory: '',
      storage: '',
      securityGroupId: '',
      awsInstanceId: '',
      publicId: ''
    },
    // Environment Variables
    envVars: [
      { id: 1, key: '', value: '', editing: true }
    ],
    // Deployment Configuration
    initialLogMessage: 'Deployment started for application',
    errorHandling: false
  });

  const handleNextStep = () => {
    if (currentStep === 1) {
      setCurrentStep(2);
    }
  };

  const transformFormDataForAPI = (data) => {
    // Transform form data to match Django model fields
    const apiData = {
      // WebApp model fields
      name: data.appName,
      owner: data.owner,
      region: data.region,
      template: data.template,
      plan: data.selectedPlan,
      githubOrg: data.githubOrg,
      githubRepo: data.githubRepo,
      githubBranch: data.githubBranch,
      ttl_days: parseInt(data.ttlDays) || 7,
      
      // Environment data
      environment: {
        branch: data.githubBranch,
        port: data.portType === 'custom' ? parseInt(data.customPort) || 3000 : 3000
      },
      
      // Instance configuration
      instance: {
        cpu: parseInt(data.instanceConfig.cpu),
        memory: parseInt(data.instanceConfig.memory),
        storage: parseInt(data.instanceConfig.storage),
        security_group_id: data.instanceConfig.securityGroupId || '',
        awsInstanceId: data.instanceConfig.awsInstanceId || '',
        publicId: data.instanceConfig.publicId || '',
        status: 'pending'
      },
      
      // Environment variables (filtered for valid entries)
      environment_variables: data.envVars
        .filter(envVar => envVar.key && envVar.value && envVar.key.trim() !== '' && envVar.value.trim() !== '')
        .map(envVar => ({
          key: envVar.key.trim(),
          value: envVar.value.trim()
        })),
      
      // Deployment log configuration
      deployment_log: {
        status: 'created',
        message: data.initialLogMessage || 'Deployment started for application',
        is_error: data.errorHandling
      }
    };

    return apiData;
  };

  const handleFinishSetup = async () => {
    setIsDeploying(true);
    
    try {
      const apiData = transformFormDataForAPI(formData);
      console.log('Sending API data:', apiData);
      
      const response = await api.createWebApp(apiData);
      console.log('API Response:', response);
      
      if (response.status === 'deployment_started') {
        setDeploymentData({
          taskId: response.task_id,
          webappId: response.webapp_id
        });
        setCurrentStep(3); // Move to deployment status step
      }
    } catch (error) {
      console.error('Deployment failed:', error);
      alert(`Deployment failed: ${error.message}`);
    } finally {
      setIsDeploying(false);
    }
  };

  // Show deployment status if we have deployment data
  if (deploymentData && currentStep === 3) {
    return (
      <div className="kubernetes-app">
        <Navbar />
        <div className="main-content">
          <div className="content-area">
            <DeploymentStatus 
              taskId={deploymentData.taskId} 
              webappId={deploymentData.webappId} 
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="kubernetes-app">
      <Navbar />
      <div className="main-content">
        <div className="content-area">
          <PageHeader currentStep={currentStep} />
          {currentStep === 1 ? (
            <Step1BasicDetails
              formData={formData}
              setFormData={setFormData}
              onNextStep={handleNextStep}
            />
          ) : (
            <Step2Environment
              formData={formData}
              setFormData={setFormData}
              onBack={() => setCurrentStep(1)}
              onFinish={handleFinishSetup}
              isDeploying={isDeploying}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateApp;