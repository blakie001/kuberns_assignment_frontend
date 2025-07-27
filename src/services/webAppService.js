import api from './api';

export const createWebApp = async (data) => {
  try {
    const response = await api.post('/webapps/', data);
    return response.data;
  } catch (error) {
    console.error('Error creating web app:', error);
    throw error;
  }
};


export const createEnvironment = async (webAppId, data) => {
  try {
    const response = await api.post(`/webapps/${webAppId}/environments/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating environment:', error);
    throw error;
  }
};


export const createInstance = async (environmentId, data) => {
  try {
    const response = await api.post(`/environments/${environmentId}/instances/`, data);
    return response.data;
  } catch (error) {
    console.error('Error creating instance:', error);
    throw error;
  }
};


