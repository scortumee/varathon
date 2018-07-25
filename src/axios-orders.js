import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://varathon-a9121.firebaseio.com'
});

export default instance;
