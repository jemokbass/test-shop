import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://mytestreact-8ebdb-default-rtdb.firebaseio.com/',
});

export default instance;
