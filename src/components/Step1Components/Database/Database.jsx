import React from 'react';
import './database.css';
import { FaDatabase } from 'react-icons/fa';

const Database = () => {
    return (
        <div className="details-control-outer-container">
            <div className="details-control-block">
                {/* Top Section - Existing, unchanged */}
                <div className="db-top-section">
                    <div className="db-header-left">
                        <h3 className="db-title">Database<br />Selection</h3>
                    </div>

                    <div className="db-header-right">
                        <a href="#" className="db-help-link">Need Help?</a>
                        <p className="db-help-description">Refer to our brilliant support resources<br />for a smoother experience</p>
                    </div>
                </div>

                {/* Divider Line - Existing, unchanged */}
                <div className="db-divider"></div>

                {/* Bottom Section - Updated */}
                <div className="db-bottom-section">
                    {/* Description Block */}
                    <div className="db-description-block">
                        <p className="db-description-text">
                            <FaDatabase size={16} className="d-input-icon" />
                            Please be informed that the proper functioning of our application is dependent on a valid database connection during deployment. Failing to establish a correct database connection<br />will result in an inability to access or manipulate essential data, rendering the application non-functional. It's crucial to ensure a reliable database connection to guarantee the app's<br />operational success.
                        </p>
                    </div>
                    <div className="db-buttons-container"> {/* Container to center buttons */}
                        <button className="db-connect-btn">Connect Database</button>
                        <button className="db-maybe-later-btn">Maybe Later</button>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Database;