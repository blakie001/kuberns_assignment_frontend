import React, { useState } from 'react';
import './portConfigure.css';

const PortConfigure = () => {
    const [selectedPortOption, setSelectedPortOption] = useState('random');

    const handleRadioChange = (event) => {
        setSelectedPortOption(event.target.value);
    };

    return (
        <div className="port-control-outer-container">
            <div className="port-control-block">
                <div className="port-top-section">
                    <div className="port-header-left">
                        <h3 className="port-title">Port Configuration</h3>
                    </div>
                </div>

                <div className="port-divider"></div>

                <div className="port-bottom-section">
                    <div className="port-description-section">
                        <p className="port-description-text">
                            You can choose a specific port for your<br />application, or we'll take care of it and<br />assign one for you automatically.
                        </p>
                    </div>

                    <div className="port-options-section">
                        <div className="port-radio-group">
                            <label className="port-radio-label">
                                <input
                                    type="radio"
                                    name="portOption"
                                    value="random"
                                    checked={selectedPortOption === 'random'}
                                    onChange={handleRadioChange}
                                    className="port-radio"
                                />
                                Assign a random port
                            </label>
                            <label className="port-radio-label">
                                <input
                                    type="radio"
                                    name="portOption"
                                    value="custom"
                                    checked={selectedPortOption === 'custom'}
                                    onChange={handleRadioChange}
                                    className="port-radio"
                                />
                                Set a Custom Port
                            </label>
                        </div>

                        <div className="port-input-field">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="port-input-icon">
                                <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/>
                                <path d="M9 12h6"/>
                                <path d="M12 9v6"/>
                            </svg>
                            <input type="text" className="port-input-box" value="localhost:3000" readOnly={selectedPortOption === 'random'} />
                            <span className="port-status-text">Random Port Assigned</span>
                            <span className="port-status-dot"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PortConfigure;
