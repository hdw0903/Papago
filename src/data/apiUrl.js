const endpoint = process.env.API_URL || 'http://localhost:5000';
const url = {
  detectURL: `${endpoint}/api/papago/detectionLangs`,
  translateURL: `${endpoint}/api/papago/translation`,
};
export default url;
