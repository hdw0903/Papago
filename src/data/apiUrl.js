const endpoint = process.env.REACT_APP_API_URL || 'http://localhost:5000';
const url = {
  detectURL: `${endpoint}/api/papago/detectionLangs`,
  translateURL: `${endpoint}/api/papago/translation`,
};
export default url;
