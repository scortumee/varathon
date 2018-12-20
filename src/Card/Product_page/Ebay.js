import axios from 'axios';


const ebay = (keyword) => {
  const url='https://us-central1-varathon-a9121.cloudfunctions.net/ebayListings'+'?keyword='+keyword;
  return axios.get(url).then(function (response){
    console.log(response);
    return response['data'];
  }).catch(function (error) {
    console.log(error);
    return null;
  });
}
export default ebay;
