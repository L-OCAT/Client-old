import axios from 'axios';
import Config from 'react-native-config';

const apiClient = axios.create({
  baseURL: Config.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
