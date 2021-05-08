import axios from 'axios';

axios.defaults.withCredentials = true;

      // baseURL: 'http://127.0.0.1:8000/users/',
export default axios.create({
      baseURL: 'https://us1.locationiq.com/v1/reverse.php?key=pk.c4d3bc349c75133c9c91dc86dec37582',
      headers : {},
})