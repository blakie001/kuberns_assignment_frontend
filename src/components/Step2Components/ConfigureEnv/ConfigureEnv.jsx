import React, { useState } from 'react';
import './configureEnv.css';
import { 
  FiKey, FiLink, FiEdit2, FiTrash2, FiPlus, 
  FiSave, FiX, FiSettings, FiHelpCircle 
} from 'react-icons/fi';
import { RiGitBranchLine } from 'react-icons/ri';

const ConfigureEnv = ({ 
  variables = [], 
  onAddVariable, 
  onUpdateVariable, 
  onRemoveVariable,
  branch,
  onBranchChange
}) => {
  const [newKey, setNewKey] = useState('');
  const [newValue, setNewValue] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddEnv = () => {
    if (newKey.trim() && newValue.trim()) {
      onAddVariable({ key: newKey, value: newValue });
      setNewKey('');
      setNewValue('');
    }
  };

  const handleEditEnv = (index) => {
    setEditingIndex(index);
    setNewKey(variables[index].key);
    setNewValue(variables[index].value);
  };

  const handleSaveEdit = () => {
    if (editingIndex !== null && newKey.trim() && newValue.trim()) {
      onUpdateVariable(editingIndex, { key: newKey, value: newValue });
      setEditingIndex(null);
      setNewKey('');
      setNewValue('');
    }
  };

  const handleDeleteEnv = (index) => {
    onRemoveVariable(index);
    if (editingIndex === index) {
      setEditingIndex(null);
      setNewKey('');
      setNewValue('');
    }
  };

  return (
    <div className="details-control-outer-container">
      <div className="details-control-block">
        <div className="env-top-section">
          <div className="env-header-left">
            <h3 className="env-title">Configure Environment<br />Variables</h3>
          </div>

          <div className="env-header-right">
            <a href="#" className="env-help-link">
              <FiHelpCircle /> Need Help?
            </a>
            <p className="env-help-description">
              Refer to our brilliant support resources<br />for a smoother experience
            </p>
          </div>
        </div>

        <div className="env-divider"></div>

        <div className="env-bottom-section">

          <p className="env-description">
            Manage environment variables for your application. These are key-value pairs that configure your app's behavior.
          </p>

          <div className="env-table">
            <div className="env-table-header">
              <span className="env-header-key">Key</span>
              <span className="env-header-value">Value</span>
              <span className="env-header-actions"></span>
            </div>

            {variables.map((env, index) => (
              <div className="env-table-row" key={index}>
                <div className="env-cell env-key">
                  <FiKey className="env-icon" />
                  {editingIndex === index ? (
                    <input
                      type="text"
                      className="env-input"
                      value={newKey}
                      onChange={(e) => setNewKey(e.target.value)}
                    />
                  ) : (
                    <span>{env.key}</span>
                  )}
                </div>
                <div className="env-cell env-value">
                  <FiLink className="env-icon" />
                  {editingIndex === index ? (
                    <input
                      type="text"
                      className="env-input"
                      value={newValue}
                      onChange={(e) => setNewValue(e.target.value)}
                    />
                  ) : (
                    <span>{env.value}</span>
                  )}
                </div>
                <div className="env-cell env-actions">
                  {editingIndex === index ? (
                    <button className="env-action-btn save" onClick={handleSaveEdit}>
                      <FiSave /> Save
                    </button>
                  ) : (
                    <button className="env-action-btn edit" onClick={() => handleEditEnv(index)}>
                      <FiEdit2 /> Edit
                    </button>
                  )}
                  <button className="env-action-btn delete" onClick={() => handleDeleteEnv(index)}>
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}

            <div className="env-table-row new-entry">
              <div className="env-cell env-key">
                <FiKey className="env-icon" />
                <input
                  type="text"
                  className="env-input"
                  placeholder="Enter Key"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                />
              </div>
              <div className="env-cell env-value">
                <FiLink className="env-icon" />
                <input
                  type="text"
                  className="env-input"
                  placeholder="Enter Value"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                />
              </div>
              <div className="env-cell env-actions">
                <button className="env-action-btn save" onClick={editingIndex !== null ? handleSaveEdit : handleAddEnv}>
                  <FiSave /> Save
                </button>
                <button className="env-action-btn delete" onClick={() => { setNewKey(''); setNewValue(''); setEditingIndex(null); }}>
                  <FiX />
                </button>
              </div>
            </div>
          </div>

          <div className="env-add-new-container">
            <button className="env-add-new-btn" onClick={handleAddEnv}>
              <FiPlus /> Add New Variable
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigureEnv;