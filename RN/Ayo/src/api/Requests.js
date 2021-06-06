import axios from 'axios';

axios.defaults.withCredentials = true;

      // baseURL: 'http://127.0.0.1:8000/products/',
      // baseURL: 'http://202.92.153.18/products/',
export default axios.create({
      baseURL: 'http://127.0.0.1:8000/basket/',
      headers : {},
})