import axios from 'axios';

const downLarge =(url) => {
  return axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => new Buffer(response.data, 'binary').toString('base64'))
}

export default downLarge;
