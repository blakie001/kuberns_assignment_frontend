import React from 'react';
import './details.css';
import { FaGlobe, FaDatabase } from 'react-icons/fa';
import { FiAlertCircle } from 'react-icons/fi';

const Details = ({ 
    appName, 
    region, 
    template, 
    onAppNameChange, 
    onRegionChange, 
    onTemplateChange,
    errors = {}
}) => {
    return (
        <div className="details-control-outer-container">
            <div className="details-control-block">
                {/* Top Section */}
                <div className="d-top-section">
                    <div className="d-header-left">
                        <h3 className="d-title">Fill in the details of<br />your App</h3>
                    </div>

                    <div className="d-header-right">
                        <a href="#" className="d-help-link">Need Help?</a>
                        <p className="d-help-description">Refer to our brilliant support resources<br />for a smoother experience</p>
                    </div>
                </div>

                {/* Divider Line */}
                <div className="d-divider"></div>

                {/* Bottom Section */}
                <div className="details-bottom-section">
                    {/* Basic Details Section */}
                    <div className="details-section-header">
                        <h4 className="details-section-title">Basic Details</h4>
                        <p className="details-section-subtitle">
                            Enter the basic details of your application such as the name, region of deployment and the framework or the template for your application.
                        </p>
                    </div>

                    <div className="details-input-group">
                        {/* Input Field: Choose a name */}
                        <div className="details-input-field">
                            <FaDatabase size={16} className="d-input-icon" />
                            <input 
                                type="text" 
                                className={`details-input-box ${errors.name ? 'error-input' : ''}`} 
                                placeholder="Enter WebApp Name" 
                                value={appName}
                                onChange={(e) => onAppNameChange(e.target.value)}
                            />
                            <span className={`details-input-label ${errors.name ? 'error-label' : ''}`}>
                                *Choose a name
                            </span>
                            {errors.name && <FiAlertCircle className="input-error-icon" />}
                        </div>

                        {/* Dropdown: Choose Region */}
                        <div className="details-input-field">
                            <FaGlobe size={16} className="input-icon" />
                            <select 
                                className="details-input-box"
                                value={region}
                                onChange={(e) => onRegionChange(e.target.value)}
                            >
                                <option value="ap-south-1">ap-south-1</option>
                                <option value="us-east-1">us-east-1</option>
                                <option value="eu-west-1">us-west-1</option>
                                <option value="ap-southeast-1">ap-southeast-1</option>
                                <option value="eu-west-1">eu-west-1</option>
                            </select>
                            <span className="details-input-label">Choose Region</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dropdown-arrow">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>

                        {/* Dropdown: Choose Template */}
                        <div className="details-input-field">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="input-icon">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                <polyline points="14 2 14 8 20 8" />
                                <line x1="16" y1="13" x2="8" y2="13" />
                                <line x1="16" y1="17" x2="8" y2="17" />
                                <line x1="10" y1="9" x2="8" y2="9" />
                            </svg>
                            <select 
                                className={`details-input-box ${errors.template ? 'error-input' : ''}`}
                                value={template}
                                onChange={(e) => onTemplateChange(e.target.value)}
                            >
                                <option value="">Select Template</option>
                                <option value="react">React</option>
                                <option value="angular">Angular</option>
                                <option value="nextjs">Next.js</option>
                                <option value="nodejs">Node.js</option>
                                <option value="django">Django</option>
                            </select>
                            <span className={`details-input-label ${errors.template ? 'error-label' : ''}`}>
                                *Choose Template
                            </span>
                            {errors.template && <FiAlertCircle className="input-error-icon" />}
                        </div>
                    </div>

                    {/* Plan Type Section */}
                    <div className="details-section-header plan-type-header">
                        <div className="plan-type-left">
                            <h4 className="details-section-title">Plan Type</h4>
                            <p className="details-section-subtitle plan-type-subtitle">
                                Select the plan type that best suits your application's needs. Each plan offers different features, resources, and limitations. Choose the plan that aligns with your requirements and budget.
                            </p>
                        </div>
                        <button className="upgrade-plan-btn">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 5l7 7-7 7M5 12h14" />
                            </svg>
                            Upgrade Plan
                        </button>
                    </div>

                    {/* Plan Details Table */}
                    <div className="plan-details-table">
                        <div className="table-header">
                            <span>Plan type</span>
                            <span>Storage</span>
                            <span>Bandwidth</span>
                            <span>Memory (RAM)</span>
                            <span>CPU</span>
                            <span>Monthly Cost</span>
                            <span>Price per hour</span>
                        </div>
                        <div className="table-row">
                            <div className="plan-name-cell">
                                <span className="plan-starter-tag">Starter</span>
                            </div>
                            <span>10 GB</span>
                            <span>10 GB</span>
                            <span>10 GB</span>
                            <span>2 GB</span>
                            <span>₹0</span>
                            <span>₹0</span>
                        </div>
                    </div>
                    <p className="plan-footer-note">
                        *Ideal for personal blogs and small websites
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Details;