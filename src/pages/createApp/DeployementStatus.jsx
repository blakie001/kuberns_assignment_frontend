import React, { useState, useEffect } from 'react';

const DeploymentStatus = ({ taskId, webappId }) => {
  const [status, setStatus] = useState('PENDING');
  const [progress, setProgress] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(`/api/deployments/status/${taskId}/`);
        const data = await response.json();
        
        console.log('Status check response:', data);
        
        setStatus(data.status);
        setProgress(data.progress || '');
        setResult(data.result);
        setLoading(false);
        
        if (data.status === 'failed') {
          setError(data.error || 'Deployment failed');
        }
        
        // Continue polling if not completed
        if (!['SUCCESS', 'FAILURE', 'failed'].includes(data.status)) {
          setTimeout(checkStatus, 2000);
        }
      } catch (err) {
        console.error('Status check error:', err);
        setError('Failed to check deployment status');
        setLoading(false);
      }
    };

    checkStatus();
  }, [taskId]);

  const getStatusIcon = () => {
    switch (status) {
      case 'SUCCESS': return '✅';
      case 'FAILURE':
      case 'failed': return '❌';
      case 'PROGRESS': return '⏳';
      case 'PENDING': return '🔄';
      default: return '🔄';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'SUCCESS': return '#22c55e';
      case 'FAILURE':
      case 'failed': return '#ef4444';
      case 'PROGRESS': return '#f59e0b';
      case 'PENDING': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const isCompleted = ['SUCCESS', 'FAILURE', 'failed'].includes(status);

  return (
    <div className="page-header">
      <div className="page-title-row">
        <h1 className="page-title">
          {getStatusIcon()} Deployment Status
        </h1>
      </div>
      <p className="page-description">
        Monitor your application deployment progress in real-time.
      </p>

      {/* Status Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginTop: '2rem',
        marginBottom: '2rem'
      }}>
        {/* WebApp Info Card */}
        <div style={{
          backgroundColor: '#1e293b',
          border: '1px solid #374151',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h3 style={{ 
            color: '#f1f5f9', 
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>
            Application Details
          </h3>
          <div style={{ marginBottom: '0.75rem' }}>
            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>WebApp ID:</span>
            <div style={{ 
              color: '#e2e8f0', 
              fontFamily: 'Monaco, Menlo, monospace',
              fontSize: '0.875rem',
              marginTop: '0.25rem'
            }}>
              {webappId}
            </div>
          </div>
          <div>
            <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Task ID:</span>
            <div style={{ 
              color: '#e2e8f0', 
              fontFamily: 'Monaco, Menlo, monospace',
              fontSize: '0.875rem',
              marginTop: '0.25rem'
            }}>
              {taskId}
            </div>
          </div>
        </div>

        {/* Status Card */}
        <div style={{
          backgroundColor: '#1e293b',
          border: '1px solid #374151',
          borderRadius: '8px',
          padding: '1.5rem'
        }}>
          <h3 style={{ 
            color: '#f1f5f9', 
            marginBottom: '1rem',
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>
            Current Status
          </h3>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1rem'
          }}>
            <span style={{ fontSize: '1.5rem' }}>{getStatusIcon()}</span>
            <span style={{
              backgroundColor: getStatusColor(),
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '1rem',
              fontSize: '0.75rem',
              fontWeight: '600',
              textTransform: 'uppercase'
            }}>
              {status}
            </span>
          </div>
          {progress && (
            <div>
              <span style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Progress:</span>
              <div style={{ 
                color: '#e2e8f0',
                fontSize: '0.875rem',
                marginTop: '0.25rem'
              }}>
                {progress}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Loading Indicator */}
      {!isCompleted && (
        <div style={{
          backgroundColor: '#334155',
          border: '1px solid #475569',
          borderRadius: '8px',
          padding: '2rem',
          textAlign: 'center',
          marginBottom: '2rem'
        }}>
          <div style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            animation: 'spin 2s linear infinite'
          }}>
            ⏳
          </div>
          <h3 style={{ 
            color: '#f1f5f9', 
            marginBottom: '0.5rem',
            fontSize: '1.25rem'
          }}>
            Deployment in Progress
          </h3>
          <p style={{ color: '#94a3b8' }}>
            Please wait while we deploy your application. This may take a few minutes.
          </p>
          {!loading && (
            <p style={{ 
              color: '#94a3b8', 
              fontSize: '0.875rem',
              marginTop: '1rem'
            }}>
              Status updates every 2 seconds...
            </p>
          )}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div style={{
          backgroundColor: '#7f1d1d',
          border: '1px solid #dc2626',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ 
            color: '#fca5a5', 
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            ❌ Deployment Failed
          </h3>
          <p style={{ color: '#fecaca', lineHeight: '1.5' }}>
            {error}
          </p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#dc2626',
              border: 'none',
              borderRadius: '0.5rem',
              color: 'white',
              padding: '0.5rem 1rem',
              marginTop: '1rem',
              cursor: 'pointer',
              fontSize: '0.875rem'
            }}
          >
            Retry Deployment
          </button>
        </div>
      )}

      {/* Success Message */}
      {result && status === 'SUCCESS' && (
        <div style={{
          backgroundColor: '#14532d',
          border: '1px solid #22c55e',
          borderRadius: '8px',
          padding: '1.5rem',
          marginBottom: '2rem'
        }}>
          <h3 style={{ 
            color: '#86efac', 
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🎉 Deployment Successful!
          </h3>
          <p style={{ color: '#bbf7d0', lineHeight: '1.5', marginBottom: '1rem' }}>
            Your application has been deployed successfully and is now live.
          </p>
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => console.log('Navigate to app')}
              style={{
                backgroundColor: '#22c55e',
                border: 'none',
                borderRadius: '0.5rem',
                color: 'white',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              View Application
            </button>
            <button 
              onClick={() => console.log('Navigate to dashboard')}
              style={{
                backgroundColor: 'transparent',
                border: '1px solid #22c55e',
                borderRadius: '0.5rem',
                color: '#22c55e',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
                fontWeight: '500'
              }}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Deployment Logs */}
      <div style={{
        backgroundColor: '#1e293b',
        border: '1px solid #374151',
        borderRadius: '8px',
        padding: '1.5rem'
      }}>
        <h3 style={{ 
          color: '#f1f5f9', 
          marginBottom: '1rem',
          fontSize: '1.125rem',
          fontWeight: '600'
        }}>
          Deployment Timeline
        </h3>
        <div style={{
          backgroundColor: '#0f172a',
          border: '1px solid #374151',
          borderRadius: '4px',
          padding: '1rem',
          fontFamily: 'Monaco, Menlo, monospace',
          fontSize: '0.875rem',
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          <div style={{ color: '#94a3b8', marginBottom: '0.5rem' }}>
            {new Date().toLocaleTimeString()} - Deployment initiated
          </div>
          {progress && (
            <div style={{ color: '#f59e0b', marginBottom: '0.5rem' }}>
              {new Date().toLocaleTimeString()} - {progress}
            </div>
          )}
          {status === 'SUCCESS' && (
            <div style={{ color: '#22c55e' }}>
              {new Date().toLocaleTimeString()} - Deployment completed successfully
            </div>
          )}
          {error && (
            <div style={{ color: '#ef4444' }}>
              {new Date().toLocaleTimeString()} - Error: {error}
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default DeploymentStatus;