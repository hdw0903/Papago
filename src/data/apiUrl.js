const endpoint =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5000'
    : 'https://www.tunaserver.ml';
const url = {
  detectURL: `${endpoint}/api/papago/detectionLangs`,
  translateURL: `${endpoint}/api/papago/translation`,
};
export default url;
