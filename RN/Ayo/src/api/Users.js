import axios from 'axios';

axios.defaults.withCredentials = true;

export default axios.create({
      baseURL: 'http://202.92.153.18/users/',
      headers : {},
})