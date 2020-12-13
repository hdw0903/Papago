const endpoint =
  process.env.REACT_APP_API_URL ||
  'http://mynodeexpress-env.eba-439z5hhp.ap-northeast-2.elasticbeanstalk.com';
const url = {
  detectURL: `${endpoint}/api/papago/detectionLangs`,
  translateURL: `${endpoint}/api/papago/translation`,
};
export default url;
