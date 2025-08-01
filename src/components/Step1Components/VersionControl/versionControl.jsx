import React from 'react';
import './versionControl.css';
import { FaGithub, FaGitlab, FaCog } from 'react-icons/fa';
import { RiGitBranchLine } from 'react-icons/ri';
import { FiAlertCircle } from 'react-icons/fi';

const VersionControl = ({ selected, formData, onChange, errors = {} }) => {
    const handleOrgChange = (e) => onChange('githubOrg', e.target.value);
    const handleRepoChange = (e) => onChange('githubRepo', e.target.value);
    const handleBranchChange = (e) => onChange('githubBranch', e.target.value);

    return (
        <div className="version-control-outer-container">
            <div className="version-control-block">
                {/* Top Section */}
                <div className="vc-top-section">
                    <div className="vc-header-left">
                        <h3 className="vc-title">Choose your Version<br />Control System</h3>
                    </div>
                    <div className="vc-options-wrapper">
                        <div className="vc-options">
                            {/* GitHub Option */}
                            <div className={`vc-option github ${selected === 'github' ? 'active' : ''}`}>
                                <div className="vc-option-content">
                                    <div className="vc-option-header">
                                        <span className="vc-option-name">Github</span>
                                        <FaGithub size={20} className="github-icon" />
                                    </div>
                                    <span className="vc-option-status connected">CONNECTED</span>
                                </div>
                            </div>
                            {/* GitLab Option */}
                            <div className={`vc-option gitlab ${selected === 'gitlab' ? 'active' : ''}`}>
                                <div className="vc-option-content">
                                    <div className="vc-option-header">
                                        <span className="vc-option-name">Gitlab</span>
                                        <FaGitlab size={20} className="gitlab-icon" />
                                    </div>
                                    <span className="vc-option-status not-connected">NOT CONNECTED</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="vc-header-right">
                        <a href="#" className="vc-help-link">Need Help?</a>
                        <p className="vc-help-description">Refer to our brilliant support resources<br />for a smoother experience</p>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="vc-divider"></div>

                {/* Bottom Section */}
                <div className="vc-bottom-section">
                    <div className="vc-input-group">
                        {/* Organization Input */}
                        <div className="vc-input-field">
                            <RiGitBranchLine size={16} className="input-icon" />
                            <input 
                                type="text" 
                                className={`vc-input-box ${errors.githubOrg ? 'error-input' : ''}`} 
                                placeholder="Enter Organization Name" 
                                value={formData.githubOrg || ''}
                                onChange={handleOrgChange}
                            />
                            <span className={`vc-input-label ${errors.githubOrg ? 'error-label' : ''}`}>
                                *Select Organization
                            </span>
                            {errors.githubOrg && <FiAlertCircle className="input-error-icon" />}
                        </div>

                        {/* Repository Input */}
                        <div className="vc-input-field">
                            <FaGithub size={16} className="input-icon" />
                            <input 
                                type="text" 
                                className={`vc-input-box ${errors.githubRepo ? 'error-input' : ''}`} 
                                placeholder="Enter Repo Name" 
                                value={formData.githubRepo || ''}
                                onChange={handleRepoChange}
                            />
                            <span className={`vc-input-label ${errors.githubRepo ? 'error-label' : ''}`}>
                                *Select Repository
                            </span>
                            {errors.githubRepo && <FiAlertCircle className="input-error-icon" />}
                        </div>

                        {/* Branch Input */}
                        <div className="vc-input-field">
                            <RiGitBranchLine size={16} className="input-icon" />
                            <input 
                                type="text" 
                                className={`vc-input-box ${errors.githubBranch ? 'error-input' : ''}`} 
                                placeholder="Enter Branch Name (e.g., main)" 
                                value={formData.githubBranch || ''}
                                onChange={handleBranchChange}
                            />
                            <span className={`vc-input-label ${errors.githubBranch ? 'error-label' : ''}`}>
                                *Select Branch
                            </span>
                            {errors.githubBranch && <FiAlertCircle className="input-error-icon" />}
                        </div>

                        <div className="configure-github-container">
                            <div className="configure-github-btn">
                                <FaCog size={16} />
                                Configure Github
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VersionControl;