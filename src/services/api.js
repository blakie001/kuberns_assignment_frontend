export const createApp = async (appData) => {
  try {
    const response = await fetch('http://localhost:8000/api/webapps/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(appData),
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating app:', error);
    throw error;
  }
};