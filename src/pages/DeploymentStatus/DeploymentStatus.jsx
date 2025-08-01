import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

const DeploymentStatus = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [deploymentStatus, setDeploymentStatus] = useState({
    status: 'PENDING',
    progress: null,
    result: null,
    error: null
  });
  const [isPolling, setIsPolling] = useState(true);

  const checkDeploymentStatus = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/deployments/status/${taskId}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch deployment status`);
      }

      const data = await response.json();
      console.log('Deployment status:', data);
      
      setDeploymentStatus(data);

      // Stop polling if deployment is complete (success or failure)
      if (data.status === 'SUCCESS' || data.status === 'FAILURE' || data.status === 'failed') {
        setIsPolling(false);
      }

    } catch (error) {
      console.error('Error fetching deployment status:', error);
      setDeploymentStatus(prev => ({
        ...prev,
        error: error.message
      }));
      setIsPolling(false);
    }
  };

  useEffect(() => {
    if (!taskId) {
      navigate('/create-app');
      return;
    }

    // Initial check
    checkDeploymentStatus();

    // Set up polling interval
    let intervalId;
    if (isPolling) {
      intervalId = setInterval(checkDeploymentStatus, 3000); // Poll every 3 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [taskId, isPolling]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'PENDING':
        return '⏳';
      case 'PROGRESS':
        return '🔄';
      case 'SUCCESS':
        return '✅';
      case 'FAILURE':
      case 'failed':
        return '❌';
      default:
        return '⏳';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return '#f59e0b';
      case 'PROGRESS':
        return '#3b82f6';
      case 'SUCCESS':
        return '#10b981';
      case 'FAILURE':
      case 'failed':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Deployment Queued';
      case 'PROGRESS':
        return 'Deployment in Progress';
      case 'SUCCESS':
        return 'Deployment Successful';
      case 'FAILURE':
      case 'failed':
        return 'Deployment Failed';
      default:
        return 'Unknown Status';
    }
  };

  return (
    <>
      <Navbar />
      <div className="app-details-outer-container">
        <div style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '2rem',
          backgroundColor: 'white',
          borderRadius: '12px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 'bold', 
              color: '#1f2937',
              marginBottom: '0.5rem'
            }}>
              Deployment Status
            </h1>
            <p style={{ color: '#6b7280', fontSize: '1rem' }}>
              Task ID: <code style={{ 
                backgroundColor: '#f3f4f6', 
                padding: '0.25rem 0.5rem', 
                borderRadius: '4px',
                fontSize: '0.875rem'
              }}>{taskId}</code>
            </p>
          </div>

          {/* Status Display */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: `2px solid ${getStatusColor(deploymentStatus.status)}`,
            borderRadius: '12px',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>
              {getStatusIcon(deploymentStatus.status)}
            </div>
            
            <h2 style={{ 
              color: getStatusColor(deploymentStatus.status),
              fontSize: '1.5rem',
              fontWeight: 'bold',
              marginBottom: '1rem'
            }}>
              {getStatusText(deploymentStatus.status)}
            </h2>

            {deploymentStatus.progress && (
              <p style={{ 
                color: '#6b7280', 
                fontSize: '1rem',
                marginBottom: '1rem'
              }}>
                {deploymentStatus.progress}
              </p>
            )}

            {isPolling && (
              <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                gap: '0.5rem',
                color: '#6b7280',
                fontSize: '0.875rem'
              }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid #e5e7eb',
                  borderTop: '2px solid #3b82f6',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }}></div>
                Checking status...
              </div>
            )}
          </div>

          {/* Error Display */}
          {(deploymentStatus.error || deploymentStatus.status === 'failed') && (
            <div style={{
              backgroundColor: '#fef2f2',
              border: '1px solid #fca5a5',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#dc2626', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                Error Details:
              </h3>
              <p style={{ color: '#7f1d1d', fontSize: '0.875rem' }}>
                {deploymentStatus.error || 'Deployment failed. Please check the logs for more details.'}
              </p>
            </div>
          )}

          {/* Success Result */}
          {deploymentStatus.status === 'SUCCESS' && deploymentStatus.result && (
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #86efac',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '2rem'
            }}>
              <h3 style={{ color: '#166534', marginBottom: '0.5rem', fontSize: '1.1rem' }}>
                Deployment Complete!
              </h3>
              <div style={{ color: '#15803d', fontSize: '0.875rem' }}>
                {typeof deploymentStatus.result === 'object' ? (
                  <pre style={{ 
                    backgroundColor: 'white', 
                    padding: '0.5rem', 
                    borderRadius: '4px',
                    overflow: 'auto',
                    fontSize: '0.75rem'
                  }}>
                    {JSON.stringify(deploymentStatus.result, null, 2)}
                  </pre>
                ) : (
                  <p>{deploymentStatus.result}</p>
                )}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/create-app')}
              style={{
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500'
              }}
            >
              Create Another App
            </button>

            {!isPolling && deploymentStatus.status !== 'SUCCESS' && (
              <button
                onClick={() => {
                  setIsPolling(true);
                  checkDeploymentStatus();
                }}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500'
                }}
              >
                Refresh Status
              </button>
            )}

            {deploymentStatus.status === 'SUCCESS' && deploymentStatus.result?.url && (
              <a
                href={deploymentStatus.result.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  textDecoration: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '500',
                  display: 'inline-block'
                }}
              >
                🚀 View Application
              </a>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};

export default DeploymentStatus;